// "Dairy & Cheeses" becomes "dairy-cheeses". Returns "" when the name has no latin letters or digits.
export const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
