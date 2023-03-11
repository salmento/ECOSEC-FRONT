
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import OperatorLayout from "layouts/Operator";
import ReportLayout from "layouts/Report"

const root = ReactDOM.createRoot(document.getElementById("root"))


root.render(
  
    <BrowserRouter>
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/operator" render={(props) => <OperatorLayout {...props} />} />
      <Route path="/report" render={(props) => <ReportLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
      
    </Switch>
  </BrowserRouter> 
  
);
