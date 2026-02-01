// src/nodes/WeakEntityNode.tsx
import { Handle, Position } from "@xyflow/react";

export default function WeakEntityNode({ data }: any) {
  return (
    <div style={{ width: 120, height: 60 }}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <svg width={160} height={80}>
        <rect x="4" y="4" width="152" height="72" stroke="black" fill="none" />
        <rect x="8" y="8" width="144" height="64" stroke="black" fill="none" />

        <text x="80" y="45" textAnchor="middle">
          {data.label}
        </text>
      </svg>
    </div>
  );
}
