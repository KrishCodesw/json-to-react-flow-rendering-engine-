import ELK from "elkjs/lib/elk.bundled.js";

const elk = new ELK();

export async function layoutGraph(nodes: any[], edges: any[]) {
  const coreNodes = nodes.filter(n => ["entity", "weakEntity", "relationship", "isa"].includes(n.type));
  const attributeNodes = nodes.filter(n => ["attribute", "multivaluedAttribute"].includes(n.type));
  const coreNodeIds = new Set(coreNodes.map(n => n.id));

  // Association Mapping
  const parentToAttributes: Record<string, string[]> = {};
  const attributeParentMap: Record<string, string> = {};

  edges.forEach(e => {
    let attrId, parentId;
    if (attributeNodes.find(a => a.id === e.source) && coreNodeIds.has(e.target)) {
      attrId = e.source; parentId = e.target;
    } else if (attributeNodes.find(a => a.id === e.target) && coreNodeIds.has(e.source)) {
      attrId = e.target; parentId = e.source;
    }

    if (attrId && parentId) {
      attributeParentMap[attrId] = parentId;
      if (!parentToAttributes[parentId]) parentToAttributes[parentId] = [];
      parentToAttributes[parentId].push(attrId);
    }
  });

  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "stress",
      "elk.stress.desiredEdgeLength": "200",
      "elk.spacing.nodeNode": "100",
    },
    children: coreNodes.map(n => {
      const attrCount = parentToAttributes[n.id]?.length || 0;
      const requiredRadius = 120 + (attrCount * 20); 
      const boxSize = requiredRadius * 2;

      return { 
        id: n.id, 
        width: boxSize, 
        height: boxSize,
        layoutOptions: { "desiredRadius": requiredRadius.toString() } 
      };
    }),
    edges: edges
      .filter(e => coreNodeIds.has(e.source) && coreNodeIds.has(e.target))
      .map(e => ({ id: e.id, sources: [e.source], targets: [e.target] })),
  };

  try {
    const layout = await elk.layout(graph);
    const finalNodes: any[] = [];

    layout.children?.forEach((n: any) => {
      const radius = parseFloat(n.layoutOptions?.desiredRadius || "120");
      const centerX = n.x + n.width / 2;
      const centerY = n.y + n.height / 2;

      // Place Entity
      finalNodes.push({
        id: n.id,
        position: { x: centerX - 70, y: centerY - 35 } // Adjust for visual center
      });

      // Place Attributes
      const satellites = parentToAttributes[n.id] || [];
      if (satellites.length > 0) {
        const orbitRadius = radius - 40; 
        const stepAngle = (2 * Math.PI) / satellites.length;

        satellites.forEach((attrId, index) => {
          const angle = index * stepAngle;
          finalNodes.push({
            id: attrId,
            position: {
              x: centerX + (orbitRadius * Math.cos(angle)) - 50,
              y: centerY + (orbitRadius * Math.sin(angle)) - 25,
            }
          });
        });
      }
    });

    // Clean up orphans
    attributeNodes.forEach(attr => {
      if (!attributeParentMap[attr.id]) {
        finalNodes.push({ id: attr.id, position: { x: 0, y: 0 } });
      }
    });

    return finalNodes;
  } catch (error) {
    console.error("Layout Error:", error);
    return nodes.map((n, i) => ({ id: n.id, position: { x: i * 50, y: i * 50 } }));
  }
}