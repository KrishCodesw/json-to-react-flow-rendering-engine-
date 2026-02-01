// src/nodes/RelationshipNode.tsx
import { Handle, Position } from "@xyflow/react";

export default function RelationshipNode({ data }: any) {
  return (
    <div style={{ width: 120, height: 60 }}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <svg width={120} height={80}>
        <polygon
          points="60,2 118,40 60,78 2,40"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />

        <text x="60" y="45" textAnchor="middle">
          {data.label}
        </text>
      </svg>
    </div>
  );
}
