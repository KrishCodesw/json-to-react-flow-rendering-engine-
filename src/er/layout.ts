import ELK from "elkjs/lib/elk.bundled.js";

const elk = new ELK();

// Helper to find the center of a node
const getCenter = (node: any) => ({
  x: node.position.x + node.width / 2,
  y: node.position.y + node.height / 2,
});

export async function layoutGraph(nodes: any[], edges: any[]) {
  // 1. SEPARATE THE "SKELETON" FROM THE "SATELLITES"
  // We only want ELK to layout Entities and Relationships.
  // Attributes will be placed manually around them.
  const coreNodes = nodes.filter(
    (n) => n.type === "entity" || n.type === "weakEntity" || n.type === "relationship" || n.type === "isa"
  );
  
  const attributeNodes = nodes.filter(
    (n) => n.type === "attribute" || n.type === "multivaluedAttribute"
  );

  // Map which attribute belongs to which entity based on edges
  const attributeParentMap: Record<string, string> = {};
  const coreEdges = edges.filter((e) => {
    const isAttributeEdge =
      attributeNodes.find((a) => a.id === e.target || a.id === e.source) &&
      coreNodes.find((c) => c.id === e.target || c.id === e.source);

    if (isAttributeEdge) {
      // Find who is the attribute and who is the parent
      const attrId = attributeNodes.find((a) => a.id === e.target || a.id === e.source)?.id;
      const parentId = coreNodes.find((c) => c.id === e.target || c.id === e.source)?.id;
      if (attrId && parentId) attributeParentMap[attrId] = parentId;
      return false; // Remove this edge from the ELK simulation
    }
    return true; // Keep entity-to-entity edges
  });

  // 2. CONFIGURE ELK FOR THE SKELETON ONLY
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "stress", // 'stress' is best for unconstrained connectivity
      "elk.stress.desiredEdgeLength": "200", // Give entities breathing room
      "elk.spacing.nodeNode": "100", 
    },
    children: coreNodes.map((n) => ({
      id: n.id,
      width: 140, // Uniform size for the skeleton layout to prevent weird gaps
      height: 70,
    })),
    edges: coreEdges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
    })),
  };

  // 3. RUN THE LAYOUT
  const layout = await elk.layout(graph);

  // 4. APPLY POSITIONS TO CORE NODES
  const finalNodes: any[] = [];
  const corePositions: Record<string, { x: number; y: number }> = {};

  layout.children?.forEach((n: any) => {
    // Center the layout a bit
    const pos = { x: n.x + 100, y: n.y + 100 };
    corePositions[n.id] = pos;
    finalNodes.push({
      id: n.id,
      position: pos,
    });
  });

  // 5. MANUALLY PLACE ATTRIBUTES IN A RADIAL CLUSTER
  // Group attributes by their parent
  const attributesByParent: Record<string, string[]> = {};
  attributeNodes.forEach((attr) => {
    const parentId = attributeParentMap[attr.id];
    if (parentId) {
      if (!attributesByParent[parentId]) attributesByParent[parentId] = [];
      attributesByParent[parentId].push(attr.id);
    } else {
      // Orphan attributes (shouldn't happen often) go to (0,0) or stick around
      finalNodes.push({ id: attr.id, position: { x: 0, y: 0 } });
    }
  });

  // Place them
  Object.entries(attributesByParent).forEach(([parentId, attrIds]) => {
    const parentPos = corePositions[parentId];
    if (!parentPos) return;

    const radius = 130; // Distance from Entity center to Attribute center
    const stepAngle = (2 * Math.PI) / attrIds.length;
    
    attrIds.forEach((attrId, index) => {
      const angle = index * stepAngle;
      // Calculate position
      const x = parentPos.x + radius * Math.cos(angle) + 20; // +20 offset to center relatively
      const y = parentPos.y + radius * Math.sin(angle) + 20;
      
      finalNodes.push({
        id: attrId,
        position: { x, y },
      });
    });
  });

  return finalNodes;
}