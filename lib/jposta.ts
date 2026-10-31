import { type ChunkData, findInChunk } from "./chunk.js";

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
	const chunk = await fetchJson(zip.slice(0, 2));
	const entry = findInChunk(chunk, Number.parseInt(zip.slice(2), 10));
	if (!entry) {
		return null;
	}

	const pref = prefs[entry.prefNum - 1];
	if (typeof pref !== "string") {
		throw new Error(`Internal error data broken: prefNum ${entry.prefNum}`);
	}

	return {
		pref: pref,
		prefNum: entry.prefNum,
		city: entry.city,
		area: entry.area || undefined,
	};
};

const fetchJson = async (chunk: string): Promise<ChunkData> => {
	const { default: json } = await import(`./zips/z${chunk}.json`);
	return json;
};
