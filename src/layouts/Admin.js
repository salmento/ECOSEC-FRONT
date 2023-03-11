
import React, { useEffect, useState } from "react";
import { useLocation, Route, Switch, Redirect} from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footers/Footer.js";
import Sidebar from "components/Sidebar/Admin/Sidebar.js";
import routes from "routes/Admin.js";


const Admin = (props) => {
   
  const [expireTime, setExpireTime] = useState(Date.now()+ 300000)

 const checkForInactivity =() =>{
   if(expireTime<Date.now()){
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("auth")
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("address")
   }
 }

 const updateExpireTime=()=>{
   setExpireTime(Date.now()+300000)
 }

  useEffect(()=>{
    const interval=setInterval(()=>{
      checkForInactivity();
    }, 5000)


    return ()=> clearInterval(interval)
  })
  useEffect(()=>{
    window.addEventListener("click", updateExpireTime)
    window.addEventListener("scroll", updateExpireTime)
    window.addEventListener("mousemove", updateExpireTime)
    window.addEventListener("keypress", updateExpireTime)
    return () => {
      window.removeEventListener("click", updateExpireTime)
    window.removeEventListener("scroll", updateExpireTime)
    window.removeEventListener("mousemove", updateExpireTime)
    window.removeEventListener("keypress", updateExpireTime)
    }
  }, [])
 
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar 
        {...props}
        routes={routes}
        bgColor={"bg-default"}
        logo={{
          innerLink: "/admin/reporter",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "Sistema de gestão centralizada",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/reporter" />
        </Switch>
        <Container fluid>
          <Footer  />
        </Container>
      </div>
    </>
  );
};

export default Admin;
