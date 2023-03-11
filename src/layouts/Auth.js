
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import Footer from "components/Footers/Footer.js";

import routes from "../routes/Auth.js";
import backgroundImage from "assets/img/brand/siscenti.jpg"
const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
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

  return (
    <>
      <div className="main-content" ref={mainContent}  style={{ 
        backgroundImage: `url(${backgroundImage})` ,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "10%",
        backgroundPosition: "50% 5%"
        }}> 
        
        <div className="header   py-8 " >
          
          
        </div>
        {/* Page content */}
        <Container className="mt-1  ">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
        
      <Footer />
      </div>
    </>
  );
};

export default Auth;
