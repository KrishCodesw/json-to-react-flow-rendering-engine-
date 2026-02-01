// src/pages/Diagram.tsx

import { useEffect, useState } from "react";
import { exportSvg } from "../export/exportSvg";
import { ReactFlow, type Node, type Edge } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { parseER } from "../er/parser";
import { layoutGraph } from "../er/layout";

import EntityNode from "../nodes/EntityNode";
import WeakEntityNode from "../nodes/WeakEntityNode";
import RelationshipNode from "../nodes/RelationshipNode";
import AttributeNode from "../nodes/AttributeNode";
import ISANode from "../nodes/ISANode";

const nodeTypes = {
  entity: EntityNode,
  weakEntity: WeakEntityNode,
  relationship: RelationshipNode,
  attribute: AttributeNode,
  isa: ISANode,
};

export default function Diagram({ data }: any) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    async function build() {
      const parsed = parseER(data);

      const positions = (await layoutGraph(parsed.nodes, parsed.edges)) || [];

      const rfNodes: Node[] = parsed.nodes.map((n: any) => {
        const pos = positions.find((p: any) => p.id === n.id);

        return {
          id: n.id,
          type: n.type,
          position: pos?.position || { x: 0, y: 0 },
          data: {
            label: n.label,
            ...n.data,
          },
        };
      });

      const rfEdges: Edge[] = parsed.edges.map((e: any) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        labelStyle: {
          fontSize: 12,
          fill: "#000",
        },
        type: "default",
      }));

      setNodes(rfNodes);
      setEdges(rfEdges);
    }

    if (data) build();
  }, [data]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
      />
      <button
        onClick={exportSvg}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: 10,
        }}
      >
        Export
      </button>
    </div>
  );
}
