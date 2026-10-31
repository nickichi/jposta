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

	const chunks = new Map<string, Entry[]>();
	for (const entry of toEntries(records)) {
		const key = entry.zip.slice(0, 2);
		const chunk = chunks.get(key) ?? [];
		chunk.push(entry);
		chunks.set(key, chunk);
	}

	for (const [key, entries] of chunks) {
		writeCompressedChunk(key, entries);
	}

	console.log(`processed ${records.length} records.`);
};

const writeCompressedChunk = (key: string, entries: Entry[]) => {
	const cityArray = Array.from(new Set(entries.map(({ city }) => city))).sort();
	const cityIndexMap = new Map<string, number>();
	cityArray.forEach((city, index) => {
		cityIndexMap.set(city, index);
	});

	const compressedData: CompressedPostalData["d"] = [];

	for (const { zip, prefNum, city, area } of entries) {
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

	fs.writeFileSync(`./zips/z${key}.json`, JSON.stringify(result));
};

parseCsv();
