// Format of lib/zips/zNN.json, where NN is the first 2 digits of the zip code.
// c: [city, prefNum] table.
// d: one row per zip code in ascending order: [zip delta, city index (only when changed)?, area?].
// The zip delta is the difference of the last 5 digits from the previous row, starting from 0.
// The first row always has a city index; elements are told apart by type.
export type ChunkRow =
	| [number]
	| [number, number]
	| [number, string]
	| [number, number, string];

export type ChunkData = {
	c: Array<[string, number]>;
	d: ChunkRow[];
};

export type ChunkEntry = {
	city: string;
	prefNum: number;
	area: string | undefined;
};

const broken = (detail: string) =>
	new Error(`Internal error data broken: ${detail}`);

// Returns the entry whose last 5 digits equal target, or null.
// Throws when the chunk is malformed up to the matching row.
export const findInChunk = (
	chunk: ChunkData,
	target: number,
): ChunkEntry | null => {
	if (!Array.isArray(chunk?.c) || !Array.isArray(chunk.d)) {
		throw broken("invalid chunk");
	}

	let current = 0;
	let cityIndex = -1;
	for (let index = 0; index < chunk.d.length; index++) {
		const row = chunk.d[index];
		const [delta, a, b] = row;
		if (!Number.isInteger(delta) || delta < (index === 0 ? 0 : 1)) {
			throw broken(`row ${index}: ${JSON.stringify(row)}`);
		}
		current += delta;

		let area: unknown = a;
		if (typeof a === "number") {
			cityIndex = a;
			area = b;
		} else if (b !== undefined) {
			throw broken(`row ${index}: ${JSON.stringify(row)}`);
		}

		if (current > target) {
			return null;
		}
		if (current !== target) {
			continue;
		}

		const city = chunk.c[cityIndex];
		if (
			!Array.isArray(city) ||
			typeof city[0] !== "string" ||
			typeof city[1] !== "number" ||
			(area !== undefined && typeof area !== "string")
		) {
			throw broken(`row ${index}: ${JSON.stringify(row)}`);
		}
		return { city: city[0], prefNum: city[1], area };
	}
	return null;
};
