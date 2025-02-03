import * as fs from "fs";
import { Player } from "../players/player";

export class ReadFile<T> {
  constructor(private readonly filePath: string) {}
  public read(): T {
    const data = fs.readFileSync(this.filePath, { encoding: "utf-8" });
    const res: T = JSON.parse(data);
    return res;
  }
}
