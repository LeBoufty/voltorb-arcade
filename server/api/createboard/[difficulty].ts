import { DIFFICULTIES } from "../../utils/difficulty";
import { generate_board_for_difficulty } from "../../utils/Board";

export default defineEventHandler((event) => {
  const difficulty = getRouterParam(event, 'difficulty') ?? ""
  if (DIFFICULTIES.includes(difficulty)) {
    return generate_board_for_difficulty(difficulty)
  } else {
    return "Invalid difficulty"
  }
})
