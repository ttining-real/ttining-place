export interface ActivitiesDataTypes {
  id: string;
  company_name: string;
  organization?: string;
  position?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  description?: string[];
  summary?: string;
  image_url?: string;
  created_at?: string;
}
