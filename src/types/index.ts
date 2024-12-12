export interface UserTypes {
  email: string;
  fullName: string;
  id: string;
  password: string;
  confirmPassword: string;
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
  label: string;
  id: string;
  error?: boolean;
}

export interface ButtonProps {
  text: string;
}
