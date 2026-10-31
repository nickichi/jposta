const prefs = [
	"北海道",
	"青森県",
	"岩手県",
	"宮城県",
	"秋田県",
	"山形県",
	"福島県",
	"茨城県",
	"栃木県",
	"群馬県",
	"埼玉県",
	"千葉県",
	"東京都",
	"神奈川県",
	"新潟県",
	"富山県",
	"石川県",
	"福井県",
	"山梨県",
	"長野県",
	"岐阜県",
	"静岡県",
	"愛知県",
	"三重県",
	"滋賀県",
	"京都府",
	"大阪府",
	"兵庫県",
	"奈良県",
	"和歌山県",
	"鳥取県",
	"島根県",
	"岡山県",
	"広島県",
	"山口県",
	"徳島県",
	"香川県",
	"愛媛県",
	"高知県",
	"福岡県",
	"佐賀県",
	"長崎県",
	"熊本県",
	"大分県",
	"宮崎県",
	"鹿児島県",
	"沖縄県",
];

export type Address = {
	pref: string;
	prefNum: number;
	city: string;
	area?: string;
};

export const getAddress = async (zipCode: string): Promise<Address | null> => {
	if (zipCode.length !== 7 && zipCode.length !== 8) {
		throw new Error(`Zip code must be 7 or 8 characters: ${zipCode}`);
	}
	if (zipCode.length === 8 && !/^\d{3}-\d{4}$/.test(zipCode)) {
		throw new Error(`Invalid zip code: ${zipCode}`);
	}
	if (zipCode.length === 7 && !/^\d{7}$/.test(zipCode)) {
		throw new Error(`Invalid zip code: ${zipCode}`);
	}

	const zip = zipCode.replace("-", "");
	const target = Number.parseInt(zip.slice(2), 10);
	const json = await fetchJson(zip.slice(0, 2));

	if (!json?.c || !json.d) {
		return null;
	}

	// Each row is [zip delta, city index (only when changed)?, area?]
	let current = 0;
	let cityIndex = -1;
	for (const row of json.d) {
		current += row[0];
		let i = 1;
		if (typeof row[i] === "number") {
			cityIndex = row[i] as number;
			i++;
		}
		if (current < target) {
			continue;
		}
		if (current > target) {
			return null;
		}

		const area = row[i];
		const cityEntry = json.c[cityIndex];
		const pref = cityEntry && prefs[cityEntry[1] - 1];
		if (
			!cityEntry ||
			typeof cityEntry[0] !== "string" ||
			typeof pref !== "string" ||
			(area !== undefined && typeof area !== "string")
		) {
			throw new Error(`Internal error data broken: ${JSON.stringify(row)}`);
		}
		const [city, prefNum] = cityEntry;

		return {
			pref: pref,
			prefNum: prefNum,
			city: city,
			area: area || undefined,
		};
	}
	return null;
};

type CompressedPostalData = {
	// [city, prefNum]
	c: Array<[string, number]>;
	d: Array<
		[number] | [number, number] | [number, string] | [number, number, string]
	>;
};

const fetchJson = async (chunk: string): Promise<CompressedPostalData> => {
	const { default: json } = await import(`./zips/z${chunk}.json`);
	return json;
};
