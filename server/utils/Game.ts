import { Board, generate_board_for_difficulty } from "./Board";
import { v4 as uuidv4 } from "uuid";

export interface Coordinates {
  line: number;
  column: number;
}

interface RevealResponse {
  active: boolean;
  value?: number;
}

export interface GameStateResponse {
  score: number;
  over: boolean;
  revealed: Coordinates[];
}

export class Game {
  public board: Board;
  public revealed: Coordinates[];
  public score: number;
  public token: string;
  public over: boolean

  constructor(board: Board) {
    this.board = board;
    this.revealed = []
    this.score = 0;
    this.token = uuidv4();
    this.over = false;
  }

  public reveal(line: number, column: number): RevealResponse {
    const value = this.board.values[line]![column]!;
    if (!this.revealed.includes({ line, column })) {
      this.revealed.push({ line, column });
      if (!this.over) {
        this.updateScore(value);
        if (value === 0 || this.score === this.board.maxScore) this.over = true;
      }
    }
    return {
      active: true,
      value,
    };
  }

  public state(): GameStateResponse {
    return {
      score: this.score,
      over: this.over,
      revealed: this.revealed
    }
  }

  private updateScore(value: number) {
    if (this.score === 0 && !this.over) {
      this.score = value;
    } else {
      this.score *= value;
    }
  }
}

export function create_game_for_difficulty(difficulty: string) {
  const board = generate_board_for_difficulty(difficulty);
  return new Game(board);
}
