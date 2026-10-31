import * as fs from "node:fs";
import { parse } from "csv-parse/sync";
import { encodeChunk } from "./encode";
import { toEntries } from "./normalize";

const parseCsv = () => {
	const file = fs.readFileSync("./utf_ken_all.csv", "utf8");
	const records = parse(file, {
		skip_empty_lines: true,
	}) as string[][];

	const entries = toEntries(records);
	for (const [key, chunk] of Map.groupBy(entries, ({ zip }) =>
		zip.slice(0, 2),
	)) {
		fs.writeFileSync(`./zips/z${key}.json`, JSON.stringify(encodeChunk(chunk)));
	}

	console.log(
		`processed ${records.length} records -> ${entries.length} entries.`,
	);
};

parseCsv();
