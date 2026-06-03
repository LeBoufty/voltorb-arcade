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

  constructor(size: number, spot_counts: LevelSpotCounts, difficulty?: string) {
    this.size = size;
    this.difficulty = difficulty ?? "Custom";
    const flat_board = shuffleArray(
      Array(spot_counts.x0).fill(0)
        .concat(Array(spot_counts.x2).fill(2))
        .concat(Array(spot_counts.x3).fill(3))
        .concat(Array(size ** 2 - spot_counts.x0 - spot_counts.x2 - spot_counts.x3).fill(1))
    )
    this.values = [];
    for (let i = 0; i < size; i++) {
      this.values.push(flat_board.slice(size * i, size * (i + 1)));
    }
  }
}

export function generate_board_for_difficulty(difficulty: string) {
  const spot_counts = getRandomElement(LEVEL_VALUES[difficulty]!);
  const size = LEVEL_SIZES[difficulty]!;
  return new Board(size, spot_counts, difficulty);
}
