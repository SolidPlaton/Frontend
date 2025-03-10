import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout'
import Menu from './components/Menu'
import { Router } from "./Router"

import './App.css'
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Menu /> {/* Menu só deve aparecer quando o usuario estiver logado  */}
          <Router />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
