export interface ActivitiesTypes {
  id: string;
  title: string;
  organization?: string;
  position?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  description?: string[];
  summary?: string;
  image_url?: string;
  created_at?: string;
}
