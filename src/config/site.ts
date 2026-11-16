/** Contact, opening hours, social links, and external destinations are edited HERE. */
export const SITE = {
  name: "Honey's Hive Early Child Learning Center",
  shortName: "Honey's Hive",
  locationLabel: "Eufaula, Oklahoma",
  street: "414969 W Hwy 9",
  city: "Eufaula",
  state: "OK",
  zip: "74432",
  phoneDisplay: "(918) 318-1921",
  phoneDial: "+19183181921",
  email: "honeys.hive22@gmail.com",
  director: "Ashlee Forwoodson",
  hours: "7:00 AM – 5:30 PM",
  weekdays: "Monday – Friday",
  capacity: 60,
  stars: 3,
  acceptsSubsidy: true,
  licenseId: "K830058324",
  licenseUrl: "https://ccl.dhs.ok.gov/providers/K830058324",
  facebook: "https://www.facebook.com/p/Honeys-Hive-100083982752046/",
  instagram: "", // No Instagram profile verified; do not invent one.
  /** Optional: fill in ONLY once a real domain is assigned, e.g. https://example.com */
  siteUrl: ""
} as const;

export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.street}, ${SITE.city}, ${SITE.state} ${SITE.zip}, USA`)}`;
