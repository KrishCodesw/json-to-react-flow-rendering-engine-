import { Handle, Position } from "@xyflow/react";

export default function RelationshipNode({ data }: any) {
  return (
    <div style={{ width: 120, height: 80 }}>
      <Handle type="target" position={Position.Top} />
      <svg width={120} height={80} style={{ overflow: "visible" }}>
        <polygon
          points="60,2 118,40 60,78 2,40"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <foreignObject x="25" y="25" width="70" height="30">
          <input
            className="nodrag"
            value={data.label}
            onChange={(evt) => data.onChange(evt.target.value)}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "center",
              fontSize: "12px",
              outline: "none",
            }}
          />
        </foreignObject>
      </svg>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
