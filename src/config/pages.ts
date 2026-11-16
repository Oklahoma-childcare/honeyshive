export type PagePath = "/" | "/our-hive/" | "/age-groups/" | "/the-day/" | "/for-families/" | "/contact/";

export const PAGE_META: Record<PagePath, { title: string; description: string }> = {
  "/": {
    title: "Honey's Hive Early Child Learning Center | Childcare in Eufaula, OK",
    description: "Explore Honey's Hive Early Child Learning Center in Eufaula, Oklahoma. Learn about age groups, hours, childcare subsidy, and how to contact the center."
  },
  "/our-hive/": {
    title: "About Honey's Hive | Early Child Learning Center in Eufaula",
    description: "Get to know the publicly listed details for Honey's Hive in Eufaula, Oklahoma, including the director, childcare license, and center contact information."
  },
  "/age-groups/": {
    title: "Age Groups & Childcare | Honey's Hive Eufaula",
    description: "Honey's Hive Eufaula lists childcare for infants, toddlers, preschoolers, and school-age children. Explore the age ranges and ask about availability."
  },
  "/the-day/": {
    title: "Exploring the Day | Honey's Hive Eufaula",
    description: "Find thoughtful questions to ask about arrival, play, meals, rest, and pickup at Honey's Hive Early Child Learning Center in Eufaula, OK."
  },
  "/for-families/": {
    title: "Information for Families | Honey's Hive Eufaula",
    description: "Find Honey's Hive Eufaula's hours, subsidy information, Oklahoma childcare licensing link, enrollment questions, and frequently asked questions."
  },
  "/contact/": {
    title: "Contact & Directions | Honey's Hive Eufaula",
    description: "Call (918) 318-1921 or contact Honey's Hive Early Child Learning Center at 414969 W Hwy 9 in Eufaula, Oklahoma."
  }
};

export const ROUTES: PagePath[] = ["/", "/our-hive/", "/age-groups/", "/the-day/", "/for-families/", "/contact/"];

export function normalizePath(value: string): PagePath {
  const clean = value.split("?")[0].split("#")[0];
  const result = clean === "/" ? "/" : `/${clean.replace(/^\/+|\/+$/g, "")}/`;
  return Object.prototype.hasOwnProperty.call(PAGE_META, result) ? result as PagePath : "/";
}
