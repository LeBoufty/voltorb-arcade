import { describe, expect, test } from "vitest";
import { generate_board_for_difficulty } from "../Board";
import { LEVEL_VALUES, LEVEL_SIZES } from "../difficulty";

const spot_values = LEVEL_VALUES._Test5![0]!;
const size = LEVEL_SIZES._Test5!;

describe("Board", () => {
  const board = generate_board_for_difficulty("_Test5");
  test("should exist", () => {
    expect(board).toBeDefined();
  })
  test("should have the correct caracteristics for its difficulty", () => {
    expect(board.size).toBe(size);
    expect(board.difficulty).toBe("_Test5");
    expect(board.values).toBeDefined();
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
    expect(flatValues.filter((x) => x === 2).length).toBe(spot_values.x2);
    expect(flatValues.filter((x) => x === 3).length).toBe(spot_values.x3);
    expect(flatValues.filter((x) => x === 0).length).toBe(spot_values.x0);
    expect(flatValues.filter((x) => x === 1).length).toBe(size ** 2 - spot_values.x2 - spot_values.x3 - spot_values.x0);
  })
})

describe("Board information", () => {
  const board = generate_board_for_difficulty("_Test5");
  test("should exist", () => {
    expect(board.information).toBeDefined();
  })
  test("should have correct line voltorb counts", () => {
    for (let i = 0; i < board.size; i++) {
      expect(board.information.lines[i]!.voltorbs).toEqual(board.values[i]!.filter((x) => x === 0).length);
    }
  })
  test("should have correct column voltorb counts", () => {
    for (let i = 0; i < board.size; i++) {
      let column = board.values.map((l) => l[i]!);
      expect(board.information.columns[i]!.voltorbs).toEqual(column.filter((x) => x === 0).length);
    }
  })
  test("should have correct total voltorb counts", () => {
    expect(board.information.columns.map((x) => x.voltorbs).reduce((a, b) => a + b)).toEqual(spot_values.x0);
    expect(board.information.lines.map((x) => x.voltorbs).reduce((a, b) => a + b)).toEqual(spot_values.x0);
  })
  test("should have correct line points", () => {
    for (let i = 0; i < board.size; i++) {
      expect(board.information.lines[i]!.points).toEqual(board.values[i]!.reduce((a, b) => a + b));
    }
  })
  test("should have correct column points", () => {
    for (let i = 0; i < board.size; i++) {
      let column = board.values.map((l) => l[i]!);
      expect(board.information.columns[i]!.points).toEqual(column.reduce((a, b) => a + b));
    }
  })
  test("should have correct total point counts", () => {
    const total_points = size ** 2 - spot_values.x0 + spot_values.x2 + spot_values.x3 * 2;
    expect(board.information.columns.map((x) => x.points).reduce((a, b) => a + b)).toEqual(total_points);
    expect(board.information.lines.map((x) => x.points).reduce((a, b) => a + b)).toEqual(total_points);
  })
});
