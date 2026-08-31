import type { Person } from "./data";

/**
 * Intentionally empty until official-page image files can be downloaded and
 * visually inspected. The completeness audit identified official image URLs,
 * but this environment could not materialize the binaries after its browser
 * session became unavailable. Keeping this map empty prevents broken local
 * paths or unverified third-party portraits from entering the atlas.
 */
export const globalP0Portraits: Record<string, NonNullable<Person["portrait"]>> = {};

