import * as fs from "node:fs";
import { parse } from "csv-parse/sync";
import { type Entry, toEntries } from "./normalize";

type CompressedPostalData = {
	c: string[];
	d: Array<[number, number, number] | [number, number, number, string]>;
};

const parseCsv = () => {
	const file = fs.readFileSync("./utf_ken_all.csv", "utf8");
	const records = parse(file, {
		skip_empty_lines: true,
	}) as string[][];

	const entries = toEntries(records);
	for (const [key, chunk] of Map.groupBy(entries, ({ zip }) =>
		zip.slice(0, 2),
	)) {
		writeCompressedChunk(key, chunk);
	}

	console.log(
		`processed ${records.length} records -> ${entries.length} entries.`,
	);
};

const writeCompressedChunk = (key: string, entries: Entry[]) => {
	const cityArray = Array.from(new Set(entries.map(({ city }) => city))).sort();
	const cityIndexMap = new Map(cityArray.map((city, index) => [city, index]));

	const compressedData: CompressedPostalData["d"] = entries.map(
		({ zip, prefNum, city, area }) => {
			const postalCodeNum = Number.parseInt(zip, 10);
			const cityIndex = cityIndexMap.get(city) as number;
			return area === ""
				? [postalCodeNum, prefNum, cityIndex]
				: [postalCodeNum, prefNum, cityIndex, area];
		},
	);

	const result: CompressedPostalData = {
		c: cityArray,
		d: compressedData,
	};

	fs.writeFileSync(`./zips/z${key}.json`, JSON.stringify(result));
};

parseCsv();
