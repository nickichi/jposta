import * as fs from "node:fs";
import { parse } from "csv-parse/sync";

type CompressedPostalData = {
	c: string[];
	d: Array<[number, number, number] | [number, number, number, string]>;
};

const parseCsv = () => {
	const file = fs.readFileSync("./utf_ken_all.csv", "utf8");
	const records = parse(file, {
		skip_empty_lines: true,
	}) as string[][];

	records.sort((a, b) => {
		if (a[2] < b[2]) return -1;
		if (a[2] > b[2]) return 1;
		return 0;
	});

	let count = 0;
	let chunk: {
		key: string;
		zips: Set<string>;
		cities: Set<string>;
		data: Array<{ zip: string; prefNum: number; city: string; area: string }>;
	} = {
		key: "",
		zips: new Set(),
		cities: new Set(),
		data: [],
	};

	for (const record of records) {
		// https://www.post.japanpost.jp/zipcode/dl/utf-readme.html
		const code = record[0];
		const zip = record[2];
		const pref = record[6];
		const city = record[7];
		const rawArea = record[8].replace(/（.+）/g, "");

		// "〇〇村一円" means the whole municipality has no area names (but "一円" alone is a real area in 多賀町)
		const area =
			rawArea.includes("以下に掲載がない場合") ||
			rawArea.includes("番地がくる場合") ||
			(rawArea !== "一円" && rawArea.endsWith("一円"))
				? ""
				: rawArea;

		const prefNum = Number.parseInt(code.slice(0, 2), 10);
		if (!pref) {
			console.error(
				`pref not found prefNum:${prefNum} record:${JSON.stringify(record)}`,
			);
			continue;
		}

		const chunkKey = zip.slice(0, 2);
		if (chunk.key === "") {
			chunk = {
				key: chunkKey,
				zips: new Set(),
				cities: new Set(),
				data: [],
			};
		}
		if (chunk.key !== chunkKey) {
			writeCompressedChunk(chunk);
			chunk = {
				key: chunkKey,
				zips: new Set(),
				cities: new Set(),
				data: [],
			};
		}

		// count records for confirmation
		count++;

		// skip duplicate (use the first one)
		if (chunk.zips.has(zip)) {
			continue;
		}

		chunk.zips.add(zip);
		chunk.cities.add(city);
		chunk.data.push({ zip, prefNum, city, area });
	}

	// write the last chunk
	if (chunk.key !== "") {
		writeCompressedChunk(chunk);
	}

	console.log(`processed ${count} records.`);
};

const writeCompressedChunk = (chunk: {
	key: string;
	cities: Set<string>;
	data: Array<{ zip: string; prefNum: number; city: string; area: string }>;
}) => {
	const cityArray = Array.from(chunk.cities).sort();
	const cityIndexMap = new Map<string, number>();
	cityArray.forEach((city, index) => {
		cityIndexMap.set(city, index);
	});

	const compressedData: Array<
		[number, number, number] | [number, number, number, string]
	> = [];

	for (const { zip, prefNum, city, area } of chunk.data) {
		const postalCodeNum = Number.parseInt(zip, 10);
		const cityIndex = cityIndexMap.get(city);

		if (cityIndex === undefined) {
			console.error(`City index not found for city: ${city}`);
			continue;
		}

		if (area === "") {
			compressedData.push([postalCodeNum, prefNum, cityIndex]);
		} else {
			compressedData.push([postalCodeNum, prefNum, cityIndex, area]);
		}
	}

	const result: CompressedPostalData = {
		c: cityArray,
		d: compressedData,
	};

	fs.writeFileSync(`./zips/z${chunk.key}.json`, JSON.stringify(result));
};

parseCsv();
