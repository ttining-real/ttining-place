export interface ProjectsDataTypes {
  id: string;
  slug: string;
  type: 'work' | 'side';
  display_order: number;
  title: string;
  role: string[];
  summary: string;
  url: string;
  stack: string[];
  description: string[];
  situation: string[];
  task: string[];
  action: Record<string, string | string[]>[];
  result: Record<string, string | string[]>[];
  start_date: string;
  end_date: string;
  image_url: string;
}
