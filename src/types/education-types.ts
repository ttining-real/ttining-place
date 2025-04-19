export interface EducationTypes {
  id: string;
  school_name: string;
  major?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  status?: string;
  note?: string;
  created_at?: string;
}
