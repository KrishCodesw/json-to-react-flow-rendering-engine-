import { Handle, Position } from "@xyflow/react";

export default function AttributeNode({ data }: any) {
  return (
    <div style={{ width: 120, height: 60 }}>
      <Handle type="target" position={Position.Top} />
      <svg width={120} height={60} style={{ overflow: "visible" }}>
        <ellipse
          cx="60"
          cy="30"
          rx="56"
          ry="26"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <foreignObject x="10" y="15" width="100" height="30">
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
