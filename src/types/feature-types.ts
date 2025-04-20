export interface FeatureItemTypes {
  title: string;
  description: string | string[];
  icons?: string[];
}

export interface FeatureCardTypes {
  title: string;
  items: FeatureItemTypes[];
  color: 'primary' | 'white';
  colSpan: number;
}
