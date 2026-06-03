import z from "zod"
import { GameManager } from "../utils/GameManager"

const commandSchema = z.object({
  line: z.number(),
  column: z.number(),
  gameToken: z.string(),
})

export default defineEventHandler(async (event) => {
  const command = await readValidatedBody(event, body => commandSchema.safeParse(body))
  const manager = new GameManager();
  const data = command.data!;
  const game = manager.get(data.gameToken)
  if (!game) {
    return { active: false }
  } else {
    return game.reveal(data.line, data.column)
  }
})
