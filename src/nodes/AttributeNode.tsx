// src/nodes/AttributeNode.tsx

import { Handle, Position } from "@xyflow/react";

export default function AttributeNode({ data }: any) {
  return (
    <div style={{ width: 120, height: 60 }}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <svg width={120} height={60}>
        <ellipse
          cx="60"
          cy="30"
          rx="56"
          ry="26"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />

        <text x="60" y="35" textAnchor="middle" fontSize="12">
          {data.label}
        </text>
      </svg>
    </div>
  );
}
