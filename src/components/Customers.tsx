import { FiTrash } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import useContextForm from '../hooks/useContextForm';
import React from 'react';
import { CustomerProps } from '../interfaces/interface';
import CustomerModal from './CustomerModal';

const Customers = () => {
  const { customers, loadCustomers, deleteCustomer } = useContextForm();
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<CustomerProps | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  
  const openModal = (customer: CustomerProps) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="flex flex-col gap-8">
        {customers.map((customer) => {
          return (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative"
            >
              <div className="flex text-center gap-2">
                <h1 className="font-semibold ">Nome:</h1>
                <span className="font-medium capitalize">{customer.name}</span>
              </div>
              <div className="flex text-center gap-2">
                <h1 className="font-semibold ">Telefone:</h1>
                <span className="font-medium capitalize">
                  {customer.telephone}
                </span>
              </div>
              <div className="flex text-center gap-2">
                <h1 className="font-semibold">Email:</h1>
                <span className="font-medium">{customer.email}</span>
              </div>
              <button
                onClick={() => {
                  deleteCustomer(customer.id);
                }}
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -right-2 "
                style={{ top: '80%' }}
              >
                <FiTrash size={18} color="#fff" />
              </button>
              <button
                onClick={() => openModal(customer)}
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -right-2 -top-2 "
              >
                <FiEdit size={18} color="#fff" />
              </button>
            </article>
          );
        })}
      </section>
      {selectedCustomer && (
        <CustomerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          customer={selectedCustomer}
        />
      )}
    </>
  );
};

export default Customers;
