export interface UserTypes {
  email: string;
  fullName: string;
  id: string;
  password: string;
  confirmPassword: string;
  tasks?: TaskTypes[] | [];
}

export interface UserLoginTypes {
  email: string;
  password: string;
}

export interface UserErrorTypes {
  email: boolean;
  fullName: boolean;
  id: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface FieldTextProps {
  type: string;
  placeholder: string;
  modelValue: string | number;
  label?: string;
  id: string;
  error?: boolean;
  isTextArea?: boolean;
}

export interface ButtonProps {}

export interface CardProps {
  title: string;
  date: string;
  priority: "High" | "Medium" | "Low";
  description?: string;
}

export interface TaskTypes {
  date: string;
  title: string;
  priority: "High" | "Medium" | "Low";
}

export enum CategoriesTypes {
  Personal = "Personal",
  Work = "Work",
  Study = "Study",
}

export enum PriorityTypes {
  Hight = "High",
  Medium = "Medium",
  Low = "Low",
}

export interface PriorityProps {
  priority: PriorityTypes;
}
