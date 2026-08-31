import { regionOf, regionalInstitutions, type Person, type Region } from "./data";

export type GraphRect = { left: number; top: number; width: number; height: number };

export type GlobalGraphInstitution = {
  id: string;
  key: string;
  label: string;
  region: Region;
  rect: GraphRect;
  count: number;
  institution: Person["institution"];
};

export type GlobalGraphRegion = {
  region: Region;
  rect: GraphRect;
  institutions: GlobalGraphInstitution[];
};

export type GlobalGraphLayout = {
  width: number;
  height: number;
  positions: Map<string, { x: number; y: number }>;
  regions: GlobalGraphRegion[];
};

export const graphRegionOrder: Region[] = ["Mainland China", "Hong Kong", "Singapore", "United States", "Canada", "Europe"];

export function graphInstitutionKey(person: Person) {
  return person.actualInstitution?.trim() || person.institution;
}

function institutionDiameter(count: number) {
  if (count <= 1) return 150;
  if (count === 2) return 190;
  if (count <= 4) return 240;
  const columns = Math.max(1, Math.ceil(Math.sqrt(count)));
  return Math.min(700, 80 + columns * 98);
}

function sunflowerPoint(index: number, count: number, rect: GraphRect) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  if (count <= 1) return { x: centerX, y: centerY };
  if (count <= 4) {
    const radius = rect.width * .27;
    const angle = -Math.PI / 2 + index * Math.PI * 2 / count;
    return { x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius };
  }
  const maxRadius = Math.max(42, rect.width / 2 - 64);
  const normalized = Math.sqrt((index + .45) / Math.max(count, 1));
  const angle = index * 137.507764 * Math.PI / 180;
  return {
    x: centerX + Math.cos(angle) * maxRadius * normalized,
    y: centerY + Math.sin(angle) * maxRadius * normalized,
  };
}

function localRegionLayout(region: Region, people: Person[]) {
  const groups = new Map<string, Person[]>();
  people.forEach((person) => {
    const key = graphInstitutionKey(person);
    groups.set(key, [...(groups.get(key) ?? []), person]);
  });
  const preferred = regionalInstitutions[region].map(String);
  const entries = [...groups.entries()].sort(([a], [b]) => {
    const aIndex = preferred.indexOf(a);
    const bIndex = preferred.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
    return a.localeCompare(b);
  });
  const padding = 58;
  const header = 78;
  const gap = 34;
  const targetWidth = Math.max(1380, Math.min(2400, 1180 + Math.sqrt(Math.max(people.length, 1)) * 94));
  let cursorX = padding;
  let cursorY = header;
  let rowHeight = 0;
  let usedWidth = 0;
  const zones: Array<{ key: string; members: Person[]; rect: GraphRect }> = [];
  entries.forEach(([key, members]) => {
    const diameter = institutionDiameter(members.length);
    if (cursorX > padding && cursorX + diameter > targetWidth - padding) {
      cursorX = padding;
      cursorY += rowHeight + gap;
      rowHeight = 0;
    }
    const rect = { left: cursorX, top: cursorY, width: diameter, height: diameter };
    zones.push({ key, members, rect });
    cursorX += diameter + gap;
    rowHeight = Math.max(rowHeight, diameter);
    usedWidth = Math.max(usedWidth, cursorX - gap + padding);
  });
  return {
    width: Math.max(720, usedWidth),
    height: Math.max(560, cursorY + rowHeight + padding),
    zones,
  };
}

export function buildGlobalGraphLayout(graphPeople: Person[]): GlobalGraphLayout {
  const local = graphRegionOrder.map((region) => ({
    region,
    layout: localRegionLayout(region, graphPeople.filter((person) => regionOf(person) === region)),
  }));
  const margin = 70;
  const regionGap = 90;
  const columnCount = 3;
  const columnWidths = Array.from({ length: columnCount }, (_, column) => Math.max(...local.filter((_, index) => index % columnCount === column).map(({ layout }) => layout.width)));
  const columnLeft = columnWidths.map((_, column) => margin + columnWidths.slice(0, column).reduce((sum, width) => sum + width, 0) + regionGap * column);
  const rowHeights = [0, 1].map((row) => Math.max(...local.slice(row * columnCount, (row + 1) * columnCount).map(({ layout }) => layout.height)));
  const rowTop = [margin, margin + rowHeights[0] + regionGap];
  const positions = new Map<string, { x: number; y: number }>();
  const regions: GlobalGraphRegion[] = local.map(({ region, layout }, index) => {
    const regionLeft = columnLeft[index % columnCount];
    const regionTop = rowTop[Math.floor(index / columnCount)];
    const institutions = layout.zones.map(({ key, members, rect }, zoneIndex) => {
      const absoluteRect = { left: regionLeft + rect.left, top: regionTop + rect.top, width: rect.width, height: rect.height };
      const sortedMembers = [...members].sort((a, b) => Number(b.primary) - Number(a.primary) || a.name.localeCompare(b.name));
      sortedMembers.forEach((person, memberIndex) => positions.set(person.id, sunflowerPoint(memberIndex, sortedMembers.length, absoluteRect)));
      return {
        id: `${region}-${zoneIndex}-${key}`,
        key,
        label: key,
        region,
        rect: absoluteRect,
        count: members.length,
        institution: members[0]?.institution ?? "External",
      };
    });
    return { region, rect: { left: regionLeft, top: regionTop, width: layout.width, height: layout.height }, institutions };
  });
  return {
    width: margin * 2 + columnWidths.reduce((sum, width) => sum + width, 0) + regionGap * (columnCount - 1),
    height: margin * 2 + rowHeights.reduce((sum, height) => sum + height, 0) + regionGap,
    positions,
    regions,
  };
}
