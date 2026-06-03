import { shuffleArray, getRandomElement } from "./random";
import { LEVEL_SIZES, LEVEL_VALUES, LevelSpotCounts } from "./difficulty";

export class Board {
  /// Size of the board (always square)
  public size: number;
  /// The values behind every spot
  public values: number[][];
  ///The difficulty of the board
  /// VanillaX is a copy of the original HG/SS game
  public difficulty: string;
  public information: BoardInformation;

  constructor(size: number, spot_counts: LevelSpotCounts, difficulty?: string) {
    this.size = size;
    this.difficulty = difficulty ?? "Custom";
    // Create board
    const flat_board = shuffleArray(
      Array(spot_counts.x0).fill(0)
        .concat(Array(spot_counts.x2).fill(2))
        .concat(Array(spot_counts.x3).fill(3))
        .concat(Array(Math.max(0, size ** 2 - spot_counts.x0 - spot_counts.x2 - spot_counts.x3)).fill(1))
        .slice(0, size ** 2) // Prevents board from overflowing
    )
    // Format board into table
    this.values = [];
    for (let i = 0; i < size; i++) {
      this.values.push(flat_board.slice(size * i, size * (i + 1)));
    }
    // Create information
    this.information = { lines: [], columns: [] };
    for (let i = 0; i < size; i++) {
      // Information for line i
      let voltorb_line = this.values[i]!.filter((x) => x === 0).length;
      let points_line = this.values[i]!.reduce((prev, curr) => prev + curr);
      // Informations for column i
      let column = this.values.map((l) => l[i]!);
      let voltorb_column = column.filter((x) => x === 0).length;
      let points_column = column.reduce((prev, curr) => prev + curr);
      this.information.lines.push({
        voltorbs: voltorb_line,
        points: points_line
      });
      this.information.columns.push({
        voltorbs: voltorb_column,
        points: points_column
      })
    }
  }
}

export interface LineInformation {
  voltorbs: number;
  points: number;
}

export interface BoardInformation {
  lines: LineInformation[]
  columns: LineInformation[]
}

export function generate_board_for_difficulty(difficulty: string) {
  const spot_counts = getRandomElement(LEVEL_VALUES[difficulty]!);
  const size = LEVEL_SIZES[difficulty]!;
  return new Board(size, spot_counts, difficulty);
}
