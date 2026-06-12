export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  clearanceLevel: string; // sci-fi flavor
  metric?: {
    label: string;
    value: string;
  };
}
