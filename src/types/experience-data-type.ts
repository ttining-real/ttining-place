export interface ExperienceDataTypes {
  id: string;
  type: 'career' | 'activity';
  company_name: string;
  department: string;
  position: string;
  start_date: string;
  end_date: string;
  role: string[];
  major_task: string[];
  description: string[];
  achievements: string[];
  tech_stack: string[];
  location: string[];
  image_url: string;
}
