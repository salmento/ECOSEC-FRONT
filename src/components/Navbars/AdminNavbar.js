
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import {  Link } from "react-router-dom";


const AdminNavbar = () => {
  const auth = JSON.parse(sessionStorage.getItem("auth"))
  

  const logout = async () => {
    sessionStorage.removeItem("auth")
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search text-default" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" className="text-default" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <i className="ni ni-single-02" />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm text-default text-uppercase font-weight-bold">
                      {auth?.name}  {auth?.surname}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0 text-default">Lavandaria Ecosec!</h6>
                </DropdownItem>
                <DropdownItem className="text-default" to="/auth/resetpassword"  tag={Link} onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Trocar pin</span>
                </DropdownItem>
                <DropdownItem className="text-default" to="/auth/login"  tag={Link} onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Terminar Sessão</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
