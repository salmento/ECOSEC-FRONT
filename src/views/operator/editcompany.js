import React , {useState, useEffect, useRef} from "react";


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
import { Redirect, Link } from "react-router-dom";;


const Singular = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const errorRef = useRef();
  const successRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [clients, setClients] = useState([])
  const [index, setIndex] = useState(0)
  const [id, setid] = useState("")
  const [nuit, setNuit] = useState("")

  useEffect(()=>{
    const handleSelectClient = () => {
      const client = clients[index]
        setName(client?.name ? client?.name : "")
        setSurname(client?.surname ? client?.surname : "")
        setAddress(client?.address ? client.address : "")
        setEmail(client?.email ? client.email : "")
        setPhone(client?.phoneNumber ? client.phoneNumber : "")
        setid(client?.id ? client.id: "")
        setNuit(client?.nuit? client.nuit: "") 
    }

    handleSelectClient()
  },[index, clients])
  useEffect(() => {
    const client = async () => {

      try {
        const response = await axios.get(`client/index`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setClients(response?.data)
        setError("")
        setSuccess("")
      } catch (err) {
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 404 || 400 || 401 || 500) {
          setError(err.response?.data?.error);
        } else {
          setError('Falha na pesquisa pelos utilizadores, por favor tente novamente');
        }
        errorRef?.current?.focus();
      }
    }
    client()
  }, [accessToken, errorRef]
  )
  const handleUpdate = async (event) => {
    event.preventDefault()
  
      try {
        const response = await axios.put(`client/update/${id}`,
          JSON.stringify({
            name, surname, email, phoneNumber, address
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
   
  
  }
  return (
    <>{accessToken ? (<Container fluid className="align-items-center">
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
            <Button className="m0 text-uppercase"  color="danger" to="/operator/company" type="button" tag={Link}  >
            <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
          <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
            <h2 className="mb-0 text-default">Editar Cliente </h2>
          </CardHeader>
          <CardBody>
            <Form className="   pl-4 pb-4 pt-2 pt-md-3 font-weight-bold text-uppercase">
              <Row>
              <Col md="6">
                  <FormGroup className="mb-2">

                  <label className="text-default form-control-label" htmlFor="client">  Selecione o utilizador:
                      <select id="client" 
                        className="text-default border-0 form-control font-weight-bold text-uppercase" 
                        defaultValue={index}
                        onChange={(e) =>setIndex(e.target.value)}
                        required>
                        {clients?.map((client, index) => (
                          <option key={client?.id} value={index}> {client?.id} - {client?.name} {client?.surname}</option>
                        ))}
                      </select>
                    </label>
                  </FormGroup>
                </Col>
              </Row>
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
                <label className="text-default" htmlFor="surname"><strong className="text-red" >&#10043;</strong>Apelido</label>
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
                <label className="text-default" htmlFor="nuit">Nuit</label>
                <Input id="nuit"
                  placeholder="1001000100"
                  className="text-default text-uppercase"
                  type="nuit"
                  onChange={(e) => setNuit(e.target.value)}
                  value={nuit}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label className="text-default" htmlFor="email">E-mail</label>
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
                <Button block className="my-5" size="lg" color="default" type="button" onClick={handleUpdate} >
                  Gravar
                </Button>

              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>

    </Row>
  </Container>): <Redirect from="*" to="/auth/login" /> }
      
    </>

  );
}


export default Singular;