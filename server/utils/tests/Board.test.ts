import { describe, expect, test } from "vitest";
import { generate_board_for_difficulty } from "../Board";

describe("Board", () => {
  const board = generate_board_for_difficulty("_Test5");
  test("should exist", () => {
    expect(board).toBeDefined();
  })
  test("should have the correct caracteristics for its difficulty", () => {
    expect(board.size).toBe(5);
    expect(board.difficulty).toBe("_Test5");
  })
  test("should be square", () => {
    expect(board.values.length).toBeGreaterThan(0);
    const rowLengths = board.values.map((x) => x.length);
    expect(rowLengths.every((x) => x === rowLengths[0])).toBe(true);
  })
  test("square size should equal board.size", () => {
    expect(board.values.length).toEqual(board.size);
  })
  const flatValues = board.values.flat();
  test("should have correct spot counts", () => {
    expect(flatValues.filter((x) => x === 2).length).toBe(2);
    expect(flatValues.filter((x) => x === 3).length).toBe(3);
    expect(flatValues.filter((x) => x === 0).length).toBe(6);
    expect(flatValues.filter((x) => x === 1).length).toBe(14);
  })
})
