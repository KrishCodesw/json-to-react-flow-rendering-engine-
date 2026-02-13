import { Handle, Position } from "@xyflow/react";

export default function WeakEntityNode({ data }: any) {
  return (
    <div style={{ width: 150, height: 70 }}>
      <Handle type="target" position={Position.Top} />
      <svg width={150} height={70}>
        <rect
          x="2"
          y="2"
          width="146"
          height="66"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <rect
          x="6"
          y="6"
          width="138"
          height="58"
          fill="none"
          stroke="black"
          strokeWidth="1"
        />
        <foreignObject x="10" y="20" width="130" height="30">
          <input
            className="nodrag"
            value={data.label}
            onChange={(evt) => data.onChange(evt.target.value)}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "center",
              outline: "none",
            }}
          />
        </foreignObject>
      </svg>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
