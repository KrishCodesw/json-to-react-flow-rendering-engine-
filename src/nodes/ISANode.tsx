import { Handle, Position } from "@xyflow/react";

export default function ISANode({ data }: any) {
  return (
    <div style={{ width: 80, height: 60 }}>
      <Handle type="target" position={Position.Top} />
      <svg width={80} height={60} style={{ overflow: "visible" }}>
        <polygon
          points="40,2 78,58 2,58"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <foreignObject x="10" y="32" width="60" height="25">
          <input
            className="nodrag"
            value={data?.label || "ISA"}
            onChange={(evt) => data?.onChange?.(evt.target.value)}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "bold",
              outline: "none",
            }}
          />
        </foreignObject>
      </svg>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
