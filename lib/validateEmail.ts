/**
 * Email validation utility for waitlist form
 * Validates email format and catches common typos
 */

type ValidationResult = {
  isValid: boolean;
  error: string | null;
};

// Common typos for popular email domains
const DOMAIN_TYPOS: Record<string, string> = {
  // Gmail typos
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.om": "gmail.com",
  "gmal.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmali.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmaill.com": "gmail.com",
  gmailcom: "gmail.com",
  "gmail.comm": "gmail.com",
  // Yahoo typos
  "yahoo.con": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yhoo.com": "yahoo.com",
  // Hotmail/Outlook typos
  "hotmail.con": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hotmial.com": "hotmail.com",
  "outlook.con": "outlook.com",
  "outlok.com": "outlook.com",
  // Rediffmail typos
  "rediffmail.con": "rediffmail.com",
  "redifmail.com": "rediffmail.com",
};

// Domains that must match exactly (strict validation)
const STRICT_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

export function validateEmail(email: string): ValidationResult {
  // Trim whitespace
  const trimmedEmail = email.trim().toLowerCase();

  // Check if empty
  if (!trimmedEmail) {
    return { isValid: false, error: "Please enter your email address" };
  }

  // Basic format check: must have exactly one @
  const atCount = (trimmedEmail.match(/@/g) || []).length;
  if (atCount === 0) {
    return { isValid: false, error: "Email must contain '@'" };
  }
  if (atCount > 1) {
    return { isValid: false, error: "Email can only have one '@'" };
  }

  // Split into local and domain parts
  const [localPart, domain] = trimmedEmail.split("@");

  // Validate local part
  if (!localPart || localPart.length === 0) {
    return {
      isValid: false,
      error: "Email is missing the username before '@'",
    };
  }

  // Validate domain exists
  if (!domain || domain.length === 0) {
    return { isValid: false, error: "Email is missing the domain after '@'" };
  }

  // Check for common domain typos
  if (DOMAIN_TYPOS[domain]) {
    return {
      isValid: false,
      error: `Did you mean @${DOMAIN_TYPOS[domain]}?`,
    };
  }

  // Strict validation for Gmail and other major providers
  // If someone types "gmail" anywhere but doesn't use "gmail.com", reject it
  for (const strictDomain of STRICT_DOMAINS) {
    const provider = strictDomain.split(".")[0]; // e.g., "gmail"
    if (domain.includes(provider) && domain !== strictDomain) {
      return {
        isValid: false,
        error: `${provider} addresses must end with @${strictDomain}`,
      };
    }
  }

  // Domain must have at least one dot
  if (!domain.includes(".")) {
    return { isValid: false, error: "Invalid email domain" };
  }

  // Domain can't start or end with a dot
  if (domain.startsWith(".") || domain.endsWith(".")) {
    return { isValid: false, error: "Invalid email domain" };
  }

  // Check TLD exists (at least 2 characters after last dot)
  const tld = domain.split(".").pop();
  if (!tld || tld.length < 2) {
    return { isValid: false, error: "Invalid email domain extension" };
  }

  // Basic format validation (simple regex for structure, not over-engineered)
  const simpleEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!simpleEmailPattern.test(trimmedEmail)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true, error: null };
}
