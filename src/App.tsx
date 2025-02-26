import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout'
import Menu from './components/Menu'
import { Router } from "./Router"

import './App.css'



function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Menu /> {/* Menu só deve aparecer quando o usuario estiver logado  */}
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App
