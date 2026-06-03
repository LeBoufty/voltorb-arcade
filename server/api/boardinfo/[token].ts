import { BoardInformation } from "~~/server/utils/Board";
import { GameManager } from "../../utils/GameManager"

export default defineEventHandler((event) => {
  const token = getRouterParam(event, 'token') ?? ""
  const manager = new GameManager();
  if (manager.has(token)) {
    return { information: manager.get(token)!.board.information as BoardInformation | undefined, };
  } else {
    return { information: undefined as BoardInformation | undefined }
  }
})
