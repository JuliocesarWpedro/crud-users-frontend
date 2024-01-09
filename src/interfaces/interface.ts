import { SubmitHandler } from "react-hook-form";

export interface Inputs {
  name: string;
  telephone: string;
  email: string;
}

export interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerProps;
}

export interface InputsUpdate {
  nameUpdate?: string;
  telephoneUpdate?: string;
  emailUpdate?: string;
}

export interface APIError {
  message: string;
  status?: number;
  code?: string;
}

export interface CustomerProps {
  emailUsed: string;
  name: string;
  telephone: string;
  email: string;
  id: string;
}

export interface APIError {
  error: string;
}

export interface ContextProps {
  loadCustomers(): Promise<void>;
  deleteCustomer(id: string): Promise<void>;
  onSubmit: SubmitHandler<Inputs>;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>;
  customers: CustomerProps[];
  errorMessageEmail: string | null;
  setErrorMessageEmail: React.Dispatch<React.SetStateAction<string | null>>;
  checkEmailAlreadyExists: (email: string) => boolean;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setFormSucceeded: React.Dispatch<React.SetStateAction<boolean>>;
  formSucceeded: boolean;
  deletedSucceeded: boolean;
  setDeletedSucceeded: React.Dispatch<React.SetStateAction<boolean>>;
  updateCustomer(customer: CustomerProps): Promise<void>;
  updateSucceeded: boolean;
  setUpdateSucceeded: React.Dispatch<React.SetStateAction<boolean>>;
  formatPhoneNumber: (inputValue: string) => string;
  existsEmailUpdate: boolean;
  invalidEmailUpdate: boolean;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}
