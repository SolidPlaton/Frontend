import { BrowserRouter } from 'react-router-dom';

import { Router } from "./Router"

import './App.css'
import { AuthProvider } from './context/AuthContext';
import { DialogosContextProvider } from './context/Dialogos';



function App() {
  return (
    <AuthProvider>
      <DialogosContextProvider>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
      </DialogosContextProvider>
    </AuthProvider>
  );
}

export default App
