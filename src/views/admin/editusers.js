import React , {useState, useEffect, useRef}from "react";


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
import roleConfig from "../../config/role"
import genderConfig from "../../config/gender"

import axios from '../../api/axios';
import {Redirect, Link } from "react-router-dom"



const Useres = () => {

  const accessToken = sessionStorage.getItem('accessToken');
  const roleControl = sessionStorage.getItem('role');


  const errorRef = useRef();
  const successRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [role, setRole] = useState(10000000)
  const [idNumber, setIdNumber] = useState("")
  const [gender, setGender] = useState(genderConfig.male)
  const [phoneNumber, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])
  const [index, setIndex] = useState(0)
  const [username, setUsername] = useState("")
  const [birthday, setBirth] = useState(new Date().toISOString().substring(0, 10))

  
  useEffect(() => {
    const users = async () => {

      try {
        const response = await axios.get(`user/index`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setUsers(response?.data)
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
    users()
  }, [accessToken]
  )

useEffect(()=>{
  const handleSelectUSer = () => {
    const user = users[index]
      setName(user?.name ? user?.name : "")
      setSurname(user?.surname ? user?.surname : "")
      setBirth(user?.birthday ? new Date(user?.birthday ).toISOString().substring(0, 10) : new Date( ).toISOString().substring(0, 10) )
      setAddress(user?.address ? user.address : "")
      setEmail(user?.email ? user.email : "")
      setGender(user?.gender ? user.gender : "")
      setPhone(user?.phoneNumber ? user.phoneNumber : "")
      setIdNumber(user?.idNumber ? user.idNumber : "")
      setRole(user?.role ? user.role : "")
      setUsername(user?.username ? user.username : "")
      
    
  }
  handleSelectUSer()
},[index, users])
 
const handleEdit = async (event) => {
  event.preventDefault()
  console.log(role)

    try {
      const response = await axios.put(`user/update/${username}`,
        JSON.stringify({
          name, surname, email, role, phoneNumber, birthday, gender, idNumber, address
        }),
        {
          headers: {
            'accesstoken': `${accessToken}`,
            'Content-Type': 'application/json'
          },
        }
      );

      setName("")
      setIdNumber("")
      setEmail("")
      setSurname("")
      setAddress("")
      setError("")
      setRole("")
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

setTimeout(function () {
  if(success)
    setSuccess("")
  if(error)
    setError("")  
}, 4000);
  return (
    <>{accessToken && roleControl === roleConfig.admin ? (
      <Container fluid className="align-items-center">
        <Row>
          <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
            {error ? <Alert color={error ? "danger" : "secondary"}>
              <strong ref={errorRef} >{error}  </strong>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <strong ref={successRef} >{success} </strong>
            </Alert> : ""}
            <Row >
                <Col md="4">
            <Button className="m0 text-uppercase"  color="danger" to="/admin/users" type="button" tag={Link}  >
            <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
              <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
                <h2 className="mb-0 text-default">Editar Utilizador</h2>
              </CardHeader>
              <CardBody>
                <Form className="   pl-4 pb-4 pt-2 pt-md-3 font-weight-bold text-uppercase">

                  <Row >
                    <Col md="6">
                      <FormGroup className="mb-2">

                        <label className="text-default form-control-label" htmlFor="user">  Selecione o utilizador:
                          <select id="user" 
                            className="text-default border-0 form-control font-weight-bold text-uppercase" 
                            defaultValue={index}
                            onChange={(e) =>setIndex(e.target.value)}
                            required>
                            {users?.map((user, index) => (
                              <option key={user?.username} value={index}> {user?.name} {user?.surname}</option>
                            ))}
                          </select>
                        </label>
                      </FormGroup>
                    </Col>
                    
                    

                  </Row>
                  <Row >
                  <Col md="4">
                    <FormGroup className="mb-2">

                      <label className="text-default form-control-label" htmlFor="role"> <strong className="text-red" >&#10043;</strong>Tipo de utilizador:
                        <select id="role"
                          className="text-default border-0 form-control font-weight-bold text-uppercase"
                          defaultValue={role}
                          onChange={(e) => setRole(e.target.value)}
                          required>
                            <option value={10000000} disabled>Selecione o tipo de utilizador </option>
                          <option value={roleConfig.operator}>operador</option>
                          <option value={roleConfig.admin}>Gestor</option>
                          <option value={roleConfig.report}>Report</option>
                        </select>
                      </label>
                    </FormGroup>
                  </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="text-default" htmlFor="name">Nome</label>
                        <Input id="name"
                          placeholder="Ernesto"
                          className="text-default text-uppercase"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="text-default" htmlFor="surname">Apelido</label>
                        <Input id="surname"
                          placeholder="Sousa"
                          className="text-default text-uppercase"
                          type="text"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row >
                  <Col md="4">
                      <FormGroup>
                        <label className="text-default" htmlFor="idNumber">Nr do B.I</label>
                        <Input id="idNumber"
                          placeholder="Informatica" type="text"
                          className="text-default text-uppercase"
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup className="mb-2">

                      <label className="text-default form-control-label" htmlFor="sex">  Sexo: </label>
                        <select id="sex"
                          className="text-default border-0 form-control font-weight-bold text-uppercase"
                          defaultValue={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required>
                          <option value={genderConfig.female}>Femenino</option>
                          <option value={genderConfig.male}>Masculino</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="text-default" htmlFor="birthday">Data de Nascimento</label>
                        <Input id="birthday"
                          placeholder="10/20/2000"
                          className="text-default text-uppercase"
                          type="date"
                          value={birthday}
                          onChange={(e) => setBirth(e.target.value)}
                        />
                      </FormGroup>
                   </Col>
                  </Row>
                  <Row >
                  <Col md="3">
                    <FormGroup>
                      <label className="text-default" htmlFor="phoneNumber"><strong className="text-red" >&#10043;</strong>Telefone</label>
                      <Input id="phoneNumber"
                        placeholder="849229754"
                        className="text-default text-uppercase"
                        type="number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phoneNumber}
                      
                      />
                    </FormGroup>
                  </Col>
                
                

                  <Col md="3">
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
                  <Col md="6">
                    <FormGroup>
                      <label className="text-default" htmlFor="address">Endereço</label>
                      <Input id="address"
                        placeholder="Infulene D, Casa nr: 8000"
                        className="text-default text-uppercase"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                  <Row>

                  
                <Button block className="my-5" size="lg" color="default" type="button"  onClick={handleEdit}>
                  Gravar
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