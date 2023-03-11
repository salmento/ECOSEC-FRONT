
import Login from "views/auth/Login.js";
import ForgetPassword from "views/auth/ForgetPassword";
import ResetPassword from "views/auth/ResetPassword";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-planet text-white",
    component: Login,
    layout: "/auth",
    color: "green",
  },
  {
    path: "/forgetpassword",
    name: "Forget Password",
    icon: "ni ni-planet text-white",
    component: ForgetPassword,
    layout: "/auth",
    color: "green",
  },
  {
    path: "/resetpassword",
    name: "Reset Password",
    icon: "ni ni-planet text-white",
    component: ResetPassword,
    layout: "/auth",
    color: "green",
  },
];
export default routes;
