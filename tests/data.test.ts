import * as fs from "node:fs";
import { parse } from "csv-parse/sync";
import { describe, expect, test } from "vitest";
import { normalizeArea, toEntries } from "../data/normalize";
import { getAddress } from "../lib";

const records = parse(fs.readFileSync("./data/utf_ken_all.csv", "utf8"), {
	skip_empty_lines: true,
}) as string[][];
const entries = toEntries(records);

describe("normalizeArea", () => {
	test.each([
		["千代田", "千代田"],
		["以下に掲載がない場合", ""],
		["次に番地がくる場合", ""],
		["青ヶ島村一円", ""],
		["一円", "一円"],
		["大手町ＪＡビル（１０階）", "大手町ＪＡビル"],
		["大通西（１〜１９丁目）", "大通西"],
	])("normalizeArea(%s) returns %s", (rawArea, expected) => {
		expect(normalizeArea(rawArea)).toBe(expected);
	});
});

describe("CSV", () => {
	test("has enough records", () => {
		expect(records.length).toBeGreaterThan(100000);
		expect(entries.length).toBeGreaterThan(100000);
	});

	test("every record has 15 columns and a valid zip code", () => {
		for (const record of records) {
			expect(record).toHaveLength(15);
			expect(record[2]).toMatch(/^\d{7}$/);
		}
	});
});

describe("lib/zips", () => {
	const files = fs.readdirSync("./lib/zips").filter((f) => f.endsWith(".json"));

	test.each(files)("%s has sorted unique zip codes", (file) => {
		const json = JSON.parse(fs.readFileSync(`./lib/zips/${file}`, "utf8"));
		const zips: number[] = json.d.map(([zip]: [number]) => zip);
		for (let i = 1; i < zips.length; i++) {
			expect(zips[i]).toBeGreaterThan(zips[i - 1]);
		}
	});

	test("getAddress returns the CSV entry for every zip code", async () => {
		const mismatches: string[] = [];
		for (const { zip, pref, prefNum, city, area } of entries) {
			const address = await getAddress(zip);
			const expected = { pref, prefNum, city, area: area || undefined };
			if (JSON.stringify(address) !== JSON.stringify(expected)) {
				mismatches.push(
					`${zip}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(address)}`,
				);
			}
		}
		expect(mismatches.slice(0, 10)).toEqual([]);
		expect(mismatches).toHaveLength(0);
	});
});
