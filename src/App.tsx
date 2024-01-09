import Customers from './components/Customers';
import Form from './components/Form';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-4xl">
        <h1 className="text-white font-bold text-6xl pt-6 pb-6">
          Cadastrar Usuários
        </h1>
        <Form />
        <Customers />
      </main>
    </div>
  );
}

export default App;
