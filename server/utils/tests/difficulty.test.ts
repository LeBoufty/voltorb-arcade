import { describe, expect, test } from "vitest";
import { LEVEL_SIZES, LEVEL_VALUES } from "../difficulty";

describe("Difficulty settings", () => {
  const spot_values = LEVEL_VALUES._Test5![0]!;
  const size = LEVEL_SIZES._Test5!;
  test("should exist", () => {
    expect(spot_values).toBeDefined;
    expect(size).toBeDefined;
  })
  test("should have correct values", () => {
    expect(size).toEqual(5);
    expect(spot_values.x0).toEqual(6);
    expect(spot_values.x2).toEqual(2);
    expect(spot_values.x3).toEqual(3);
  })
});
