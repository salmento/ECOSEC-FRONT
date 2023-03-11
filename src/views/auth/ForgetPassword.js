

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from "reactstrap";

import {Link} from "react-router-dom"
//import axios from '../../api/axios';



const ForgetPassword = () => {
  
  
  return (
    <>
      <Col lg="6" md="6" xl="6">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-5 py-2">

            
            <div className="text-center text-default mb-4 h2">
              <small> Insira, seu username </small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="username"
                    type="text"
                    id="username"
                    className="text-default text-uppercase"
                    autoComplete="new-username"
                    required
                  />
                </InputGroup>
              </FormGroup>

              <div>
                <Button block className="my-5" size="lg" color="default" type="button" tag={Link} to="/auth/resetpassword">
                  Recuperar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-center display-4">
            <a
              className=" text-default"
              href="/auth/login"
            >
              <small >Click aqui, para fazer login</small>
            </a>
          </Col>

        </Row>
      </Col>

    </>
  );
};

export default ForgetPassword;
