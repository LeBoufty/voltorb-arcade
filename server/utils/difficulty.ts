import difficultySettings from "./data/difficultySettings.json";

export interface LevelSpotCounts {
  /// 2-spot count
  x2: number;
  /// 3-spot count
  x3: number;
  /// Voltorb count
  x0: number;
}

export type LevelValues = Record<string, LevelSpotCounts[]>
export type LevelSizes = Record<string, number>

export const LEVEL_VALUES: LevelValues = difficultySettings.spotCounts;
export const LEVEL_SIZES: LevelSizes = difficultySettings.size;
export const DIFFICULTIES: string[] = Object.keys(LEVEL_VALUES);
