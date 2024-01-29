import React from "react";
import LoginForm from "./pages/Login/Login";

const App = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default App;

//// App.js
//import React from "react";
//import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
//import { AuthProvider } from "./AuthContext"; // Certifique-se de ajustar o caminho conforme necessário
//import PrivateRoute from "./PrivateRoute"; // Certifique-se de ajustar o caminho conforme necessário
//import Home from "./Home";
//import Login from "./Login";

//const App = () => {
//  return (
//    <AuthProvider>
//      <Router>
//        <Switch>
//          <PrivateRoute path="/home" component={Home} />
//          <Route path="/login" component={Login} />
//          <Redirect from="/" to="/login" />
//        </Switch>
//      </Router>
//    </AuthProvider>
//  );
//};

//export default App;
