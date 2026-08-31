import type { Person } from "./data";

/**
 * No portrait is included until an official, attributable single-person
 * original can be downloaded and visually checked at 512×512.  This keeps
 * initials for the twelve global-P0 additions instead of accepting search
 * thumbnails, page screenshots, group photos, or third-party copies.
 */
export const globalP0FinalPortraits: Record<string, NonNullable<Person["portrait"]>> = {};

