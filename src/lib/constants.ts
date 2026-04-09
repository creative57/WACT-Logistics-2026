export const BUSINESS = {
  name:      "WACT Logistics LLC",
  phone:     "972-984-8858",
  phoneHref: "tel:9729848858",
  address:   "11560 TX-56, Sherman, TX 75090",
  city:      "Sherman, TX",
  state:     "Texas",
  county:    "Grayson County",
  website:   "wactlogisticsllc.com",
  email:     "",
  hours: {
    weekday: "Mon–Fri 7am–5pm",
    saturday: "Sat 7am–12pm",
    sunday: "Closed",
  },
} as const;

export const PAYMENT = {
  cardFeeRate:    0.035,
  cardFeeLabel:   "3.5%",
  cardDisclosure: "All major cards accepted · 3.5% processing fee at checkout",
  cashDisclosure: "Cash always accepted · No processing fee",
} as const;

export const CALCULATOR = {
  truckLoadTons:    13,
  bufferRate:       0.10,
  sodSqFtPerPallet: 450,
  sodWasteRate:     0.05,
} as const;
