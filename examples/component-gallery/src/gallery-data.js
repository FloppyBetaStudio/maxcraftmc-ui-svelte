export const items = [
  { id: "survival", text: "生存服" },
  { id: "creative", text: "创造服" },
  { id: "archive", text: "归档服", disabled: true },
];

export const headers = [
  { key: "server", value: "服务器" },
  { key: "status", value: "状态" },
  { key: "players", value: "玩家" },
];

export const rows = [
  { id: "survival", server: "Survival", status: "online", players: 42 },
  { id: "creative", server: "Creative", status: "online", players: 12 },
  { id: "event", server: "Event", status: "locked", players: 0 },
];

export const treeNodes = [
  {
    id: "root",
    text: "MaxCraft",
    nodes: [
      { id: "rules", text: "服务器规则" },
      {
        id: "systems",
        text: "系统",
        nodes: [
          { id: "economy", text: "经济" },
          { id: "whitelist", text: "白名单" },
        ],
      },
    ],
  },
];
