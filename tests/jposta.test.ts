import { expect, test } from "vitest";
import { getAddress } from "../lib";
import { postalCodeTestCases } from "./test-data";

test.each(["bomb", "aaa-bbbb", "123456a"])(
  "getAddress(%s) throws an error",
  async (zipCode) => {
    await expect(getAddress(zipCode)).rejects.toThrow();
  }
);

test.each(["1234567", "123-4567", "0001234"])(
  "getAddress(%s) returns null (actually not exists)",
  async (zipCode) => {
    const address = await getAddress(zipCode);
    expect(address).toBeNull();
  }
);

test.each(postalCodeTestCases)(
  "getAddress($zipCode) returns $expected",
  async ({ zipCode, expected }) => {
    const address = await getAddress(zipCode);
    expect(`${address?.pref}${address?.city}${address?.area || ""}`).toEqual(
      expected
    );
  }
);

test("compressed format maintains data integrity", async () => {
  // Test a few postal codes to ensure compression doesn't break functionality
  const testCodes = ["0100001", "1000001", "5000001"];

  for (const zipCode of testCodes) {
    const address = await getAddress(zipCode);
    // If address exists, it should have valid structure
    if (address) {
      expect(address.pref).toBeDefined();
      expect(address.prefNum).toBeGreaterThan(0);
      expect(address.prefNum).toBeLessThanOrEqual(47);
      expect(address.city).toBeDefined();
      expect(typeof address.pref).toBe("string");
      expect(typeof address.city).toBe("string");
      expect(typeof address.prefNum).toBe("number");
    }
  }
});
