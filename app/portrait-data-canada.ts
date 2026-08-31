import type { Person } from "./data";

/**
 * Canada portraits are intentionally empty in this batch.
 *
 * The identity and source audit completed successfully, but the browser asset
 * export surface became unavailable before official portrait files could be
 * copied.  Keep initials rather than adding third-party, group, screenshot, or
 * otherwise unverified images.  Future files belong in
 * `public/portraits/canada/<person-id>.jpg` at 512×512.
 */
export const canadaPortraits: Record<string, NonNullable<Person["portrait"]>> = {};
