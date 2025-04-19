export interface CareerTypes {
  id: string;
  company_name: string;
  department?: string;
  position?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  description?: string[];
  major_task?: string[];
  achievements?: string[];
  location?: string;
  summary?: string;
  image_url?: string;
  created_at?: string;
}
