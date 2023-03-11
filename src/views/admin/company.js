import React, {useState, useRef} from "react";


// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  CardBody,
  Button,
  Alert
} from "reactstrap";


import axios from '../../api/axios';
import { Link, Redirect } from "react-router-dom"
import clientConfig from "../../config/client"


const Useres = () => {
  const accessToken = sessionStorage.getItem('accessToken');


  const errorRef = useRef();
  const successRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const typeOfClient= clientConfig.bussines
  const [phoneNumber, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [nuit, setNuit] = useState("")

  const handleCreate = async (event) => {
    event.preventDefault()
    if (name && surname && phoneNumber ) {

      try {
        const response = await axios.post(`client/create`,
          JSON.stringify({
            name, surname, email, phoneNumber,  typeOfClient, address, nuit
          }),
          {
            headers: {
              'accesstoken': `${accessToken}`,
              'Content-Type': 'application/json'
            },
          }
        );

        setName("")
        setEmail("")
        setSurname("")
        setAddress("")
        setError("")
        setPhone("")
        setSuccess(response?.data?.message)
        successRef?.current?.focus();
      } catch (err) {
        setSuccess("")
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 400 || 401 || 404 || 500) {
          setError(err.response?.data?.error);
        } else {
          setError('O registo falhou');
        }
        errorRef?.current?.focus();
      }
    } else {
      setError(" Preencher todos os campos obrigatórios")
    }

  }
  setTimeout(function () {
    if(success)
      setSuccess("")
    if(error)
      setError("")  
}, 4000);

  return (
    <>
      { accessToken ? (<Container fluid className="align-items-center">
    <Row>
      <Col className="order-xl-1 mb-5 mt-7 mb-xl-0">
        <Card className="card-profile shadow">
        {error ? <Alert color={error ? "danger" : "secondary"}>
              <strong ref={errorRef} >{error}  </strong>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <strong ref={successRef} >{success} </strong>
            </Alert> : ""}
            <Row >
                <Col md="4">
            <Button className="m0 text-uppercase"  color="danger" to="/admin/clients" type="button" tag={Link}  >
            <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
          <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
            <h2 className="mb-0 text-default">Registar Cliente Empresarial</h2>

            <Button block className="my-5 text-uppercase" size="lg" color="info" to="/admin/editcompany" type="button" tag={Link}  >
              <i className="fas fa-building pr-1 text-uppercase"></i>Editar Cliente</Button>
          </CardHeader>
          <CardBody>
            <Form className="   pl-4 pb-4 pt-2 pt-md-3 font-weight-bold text-uppercase">

              <Row >
                <Col md="4">
                  <FormGroup>
                    <label className="text-default" htmlFor="name"><strong className="text-red" >&#10043;</strong>Nome</label>
                    <Input id="name"
                      placeholder="Alvaro"
                      className="text-default text-uppercase"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nome do cliente")}
                      onInput={e => e.target.setCustomValidity("")}
                      required
                      
                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <label className="text-default" htmlFor="surname"><strong className="text-red" >&#10043;</strong>Nome do Responsável</label>
                    <Input id="surname"
                      placeholder="Oliveira" type="text"
                      className="text-default text-uppercase"
                      required
                      onChange={(e) => setSurname(e.target.value)}
                      value={surname}
                      onInvalid={e => e.target.setCustomValidity("Por favor, preencha o apelido do cliente")}
                      onInput={e => e.target.setCustomValidity("")}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label className="text-default" htmlFor="phoneNumber"><strong className="text-red" >&#10043;</strong>Telefone</label>
                    <Input id="phoneNumber"
                      placeholder="849229754"
                      className="text-default text-uppercase"
                      type="number"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phoneNumber}
                      onInvalid={e => e.target.setCustomValidity("Por favor, preencha o contacto do cliente")}
                      onInput={e => e.target.setCustomValidity("")}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row >
              <Col md="4">
                  <FormGroup>
                    <label className="text-default" htmlFor="Nuit">Nuit</label>
                    <Input id="Nuit"
                      placeholder="100100100F"
                      className="text-default text-uppercase"
                      type="Nuit"
                      onChange={(e) => setNuit(e.target.value)}
                      value={nuit}
                      onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nuit do cliente")}
                      onInput={e => e.target.setCustomValidity("")}
                      required
                    />
                  </FormGroup>
                </Col>
              <Col md="4">
                  <FormGroup>
                    <label className="text-default" htmlFor="phoneNumber">E-mail</label>
                    <Input id="email"
                      placeholder="ernesto.sousa@gmail.com"
                      className="text-default text-uppercase"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </FormGroup>
                </Col>
                
                <Col md="4">
                <FormGroup>
                    <label className="text-default" htmlFor="address">Endereço</label>
                    <Input id="address" 
                      placeholder="Maputo, Infulene D, Casa nr: 8000"
                      className="text-default text-uppercase"
                      type="text"
                      value={address}
                      onChange={(e)=> setAddress(e.target.value)}
                    />
                  </FormGroup>
                </Col>
               
              </Row>

              <Row>
                <Button block className="my-5" size="lg" color="default" type="button" onClick={handleCreate}>
                  Registar
                </Button>

              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>

    </Row>
  </Container>): <Redirect from="*" to="/auth/login" />

    }
    </>

  );
}


export default Useres;