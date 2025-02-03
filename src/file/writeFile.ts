import * as fs from "fs";

export class WriteFile<T> {
  constructor(private readonly data: T, private readonly filePath: string) {}
  public write(): void {
    const json = JSON.stringify(this.data);
    try {
      fs.writeFileSync(this.filePath, json, { encoding: "utf-8" });
    } catch (err) {
      console.log(err);
    }
  }
}
