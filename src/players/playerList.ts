import { ReadFile } from "../file/readFile";
import { WriteFile } from "../file/writeFile";
import { Player } from "./player";

export class PlayerList {
  private readonly write: WriteFile<Player[]>;
  private readonly read: ReadFile<Player[]>;
  constructor(private readonly players: Player[]) {
    this.write = new WriteFile<Player[]>(this.players, "./players.json");
    this.read = new ReadFile<Player[]>("./players.json");
  }
  private equal(): boolean {
    const data = this.read.read();
    return data.join("") === this.players.join("");
  }
  public writeFile(): PlayerList {
    if (this.equal()) return this;
    this.write.write();
    return this;
  }
  public async postGas(): Promise<string> {
    if (this.equal()) return "スプレッドシートの更新はありませんでした";
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbwKa6wgzs0gU2FmZsOML0SUaMh3Ci_gmLVVtmiCrdM-6lUKgXaTL2xPSx7f7pjrzDBlwg/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          array: this.players,
        }),
      }
    );
    console.log(await res.text());
    return "スプレッドシートの更新に成功しました";
  }
}
