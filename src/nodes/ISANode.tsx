// src/nodes/ISANode.tsx
import { Handle, Position } from "@xyflow/react";

export default function ISANode() {
  return (
    <div style={{ width: 120, height: 60 }}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <svg width={80} height={60}>
        <polygon points="40,2 78,58 2,58" fill="white" stroke="black" />

        <text x="40" y="40" textAnchor="middle" fontSize="12">
          ISA
        </text>
      </svg>
    </div>
  );
}
