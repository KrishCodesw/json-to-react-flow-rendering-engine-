import { Handle, Position } from "@xyflow/react";

export default function EntityNode({ data }: any) {
  return (
    <div
      style={{ padding: "10px", border: "1px solid #777", background: "#fff" }}
    >
      <Handle type="target" position={Position.Top} />

      {/* Change from a static <div> to an <input> */}
      <input
        value={data.label}
        onChange={(evt) => data.onChange(evt.target.value)}
        style={{ border: "none", textAlign: "center", outline: "none" }}
      />

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
