import { Handle, Position } from "@xyflow/react";

export default function EntityNode({ data }: any) {
  return (
    <div style={{ width: 160, height: 80 }}>
      {/* Incoming */}
      <Handle type="target" position={Position.Top} />

      {/* Outgoing */}
      <Handle type="source" position={Position.Bottom} />

      <svg width={160} height={80}>
        <rect
          x="2"
          y="2"
          width="156"
          height="76"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />

        <text x="80" y="45" textAnchor="middle" fontSize="14" fontWeight="600">
          {data.label}
        </text>
      </svg>
    </div>
  );
}
