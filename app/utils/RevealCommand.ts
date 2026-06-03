export class RevealCommand {
  line: number;
  column: number;
  gameToken: string;

  constructor(line: number, column: number, gameToken: string) {
    this.line = line;
    this.column = column;
    this.gameToken = gameToken;
  }

  async execute() {
    const { data } = await useFetch("/api/reveal", {
      method: 'POST',
      body: {
        line: this.line,
        column: this.column,
        gameToken: this.gameToken
      }
    });
    return data.value;
  }
}
