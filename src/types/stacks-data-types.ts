export interface StackIconTypes {
  id: string;
  item_id: string;
  name: string;
}

export interface StackItemTypes {
  id: string;
  section_id: string;
  title: string;
  description: string[];
  created_at: string;
  stack_icons: StackIconTypes[];
}

export interface StackSectionTypes {
  id: string;
  title: string;
  created_at: string;
  stack_items: StackItemTypes[];
}

export interface StackDataTypes {
  id: number;
  title: string;
  display_order: number;
  description?: string;
  stack_items: StackItemTypes[];
}
