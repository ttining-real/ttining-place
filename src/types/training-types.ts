export interface TrainingDataTypes {
  id: string;
  title: string;
  organization?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  status?: string;
  created_at?: string;
}
