export const SalesReportStatus = {
  Lead: "lead",
  Qualified: "qualified",
  Proposal: "proposal",
  Won: "won",
  Lost: "lost",
} as const;

export type SalesReportStatus =
  typeof SalesReportStatus[keyof typeof SalesReportStatus];