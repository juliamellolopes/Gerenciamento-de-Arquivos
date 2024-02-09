import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { authenticateUser } from "./utils/cookieManager";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword";
import GerenciamentoDeArquivos from "./pages/Gerenciamento/Gerenciamento";

const App = () => {
  // Verificar se há credenciais salvas ao iniciar o aplicativo
  const { user } = authenticateUser();

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/login"
          element={user === "true" ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/gerenciamento"
          element={<PrivateRoute element={<GerenciamentoDeArquivos />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
