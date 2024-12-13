export interface UserTypes {
   id?: string;
   email: string;
   fullName: string;
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

export interface CheckBoxProps {
   modelValue: boolean;
   label?: string;
   id: string;
   value: string;
}
export interface ButtonProps {
   error?: boolean;
   isSelected?: boolean;
}

export interface CardProps {
   id?: string;
   title: string;
   date: string;
   priority: 'High' | 'Medium' | 'Low';
   description?: string;
   category?: 'Personal' | 'Work' | 'Study';
}

export interface TaskTypes {
   id?: string;
   date: string;
   title: string;
   priority: 'High' | 'Medium' | 'Low';
   category: 'Personal' | 'Work' | 'Study';
}

export enum CategoriesTypes {
   Personal = 'Personal',
   Work = 'Work',
   Study = 'Study',
}

export enum PriorityTypes {
   Hight = 'High',
   Medium = 'Medium',
   Low = 'Low',
}

export interface PriorityProps {
   priority: PriorityTypes;
}
