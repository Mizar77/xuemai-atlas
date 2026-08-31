import type { Person } from "./data";

// Intentionally empty: the official source pages were verified, but their
// original portrait assets could not be downloaded and visually inspected in
// this run. Keep the mapping free of broken or low-confidence entries.
export const globalP0APortraits: Record<string, NonNullable<Person["portrait"]>> = {};
