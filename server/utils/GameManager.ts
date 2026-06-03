import { Game } from "./Game"

type GameRegistry = Map<string, Game>

export class GameManager {
  private static registry: GameRegistry = new Map();

  public add(game: Game) {
    GameManager.registry.set(game.token, game);
  }

  public get(token: string) {
    return GameManager.registry.get(token);
  }

  public has(token: string) {
    return GameManager.registry.has(token)
  }
}
