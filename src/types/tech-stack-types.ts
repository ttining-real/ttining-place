export interface StackIconTypes {
  id: number;
  name: string;
  url: string;
}

export interface StackItemTypes {
  id: number;
  name: string;
  description?: string;
  stack_icons: StackIconTypes[];
}

export interface StackDataTypes {
  id: number;
  title: string;
  description?: string;
  stack_items: StackItemTypes[];
}
