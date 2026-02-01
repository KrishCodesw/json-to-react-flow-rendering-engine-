// src/er/layout.ts

import ELK from "elkjs/lib/elk.bundled.js";

const elk = new ELK();

export async function layoutGraph(nodes: any[], edges: any[]) {
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "elk.spacing.nodeNode": "60",
      "elk.layered.spacing.nodeNodeBetweenLayers": "80",
    },
    children: nodes.map((n) => ({
      id: n.id,
      width: 160,
      height: 80,
    })),
    edges: edges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
    })),
  };

  const layout = await elk.layout(graph);

  return layout.children?.map((n: any) => ({
    id: n.id,
    position: {
      x: n.x,
      y: n.y,
    },
  }));
}
