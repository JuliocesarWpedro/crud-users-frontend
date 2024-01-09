import { useForm } from 'react-hook-form';
import useContextForm from '../hooks/useContextForm';
import { Inputs } from '../interfaces/interface';
import { ChangeEvent } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const {
    setPhoneNumber,
    phoneNumber,
    onSubmit,
    errorMessageEmail,
    setErrorMessageEmail,
    formSucceeded,
    setFormSucceeded,
    deletedSucceeded,
    setDeletedSucceeded,
    formatPhoneNumber,
  } = useContextForm();

  React.useEffect(() => {
    if (formSucceeded) {
      reset({
        name: '',
        telephone: '',
        email: '',
      });
      toast.success('Usuário cadastrado com sucesso');
      setFormSucceeded(false);
    }
  }, [formSucceeded, reset, setFormSucceeded]);

  React.useEffect(() => {
    if (deletedSucceeded) {
      toast.success('Usuário deletado com sucesso');
      setDeletedSucceeded(false);
    }
  }, [deletedSucceeded, setDeletedSucceeded]);

  const handleEmailChange = () => {
    if (errorMessageEmail) {
      setErrorMessageEmail(null);
    }
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-6">
        <label className="font-medium text-white  mb-3">Nome:</label>
        <input
          {...register('name', {
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Por favor, insira apenas letras no campo.',
            },
          })}
          className="w-full mb-1 p-3 rounded"
          type="text"
          placeholder="Digite seu nome"
        />
        {errors.name && (
          <span className="text-red-400">{errors.name.message}</span>
        )}
        <label className="font-medium text-white  mb-3">Telefone:</label>
        <input
          {...register('telephone', {
            required: 'Este campo é obrigatório',
            validate: (value) =>
              value.replace(/\D/g, '').length === 11 ||
              'Número de telefone inválido',
          })}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="w-full mb-1 p-3 rounded"
          type="tel"
          placeholder="(XX) XXXXX-XXXX"
        />
        {errors.telephone && (
          <span className="text-red-400">{errors.telephone.message}</span>
        )}
        <label className="font-medium text-white mb-3">Email:</label>
        <input
          {...register('email', {
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Insira um e-mail válido',
            },
          })}
          className="w-full mb-1 p-2 rounded"
          type="email"
          placeholder="Digite seu E-mail"
          onChange={handleEmailChange}
        />
        <div className="flex flex-col justify-start">
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
          {errorMessageEmail ? (
            <span className="text-red-400">{errorMessageEmail}</span>
          ) : (
            ''
          )}
        </div>
        <button
          type="submit"
          className="flex cursor-pointer text-white gap-3 items-center justify-center w-full p-2 bg-green-400 rounded font-medium mt-5 mb-10 hover:font-bold text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span>Enviando</span>
              <div className="h-7 w-7 border-4 border-l-white border-r-white border-b-white border-t-green-400 animate-spin ease-linear rounded-full "></div>
            </>
          ) : (
            <span>Cadastrar</span>
          )}
        </button>
      </form>
    </>
  );
};

export default Form;
