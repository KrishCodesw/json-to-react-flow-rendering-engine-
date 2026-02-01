import { parseER } from "../parser";

const sample = {
  conceptual_er_model: {
    entities: [
      {
        name: "User",
        type: "strong",
        attributes: [
          { name: "id" },
          { name: "email" },
        ],
      },
    ],
    relationships: [],
    specializations: [],
  },
};

test("parses entities", () => {
  const result = parseER(sample);

  expect(result.nodes.length).toBe(3); // 1 entity + 2 attrs
  expect(result.edges.length).toBe(2);
});
