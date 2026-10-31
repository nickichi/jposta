import { describe, expect, test } from "vitest";
import { encodeChunk } from "../data/encode";
import type { Entry } from "../data/normalize";
import { type ChunkData, findInChunk } from "../lib/chunk";

const entry = (
	zip: string,
	prefNum: number,
	city: string,
	area = "",
): Entry => ({ zip, prefNum, pref: "", city, area });

describe("encodeChunk and findInChunk", () => {
	const entries = [
		entry("4980000", 23, "弥富市"),
		entry("4980001", 23, "弥富市", "平島町"),
		entry("4980002", 24, "府中町"),
		entry("4980010", 34, "府中町", "鍵屋"),
		entry("4980011", 23, "弥富市"),
	];
	const chunk = encodeChunk(entries);

	test("encodes deltas, city changes and areas", () => {
		expect(chunk).toEqual({
			c: [
				["弥富市", 23],
				["府中町", 24],
				["府中町", 34],
			],
			d: [
				[80000, 0],
				[1, "平島町"],
				[1, 1],
				[8, 2, "鍵屋"],
				[1, 0],
			],
		});
	});

	test.each(entries)("round-trips $zip", ({ zip, prefNum, city, area }) => {
		expect(findInChunk(chunk, Number.parseInt(zip.slice(2), 10))).toEqual({
			city,
			prefNum,
			area: area || undefined,
		});
	});

	test.each([0, 79999, 80003, 80009, 80012, 99999])(
		"returns null for missing %i",
		(target) => {
			expect(findInChunk(chunk, target)).toBeNull();
		},
	);

	test.each([
		[
			"unsorted",
			[entry("4980001", 23, "弥富市"), entry("4980000", 23, "弥富市")],
		],
		[
			"duplicated",
			[entry("4980001", 23, "弥富市"), entry("4980001", 23, "弥富市")],
		],
		[
			"mixed chunks",
			[entry("4980001", 23, "弥富市"), entry("5000000", 23, "弥富市")],
		],
		["invalid zip", [entry("49800a1", 23, "弥富市")]],
	])("encodeChunk throws on %s entries", (_, invalid) => {
		expect(() => encodeChunk(invalid)).toThrow();
	});
});

describe("findInChunk with broken data", () => {
	const c: ChunkData["c"] = [["弥富市", 23]];

	test.each([
		["missing city index on the first row", { c, d: [[0, "平島町"]] }, 0],
		["out-of-range city index", { c, d: [[0, 5]] }, 0],
		["non-numeric delta", { c, d: [[0, 0], ["1"]] }, 1],
		["negative delta", { c, d: [[5, 0], [-1]] }, 10],
		["zero delta after the first row", { c, d: [[0, 0], [0]] }, 1],
		["non-string area", { c, d: [[0, 0, 1]] }, 0],
		["extra element", { c, d: [[0, "平島町", "x"]] }, 0],
		["non-numeric prefNum", { c: [["弥富市", "23"]], d: [[0, 0]] }, 0],
		["missing rows", { c }, 0],
	])("throws on %s", (_, chunk, target) => {
		expect(() => findInChunk(chunk as ChunkData, target)).toThrow(
			"Internal error data broken",
		);
	});
});
