export interface EducationDataTypes {
  id: string;
  school_name: string;
  major?: string;
  status: string;
  start_date?: string | Date;
  end_date?: string | Date;
  note?: string;
  created_at: string;
}
