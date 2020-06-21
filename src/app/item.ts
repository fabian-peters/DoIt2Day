export interface Item {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  urgent: boolean;
  important: boolean;
  targetDate: Date;
}
