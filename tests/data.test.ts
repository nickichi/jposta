import * as fs from "node:fs";
import { parse } from "csv-parse/sync";
import { describe, expect, test } from "vitest";
import { normalizeArea, toEntries } from "../data/normalize";
import { getAddress } from "../lib";

const records = parse(fs.readFileSync("./data/utf_ken_all.csv", "utf8"), {
	skip_empty_lines: true,
}) as string[][];
const entries = toEntries(records);
const zips = new Set(entries.map(({ zip }) => zip));

const collectMismatches = async (
	cases: Iterable<[string, unknown]>,
): Promise<string[]> => {
	const mismatches: string[] = [];
	for (const [zip, expected] of cases) {
		const address = await getAddress(zip);
		try {
			expect(address).toEqual(expected);
		} catch {
			mismatches.push(
				`${zip}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(address)}`,
			);
		}
	}
	return mismatches;
};

const expectNoMismatches = (mismatches: string[]) => {
	expect({
		count: mismatches.length,
		sample: mismatches.slice(0, 10),
	}).toEqual({ count: 0, sample: [] });
};

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

describe("toEntries", () => {
	const record = (code: string, zip: string, pref: string, city: string) => [
		code,
		"",
		zip,
		"",
		"",
		"",
		pref,
		city,
		"以下に掲載がない場合",
	];

	test("keeps the first record of a duplicated zip code", () => {
		const result = toEntries([
			record("23000", "4980000", "愛知県", "弥富市"),
			record("24000", "4980000", "三重県", "桑名郡木曽岬町"),
		]);
		expect(result).toEqual([
			{
				zip: "4980000",
				prefNum: 23,
				pref: "愛知県",
				city: "弥富市",
				area: "",
			},
		]);
	});

	test.each([
		["missing prefecture", record("13000", "1000000", "", "千代田区")],
		[
			"invalid prefecture code",
			record("99000", "1000000", "東京都", "千代田区"),
		],
	])("throws on %s", (_, invalid) => {
		expect(() => toEntries([invalid])).toThrow();
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
	const chunks = files.map(
		(file) =>
			JSON.parse(fs.readFileSync(`./lib/zips/${file}`, "utf8")) as {
				d: unknown[];
			},
	);

	test("has 100 chunks", () => {
		expect(files).toHaveLength(100);
	});

	test.each(files)("%s has sorted unique zip codes", (file) => {
		const json = JSON.parse(fs.readFileSync(`./lib/zips/${file}`, "utf8"));
		const chunkZips: number[] = json.d.map(([zip]: [number]) => zip);
		for (let i = 1; i < chunkZips.length; i++) {
			expect(chunkZips[i]).toBeGreaterThan(chunkZips[i - 1]);
		}
	});

	test("contains exactly as many zip codes as the CSV", () => {
		const total = chunks.reduce((sum, { d }) => sum + d.length, 0);
		expect(total).toBe(entries.length);
	});

	test("getAddress returns the CSV entry for every zip code", async () => {
		expectNoMismatches(
			await collectMismatches(
				entries.map(({ zip, pref, prefNum, city, area }) => [
					zip,
					{ pref, prefNum, city, area: area || undefined },
				]),
			),
		);
	});

	test("getAddress returns null for zip codes not in the CSV", async () => {
		const candidates = new Set<string>();
		for (let prefix = 0; prefix < 100; prefix++) {
			const p = String(prefix).padStart(2, "0");
			candidates.add(`${p}00000`);
			candidates.add(`${p}99999`);
		}
		for (const zip of zips) {
			const n = Number.parseInt(zip, 10);
			for (const neighbor of [n - 1, n + 1]) {
				if (neighbor >= 0 && neighbor <= 9999999) {
					candidates.add(String(neighbor).padStart(7, "0"));
				}
			}
		}
		const missing = [...candidates].filter((zip) => !zips.has(zip));
		expect(missing.length).toBeGreaterThan(10000);
		expectNoMismatches(
			await collectMismatches(missing.map((zip) => [zip, null])),
		);
	});
});
