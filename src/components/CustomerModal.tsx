import React, { ChangeEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CustomerModalProps, InputsUpdate } from '../interfaces/interface';
import useContextForm from '../hooks/useContextForm';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  const {
    updateCustomer,
    existsEmailUpdate,
    invalidEmailUpdate,
    isUpdating,
    formatPhoneNumber,
    updateSucceeded,
    setUpdateSucceeded,
  } = useContextForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsUpdate>({
    mode: 'onChange',
  });
  const [nameUpdateValue, setNameUpdateValue] = React.useState<string>(
    customer.name,
  );
  const [telephoneUpdateValue, setTelephoneUpdateValue] =
    React.useState<string>(customer.telephone);
  const [emailUpdateValue, setEmailUpdateValue] = React.useState<string>(
    customer.email,
  );
  const modalSize = useBreakpointValue({
    base: 'xs',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl',
  });
  React.useEffect(() => {
    if (updateSucceeded) {
      if (!isUpdating) {
        onClose();
        toast.success('Usuário atualizado com sucesso');
        setUpdateSucceeded(false);
      }
    }
  }, [updateSucceeded, onClose, setUpdateSucceeded, customer, isUpdating]);

  React.useEffect(() => {
    setNameUpdateValue(customer.name);
    setTelephoneUpdateValue(customer.telephone);
    setEmailUpdateValue(customer.email);
  }, [customer]);

  const handlePhoneNumberValueChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
    setTelephoneUpdateValue(formattedPhoneNumber);
  };

  const submitUpdate = handleSubmit(() => {
    if (!errors.nameUpdate && !errors.telephoneUpdate && !errors.emailUpdate) {
      const emailUsed = customer.email;
      updateCustomer({
        emailUsed,
        id: customer.id,
        name: nameUpdateValue,
        email: emailUpdateValue,
        telephone: telephoneUpdateValue,
      });
    }
  });

  return (
    <>
      {' '}
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent backgroundColor="rgb(17 24 39);">
          <ModalHeader className="text-white">Alterar dados</ModalHeader>
          <ModalCloseButton className="text-white" />
          <ModalBody>
            <form
              onSubmit={submitUpdate}
              className="flex flex-col my-6 bg-gray-900"
            >
              <label className="font-medium text-white  mb-3">Nome:</label>
              <input
                {...register('nameUpdate', {
                  required: 'Este campo é obrigatório',
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Por favor, insira apenas letras no campo.',
                  },
                })}
                value={nameUpdateValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNameUpdateValue(e.target.value)
                }
                className="w-full mb-1 p-3 rounded"
                type="text"
                placeholder="Digite seu nome"
              />
              {errors.nameUpdate && (
                <span className="text-red-400">
                  {errors.nameUpdate.message}
                </span>
              )}
              <label className="font-medium text-white  mb-3">Telefone:</label>
              <input
                {...register('telephoneUpdate', {
                  required: 'Este campo é obrigatório',
                  validate: (value) =>
                    value?.replace(/\D/g, '').length === 11 ||
                    'Número de telefone inválido',
                })}
                value={telephoneUpdateValue}
                onChange={handlePhoneNumberValueChange}
                className="w-full mb-1 p-3 rounded"
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
              />
              {errors.telephoneUpdate && (
                <span className="text-red-400">
                  {errors.telephoneUpdate.message}
                </span>
              )}
              <label className="font-medium text-white mb-3">Email:</label>
              <input
                {...register('emailUpdate', {
                  required: 'Este campo é obrigatório',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Insira um e-mail válido',
                  },
                })}
                className="w-full mb-1 p-2 rounded"
                type="email"
                value={emailUpdateValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmailUpdateValue(e.target.value)
                }
                placeholder="Digite seu E-mail"
              />
              <div className="flex flex-col justify-start">
                {invalidEmailUpdate && (
                  <span className="text-red-400">Insira um e-mail válido</span>
                )}
                {existsEmailUpdate && (
                  <span className="text-red-400">Este e-mail já existe</span>
                )}
                {errors.emailUpdate && (
                  <span className="text-red-400">
                    {errors.emailUpdate.message}
                  </span>
                )}
              </div>
              {isUpdating ? (
                <button
                  disabled={true}
                  className="flex cursor-pointer text-white gap-3 items-center justify-center w-full p-2 bg-green-400 rounded font-medium mt-5 mb-10 hover:font-bold text-lg"
                >
                  Atualizando
                  <div className="h-7 w-7 border-4 border-l-white border-r-white border-b-white border-t-green-400 animate-spin ease-linear rounded-full "></div>
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex cursor-pointer text-white gap-3 items-center justify-center w-full p-2 bg-green-400 rounded font-medium mt-5 mb-10 hover:font-bold text-lg"
                >
                  Editar alterações
                </button>
              )}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomerModal;
