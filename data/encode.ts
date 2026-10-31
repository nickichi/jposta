import type { ChunkData, ChunkRow } from "../lib/chunk";
import type { Entry } from "./normalize";

// Encodes the entries of one chunk (same first 2 digits, sorted, unique) into the format described in lib/chunk.ts
export const encodeChunk = (entries: Entry[]): ChunkData => {
	const cities: ChunkData["c"] = [];
	const cityIndexMap = new Map<string, number>();
	let prevZip = -1;
	let prevCityIndex = -1;

	const rows = entries.map(({ zip, prefNum, city, area }): ChunkRow => {
		const cityKey = `${prefNum}:${city}`;
		let cityIndex = cityIndexMap.get(cityKey);
		if (cityIndex === undefined) {
			cityIndex = cities.length;
			cityIndexMap.set(cityKey, cityIndex);
			cities.push([city, prefNum]);
		}

		if (
			!/^\d{7}$/.test(zip) ||
			zip.slice(0, 2) !== entries[0].zip.slice(0, 2)
		) {
			throw new Error(`Invalid zip code in chunk: ${zip}`);
		}
		const zipNum = Number.parseInt(zip.slice(2), 10);
		if (zipNum <= prevZip) {
			throw new Error(`Zip codes must be ascending and unique: ${zip}`);
		}
		const delta = zipNum - Math.max(prevZip, 0);

		const head: [number] | [number, number] =
			cityIndex === prevCityIndex ? [delta] : [delta, cityIndex];
		prevZip = zipNum;
		prevCityIndex = cityIndex;
		return area === "" ? head : [...head, area];
	});

	return { c: cities, d: rows };
};
