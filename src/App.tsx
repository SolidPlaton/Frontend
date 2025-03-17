import { BrowserRouter } from 'react-router-dom';

import { Router } from "./Router"

import './App.css'
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
