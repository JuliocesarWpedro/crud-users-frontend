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
