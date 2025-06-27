export interface ProjectsDataTypes {
  id: string;
  type: 'main' | 'side';
  display_order: number;
  title: string;
  role: string[];
  summary: string;
  stack: string[];
  description: string[];
  situation: string[];
  task: string[];
  action: string[];
  result: string[];
  start_date: string;
  end_date: string;
  image_url: string;
}
