import * as fs from "node:fs";
import { parse } from "csv-parse/sync";
import { type Entry, toEntries } from "./normalize";

type Row =
	| [number]
	| [number, number]
	| [number, string]
	| [number, number, string];

type CompressedPostalData = {
	// [city, prefNum]
	c: Array<[string, number]>;
	d: Row[];
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

// Each row is [zip delta, city index (only when changed)?, area?].
// The zip delta is from the previous row's last 5 digits (0 for the first row).
const writeCompressedChunk = (key: string, entries: Entry[]) => {
	const cities: CompressedPostalData["c"] = [];
	const cityIndexMap = new Map<string, number>();
	let prevZip = 0;
	let prevCityIndex = -1;

	const rows = entries.map(({ zip, prefNum, city, area }) => {
		const cityKey = `${prefNum}:${city}`;
		let cityIndex = cityIndexMap.get(cityKey);
		if (cityIndex === undefined) {
			cityIndex = cities.length;
			cityIndexMap.set(cityKey, cityIndex);
			cities.push([city, prefNum]);
		}

		const zipNum = Number.parseInt(zip.slice(2), 10);
		const row: Array<number | string> = [zipNum - prevZip];
		if (cityIndex !== prevCityIndex) {
			row.push(cityIndex);
		}
		if (area !== "") {
			row.push(area);
		}
		prevZip = zipNum;
		prevCityIndex = cityIndex;
		return row as Row;
	});

	const result: CompressedPostalData = { c: cities, d: rows };
	fs.writeFileSync(`./zips/z${key}.json`, JSON.stringify(result));
};

parseCsv();
