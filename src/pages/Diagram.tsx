import { useEffect, useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  reconnectEdge,
  Background,
  Controls,
  type Node,
  type Edge,
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// External Utility Imports
import { exportSvg } from "../export/exportSvg";
import { parseER } from "../er/parser";
import { layoutGraph } from "../er/layout";

// Node Component Imports
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

// --- Main Component ---
export default function Diagram({ data }: { data: any }) {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  // --- Undo/Redo Logic ---
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>(
    [],
  );
  const [historyIndex, setHistoryIndex] = useState(-1);

  const takeSnapshot = useCallback(() => {
    setHistory((prev) => {
      const nextHistory = prev.slice(0, historyIndex + 1);
      return [...nextHistory, { nodes, edges }];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [nodes, edges, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  // --- Handlers ---

  const onNodeLabelChange = useCallback(
    (nodeId: string, newLabel: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node,
        ),
      );
    },
    [setNodes],
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      // Snapshot on move end
      const isUserAction = changes.some(
        (c) => c.type === "position" || c.type === "remove",
      );
      if (isUserAction) takeSnapshot();
    },
    [setNodes, takeSnapshot],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      if (changes.some((c) => c.type === "remove")) takeSnapshot();
    },
    [setEdges, takeSnapshot],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      takeSnapshot();
    },
    [setEdges, takeSnapshot],
  );

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
      takeSnapshot();
    },
    [setEdges, takeSnapshot],
  );

  const addEntity = () => {
    const id = `entity_${Date.now()}`;
    const newNode: Node = {
      id,
      type: "entity",
      position: { x: 150, y: 150 },
      data: {
        label: "New Entity",
        onChange: (val: string) => onNodeLabelChange(id, val),
      },
    };
    setNodes((nds) => nds.concat(newNode));
    takeSnapshot();
  };

  // Initial Data Build
  useEffect(() => {
    async function build() {
      const parsed = parseER(data);
      const positions = (await layoutGraph(parsed.nodes, parsed.edges)) || [];

      const rfNodes: Node[] = parsed.nodes.map((n: any) => ({
        id: n.id,
        type: n.type,
        position: positions.find((p: any) => p.id === n.id)?.position || {
          x: 0,
          y: 0,
        },
        data: {
          ...n.data,
          label: n.label,
          onChange: (newVal: string) => onNodeLabelChange(n.id, newVal),
        },
      }));

      const rfEdges: Edge[] = parsed.edges.map((e: any) => ({
        ...e,
        type: "smoothstep",
        labelStyle: { fontSize: 12, fill: "#000" },
      }));

      setNodes(rfNodes);
      setEdges(rfEdges);
      // Initialize history with the first build
      setHistory([{ nodes: rfNodes, edges: rfEdges }]);
      setHistoryIndex(0);
    }

    if (data) build();
  }, [data, setNodes, setEdges, onNodeLabelChange]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Toolbar */}
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 15,
          left: 15,
          display: "flex",
          gap: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <button onClick={undo} disabled={historyIndex <= 0}>
          Undo
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1}>
          Redo
        </button>
        <div style={{ width: "1px", background: "#ddd", margin: "0 5px" }} />
        <button onClick={addEntity}>+ Entity</button>
        <button
          onClick={exportSvg}
          style={{
            background: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Export SVG
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnect={onReconnect}
        fitView
        snapToGrid={true}
        snapGrid={[15, 15]}
        defaultEdgeOptions={{ type: "straight" }}
      >
        <Background gap={15} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
