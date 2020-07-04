export interface Item {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  urgent: boolean;
  important: boolean;
  targetDate: Date;
}
