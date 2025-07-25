export interface ScrumEntry {
  id: string;
  date: string;
  yesterday: string;
  today: string;
  blockers: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScrumState {
  entries: Record<string, ScrumEntry>;
  currentDate: string;
}