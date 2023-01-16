import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Layout from "./components/layout/Layout";

function App() {
  return (
      <Layout>
          <Routes>
              <Route path='/' element={<LandingPage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/signup' element={<SignUpPage />}></Route>
          </Routes>
      </Layout>
  );
}

export default App;
