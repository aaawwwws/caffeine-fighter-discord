export class ServerList {
  static servers: string[] = [
    "Aegis",
    "Atomos",
    "Carbuncle",
    "Garuda",
    "Gungnir",
    "Kujata",
    "Tonberry",
    "Typhon",
    "Alexander",
    "Bahamut",
    "Durandal",
    "Fenrir",
    "Ifrit",
    "Ridill",
    "Tiamat",
    "Ultima",
    "Anima",
    "Asura",
    "Chocobo",
    "Hades",
    "Ixion",
    "Masamune",
    "Pandaemonium",
    "Titan",
    "Belias",
    "Mandragora",
    "Ramuh",
    "Shinryu",
    "Unicorn",
    "Valefor",
    "Yojimbo",
    "Zeromus",
  ];
  constructor() {}
  static replace(serverName: string): string {
    return (
      this.servers.find((e) =>
        serverName.toLowerCase().includes(e.trim().toLowerCase())
      ) ?? "不正"
    );
  }
}
