export default class ServerGame {
  private previousGuesses_: string[][];
  private solution_: number[];
  private STATE = {
    playing: 0,
    won: 1,
    lost: 2,
    new: 3,
  };

  constructor() {
    this.previousGuesses_ = [];
    this.solution_ = this.generateRandomNumbers();
    console.log("new ServerGame()");
  }

  check(playerGuess: number[]): {
    res: string[];
    state: number;
    solution?: number[];
  } {
    // this.solution = [1, 3, 6, 2];
    // this.previousGuesses.push(playerGuess);

    let res = Array<string>(4).fill("_");
    let notExactMatch = new Set<number>();

    for (let i = 0; i < playerGuess.length; i++) {
      const num = playerGuess[i];
      if (num === this.solution_[i]) {
        res[i] = "x";
      } else {
        notExactMatch.add(this.solution_[i]);
      }
    }

    for (let i = 0; i < playerGuess.length; i++) {
      let num = playerGuess[i];

      if (res[i] != "x") {
        res[i] = notExactMatch.has(num) ? "c" : "_";
      }
    }
    this.previousGuesses_.push(res);

    if (res.join("").toString() === "xxxx") {
      return {
        res,
        state: this.STATE.won,
      };
    }

    if (this.previousGuesses_.length === 2) {
      const obj = {
        res,
        state: this.STATE.lost,
        solution: this.solution_,
      };
      console.log("You lost!", obj);
      return obj;
    }
    return { res, state: this.STATE.playing };
  }

  getHints() {
    console.log("get hints");
  }

  newGame(): { state: number } {
    console.log("new Game in game.ts");
    new ServerGame();
    return {
      state: this.STATE.new,
    };
  }
  private generateRandomNumbers(): number[] {
    let arr: number[] = [1, 2, 3, 4, 5, 6, 7];
    let res = new Set<number>();

    while (res.size < 4) {
      let randomNum: number = Math.floor(Math.random() * arr.length + 1);
      res.add(randomNum);
    }
    console.log("answer", Array.from(res));
    return Array.from(res);
  }
}
