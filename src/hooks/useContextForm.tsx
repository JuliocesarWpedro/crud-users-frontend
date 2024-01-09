import React from 'react';
import { FunctionsContext } from '../contexts/ContextFormData';

function useContextForm() {
  const context = React.useContext(FunctionsContext);
  if (context === null) {
    throw new Error('useContextForm must be used within a FunctionsProvider');
  }
  return context;
}

export default useContextForm;
