/**
 * Attribution tracking helper for waitlist signups
 * Captures ref and UTM params from URL, persists to localStorage
 */

const STORAGE_KEY = "woohl_attribution";

// All attribution params we track
const ATTRIBUTION_PARAMS = ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type AttributionParams = {
  ref: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
};

/**
 * Creates an empty attribution object with all fields set to null
 */
function getEmptyAttribution(): AttributionParams {
  return {
    ref: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  };
}

/**
 * Normalizes a param value: trim and lowercase
 * Returns null for empty strings
 */
function normalizeValue(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

/**
 * Reads attribution params from URL search string
 */
function parseAttributionFromURL(): Partial<AttributionParams> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const attribution: Partial<AttributionParams> = {};

  for (const param of ATTRIBUTION_PARAMS) {
    const value = params.get(param);
    if (value) {
      attribution[param] = normalizeValue(value);
    }
  }

  return attribution;
}

/**
 * Loads stored attribution from localStorage
 */
function loadStoredAttribution(): AttributionParams | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AttributionParams;
  } catch {
    return null;
  }
}

/**
 * Saves attribution to localStorage
 */
function saveAttribution(attribution: AttributionParams): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Captures attribution params on page load
 * - Reads params from URL
 * - Merges with existing stored values (URL values don't overwrite existing)
 * - Persists to localStorage
 *
 * Call this once on initial page load
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const urlParams = parseAttributionFromURL();
  const stored = loadStoredAttribution();

  // If nothing stored yet, save whatever we have from URL
  if (!stored) {
    const attribution = { ...getEmptyAttribution(), ...urlParams };
    saveAttribution(attribution);
    return;
  }

  // Merge: only add URL params where stored value is null
  let hasChanges = false;
  for (const param of ATTRIBUTION_PARAMS) {
    if (stored[param] === null && urlParams[param]) {
      stored[param] = urlParams[param]!;
      hasChanges = true;
    }
  }

  if (hasChanges) {
    saveAttribution(stored);
  }
}

/**
 * Gets the stored attribution params
 * Returns all fields (may be null) for inclusion in form payload
 */
export function getAttribution(): AttributionParams {
  const stored = loadStoredAttribution();
  return stored ?? getEmptyAttribution();
}

/**
 * Clears stored attribution (useful for testing or reset)
 */
export function clearAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}
