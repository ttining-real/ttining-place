export interface TimelineDataTypes {
  id: string;
  type: 'si' | 'sm' | 'etc';
  year: number | null;
  title: string[];
  description?: string[] | null;
  created_at: string;
}
