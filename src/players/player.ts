export class Player {
  private static counter: number = 0;
  private readonly id: number;
  constructor(
    private readonly name: string,
    private readonly gameName: string,
    private readonly server: string,
    private readonly progress: string,
    private readonly roles: string[]
  ) {
    this.id = Player.counter++;
  }
  public fetch(): string | undefined {
    if (this.gameName === "テンプレート") return;
    return `${this.name}\n${this.gameName}\n${this.server}\n${this.progress}`;
  }
  public get getName(): string {
    return this.name;
  }
  public get getRoles(): string[] {
    return this.roles;
  }
}
