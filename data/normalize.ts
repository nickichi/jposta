export type Entry = {
	zip: string;
	prefNum: number;
	pref: string;
	city: string;
	area: string;
};

export const normalizeArea = (rawArea: string): string => {
	const area = rawArea.replace(/（.+）/g, "");

	// "〇〇村一円" means the whole municipality has no area names (but "一円" alone is a real area in 多賀町)
	if (
		area.includes("以下に掲載がない場合") ||
		area.includes("番地がくる場合") ||
		(area !== "一円" && area.endsWith("一円"))
	) {
		return "";
	}
	return area;
};

// https://www.post.japanpost.jp/zipcode/dl/utf-readme.html
export const toEntries = (records: string[][]): Entry[] => {
	const sorted = [...records].sort((a, b) => {
		if (a[2] < b[2]) return -1;
		if (a[2] > b[2]) return 1;
		return 0;
	});

	const entries: Entry[] = [];
	const zips = new Set<string>();
	for (const record of sorted) {
		const code = record[0];
		const zip = record[2];
		const pref = record[6];
		const prefNum = Number.parseInt(code.slice(0, 2), 10);
		if (!pref || !(prefNum >= 1 && prefNum <= 47)) {
			throw new Error(`Invalid prefecture: ${JSON.stringify(record)}`);
		}

		// skip duplicate (use the first one)
		if (zips.has(zip)) {
			continue;
		}
		zips.add(zip);
		entries.push({
			zip,
			prefNum,
			pref,
			city: record[7],
			area: normalizeArea(record[8]),
		});
	}
	return entries;
};
