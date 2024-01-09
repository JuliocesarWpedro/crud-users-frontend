import React from 'react';
import validator from 'validator';
import { SubmitHandler } from 'react-hook-form';
import { api } from '../services/api';
import { APIError, CustomerProps, Inputs } from '../interfaces/interface';
import axios, { AxiosError } from 'axios';

interface ContextProps {
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

const FunctionsContext = React.createContext<ContextProps | null>(null);

function FunctionsProvider({ children }: React.PropsWithChildren) {
  const [customers, setCustomers] = React.useState<CustomerProps[]>([]);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [errorMessageEmail, setErrorMessageEmail] = React.useState<
    string | null
  >(null);
  const [formSucceeded, setFormSucceeded] = React.useState<boolean>(false);
  const [deletedSucceeded, setDeletedSucceeded] =
    React.useState<boolean>(false);



  const [updateSucceeded, setUpdateSucceeded] = React.useState<boolean>(false);
  const [existsEmailUpdate, setExistsEmailUpdate] =
    React.useState<boolean>(false);
  const [invalidEmailUpdate, setInvalidEmailUpdate] =
    React.useState<boolean>(false);
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

  const checkEmailAlreadyExists = (email: string): boolean => {
    const isAlreadty = customers.some((customer) => {
      return customer.email == email;
    });
    return isAlreadty;
  };

  const formatPhoneNumber = (inputValue: string): string => {
    const formatted = inputValue
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');

    return formatted;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setFormSucceeded(false);
    if (!data.name || !data.telephone || !data.email) return;

    try {
      if (checkEmailAlreadyExists(data.email)) {
        setErrorMessageEmail('Esse e-mail já existe');
        return;
      }

      if (!validator.isEmail(data.email)) {
        setErrorMessageEmail('Insira um e-mail válido');
        return;
      }
      const response = await api.post('users', {
        name: data.name,
        telephone: data.telephone,
        email: data.email,
      });

      if (response) {
        setFormSucceeded(true);
        setPhoneNumber('');
        setErrorMessageEmail(null);
        loadCustomers();
        setCustomers((allCustomers) => [...allCustomers, response.data]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<APIError>;
        if (axiosError.response) {
          setErrorMessageEmail(String(axiosError.response.data));
        }
      }
    }
  };

  async function loadCustomers() {
    const response = await api.get('users');
    setCustomers(response.data);
  }

  async function deleteCustomer(id: string) {
    try {
      setDeletedSucceeded(false);
      const response = await api.delete(`users/${id}`);
      if (response.status === 200) {
        loadCustomers();
        setDeletedSucceeded(true);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function updateCustomer(customer: CustomerProps) {
    setIsUpdating(true);
    const { emailUsed, id, name, email, telephone } = customer;
    if (!id || !name || !email || !email) {
      setIsUpdating(false);
      return;
    }
    try {
      setInvalidEmailUpdate(false);
      setExistsEmailUpdate(false);
      setUpdateSucceeded(false);
      const updatedData = { name, email, telephone };

      if (checkEmailAlreadyExists(email) && email !== emailUsed) {
        setIsUpdating(false);
        setExistsEmailUpdate(true);
        return;
      }

      if (!validator.isEmail(email)) {
        setIsUpdating(false);
        setInvalidEmailUpdate(true);
        return;
      }

      const response = await api.patch(`users/${id}`, updatedData);
      if (response.status === 200) {
        setIsUpdating(false);
        setInvalidEmailUpdate(false);
        setExistsEmailUpdate(false);
        setUpdateSucceeded(true);
        loadCustomers();
      }
    } catch (error) {
      setIsUpdating(false);
      throw new Error(String(error));
    }
  }

  const contextValue = {
    updateCustomer,
    setUpdateSucceeded,
    updateSucceeded,
    setDeletedSucceeded,
    deletedSucceeded,
    loadCustomers,
    deleteCustomer,
    onSubmit,
    setCustomers,
    customers,
    errorMessageEmail,
    setErrorMessageEmail,
    phoneNumber,
    setPhoneNumber,
    checkEmailAlreadyExists,
    setFormSucceeded,
    formSucceeded,
    setIsUpdating,
    isUpdating,
    formatPhoneNumber,
    existsEmailUpdate,
    invalidEmailUpdate,
  };

  return (
    <FunctionsContext.Provider value={contextValue}>
      {children}
    </FunctionsContext.Provider>
  );
}

export { FunctionsProvider, FunctionsContext };
