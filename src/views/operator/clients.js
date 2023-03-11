import React from "react";


// reactstrap components
import {
  Form,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";


//import axios from '../../api/axios';
import { Link } from "react-router-dom"



const Clients = () => {
  setTimeout(function () {
    window.location.reload()
}, 300000);
  return (
    <>
      <Container fluid className="align-items-center text-uppercase">
        <Row>
          <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" >
            <Card className="card-profile shadow">
              <CardHeader className="text-center border-0 pt-2 pt-md-4   pb-0 pb-md-0">
                <h2 className="mb-4 text-default">Selecione o tipo de cliente</h2>



              </CardHeader>
              <CardBody>
                <Form className="   pl-4 pb-4 pt-2 pt-md-3 font-weight-bold text-uppercase">

                  <Row>
                    <Button className="btn btn-info text-uppercase " block size="lg" to="/operator/singular" type="button" tag={Link} >
                        <i className="fas fa-male "></i> Cliente Singular</Button>


                    <Button block className="my-5 text-uppercase" size="lg" color="default" to="/operator/company" type="button" tag={Link}  >
                        <i className="fas fa-building pr-1 text-uppercase"></i>Cliente Empresarial</Button>

                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>



        </Row>
      </Container>
    </>

  );
}


export default Clients;