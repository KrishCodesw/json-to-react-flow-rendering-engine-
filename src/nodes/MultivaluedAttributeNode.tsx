export default function MultivaluedAttributeNode({ data }: any) {
  return (
    <svg width={120} height={60}>
      <ellipse cx="60" cy="30" rx="54" ry="24" fill="none" stroke="black" />

      <ellipse cx="60" cy="30" rx="58" ry="28" fill="none" stroke="black" />

      <text x="60" y="35" textAnchor="middle" fontSize="12">
        {data.label}
      </text>
    </svg>
  );
}
