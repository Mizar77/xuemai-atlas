import { people, relationships } from "../app/data";
import { undirectedConnectedPersonIds } from "../app/graph-connectivity";

type NetworkExpectation = {
  id: string;
  minDirect: number;
  minComponent: number;
};

/** Regression floor for foundational scholars whose sparse graphs are especially misleading. */
const expectations: NetworkExpectation[] = [
  { id: "yoshua-bengio-ca", minDirect: 11, minComponent: 40 },
  { id: "geoffrey-hinton-ca", minDirect: 8, minComponent: 20 },
  { id: "yann-lecun-us", minDirect: 4, minComponent: 20 },
  { id: "michael-jordan-eu", minDirect: 6, minComponent: 15 },
  { id: "stuart-russell-us", minDirect: 3, minComponent: 4 },
  { id: "ian-goodfellow-foundational", minDirect: 3, minComponent: 40 },
  { id: "christopher-manning-us", minDirect: 5, minComponent: 20 },
  { id: "fei-fei-li-us", minDirect: 4, minComponent: 10 },
  { id: "jitendra-malik-us", minDirect: 4, minComponent: 10 },
  { id: "judea-pearl-historical", minDirect: 3, minComponent: 4 },
  { id: "pieter-abbeel-us", minDirect: 3, minComponent: 5 },
  { id: "sergey-levine-us", minDirect: 3, minComponent: 5 },
];

const nonSelfRelationships = relationships.filter((relationship) => relationship.from !== relationship.to);
const rows = expectations.map((expectation) => {
  const person = people.find((candidate) => candidate.id === expectation.id);
  if (!person) throw new Error(`Network audit missing expected person: ${expectation.id}`);
  const direct = nonSelfRelationships.filter((relationship) => relationship.from === expectation.id || relationship.to === expectation.id).length;
  const component = undirectedConnectedPersonIds(expectation.id, nonSelfRelationships).size;
  return { person: person.name, direct, component, minDirect: expectation.minDirect, minComponent: expectation.minComponent };
});

console.log("Foundational network coverage");
console.table(rows);

const failures = rows.filter((row) => row.direct < row.minDirect || row.component < row.minComponent);
if (failures.length) {
  throw new Error(`Foundational network regression: ${failures.map((row) => row.person).join(", ")}`);
}
