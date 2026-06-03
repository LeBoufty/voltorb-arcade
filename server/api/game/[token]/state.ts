import { GameManager } from "#imports";
import { GameStateResponse } from "~~/server/utils/Game";

export default defineEventHandler((event) => {
  const token = getRouterParam(event, 'token') ?? ""
  const manager = new GameManager();
  if (manager.has(token)) {
    return { state: manager.get(token)!.state() as GameStateResponse | undefined };
  } else {
    return { state: undefined as GameStateResponse | undefined }
  }
})
