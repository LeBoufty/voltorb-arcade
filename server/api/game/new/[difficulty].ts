import { DIFFICULTIES } from "#imports";
import { create_game_for_difficulty } from "#imports";
import { GameManager } from "#imports";
import { BoardInformation } from "~~/server/utils/Board";

export default defineEventHandler((event) => {
  const difficulty = getRouterParam(event, 'difficulty') ?? ""
  if (DIFFICULTIES.includes(difficulty)) {
    const game = create_game_for_difficulty(difficulty)
    const manager = new GameManager();
    manager.add(game);
    return {
      information: game.board.information as BoardInformation | undefined,
      token: game.token as string | undefined
    };
  } else {
    return {
      information: undefined as BoardInformation | undefined,
      token: undefined as string | undefined
    }
  }
})
