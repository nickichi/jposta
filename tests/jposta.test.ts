import { expect, test } from "vitest";
import { getAddress } from "../lib";
import { postalCodeTestCases } from "./test-data";

test.each(["bomb", "aaa-bbbb", "123456a"])(
	"getAddress(%s) throws an error",
	async (zipCode) => {
		await expect(getAddress(zipCode)).rejects.toThrow();
	},
);

test.each(["1234567", "123-4567", "0001234"])(
	"getAddress(%s) returns null (actually not exists)",
	async (zipCode) => {
		const address = await getAddress(zipCode);
		expect(address).toBeNull();
	},
);

test.each(postalCodeTestCases)(
	"getAddress($zipCode) returns $expected",
	async ({ zipCode, expected }) => {
		const address = await getAddress(zipCode);
		expect(`${address?.pref}${address?.city}${address?.area || ""}`).toEqual(
			expected,
		);
	},
);

test.each(["0100001", "1000001", "5008044"])(
	"getAddress(%s) returns a well-formed address",
	async (zipCode) => {
		const address = await getAddress(zipCode);
		expect(address).not.toBeNull();
		expect(typeof address?.pref).toBe("string");
		expect(typeof address?.city).toBe("string");
		expect(address?.prefNum).toBeGreaterThan(0);
		expect(address?.prefNum).toBeLessThanOrEqual(47);
	},
);
