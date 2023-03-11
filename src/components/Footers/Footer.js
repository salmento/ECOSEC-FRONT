/*eslint-disable*/
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";


const Footer = () => {
  return (
    <footer>
      <Row className="py-5 align-items-center justify-content-xl-between">

        <Col xl="12">
          <div className="copyright text-center  text-xl-right text-muted ">

             SISCENTI POR ANOSERVICE © {new Date().getFullYear()}
          </div>
        </Col>

      </Row>
    </footer>
  );
};

export default Footer;
