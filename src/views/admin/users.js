import React, { useState, useEffect, useRef } from "react";


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
  Table,
  Alert,
  Button,
  UncontrolledTooltip
} from "reactstrap";

import roleConfig from "../../config/role"
import genderConfig from "../../config/gender"
import axios from '../../api/axios';
import { Link, Redirect } from "react-router-dom"



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
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("Password1")
  const [idNumber, setIdNumber] = useState("")
  const [gender, setGender] = useState(genderConfig.male)
  const [birthday, setBirth] = useState()
  const [phoneNumber, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])



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

  const handlePassword = async (event, id) => {
    event.preventDefault();
    if (id) {

      try {
        const response = await axios.patch(`auth/resetpassworddefault/${id}`,
          {},
          {
            headers: {
              'accesstoken': `${accessToken}`,
              'Content-Type': 'application/json'
            },
          }
        );
        setSuccess(response?.data?.message)
        setError("")
        window.location.reload()
        successRef?.current?.focus();
      } catch (err) {
        setSuccess("")
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 400 || 401 || 404 || 500) {
          const error = err.response?.data?.error
          setError(error);
        } else {
          setError('O registo falhou');
        }
        errorRef?.current?.focus();
      }
    } else {
      setError(" Preencher todos os campos obrigatórios")
    }

  }


  const handleStatus = async (event, id) => {
    event.preventDefault();
    if (id) {

      try {
        const response = await axios.patch(`user/activate/${id}`, {},
          {
            headers: {
              'accesstoken': `${accessToken}`,
            },
          }
        );
        setSuccess(response?.data?.message)
        setError("")
        window.location.reload()
        successRef?.current?.focus();
      } catch (err) {
        setSuccess("")
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 400 || 401 || 404 || 500) {
          const error = err.response?.data?.error
          setError(error);
        } else {
          setError('O registo falhou');
        }
        errorRef?.current?.focus();
      }
    } else {
      setError(" Preencher todos os campos obrigatórios")
    }

  }
  const handleCreate = async (event) => {
    event.preventDefault()
    if (name && surname && phoneNumber && role && gender && username && password) {

      try {
        const response = await axios.post(`user/create`,
          JSON.stringify({
            name, surname, email, role, username, phoneNumber, password, birthday, gender, idNumber, address
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
        setUsername("")
        setAddress("")
        setError("")
        setRole("")
        setPhone("")
        setSuccess(response?.data?.message)
        setSuccess(response?.data?.message)
        window.location.reload()
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
    <>{accessToken && roleControl === roleConfig.admin ? (<Container fluid className="align-items-center">
      <Row>
        <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" xl="7">
          <Card className="card-profile shadow">
            {error ? <Alert color={error ? "danger" : "secondary"}>
              <strong ref={errorRef} >{error}  </strong>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <strong ref={successRef} >{success} </strong>
            </Alert> : ""}
            <Row>
                                <Col>
                            <Button className="m0 text-uppercase"  color="danger" to="/admin/reporter" type="button" tag={Link}  >
            <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
            <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
              <h2 className="mb-0 text-default">Registar utilizadores</h2>
            </CardHeader>
            <CardBody>
              <Form className="   pl-4 pb-4 pt-2 pt-md-3 font-weight-bold text-uppercase">

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
                          <option value={roleConfig.report}>Rélatorios</option>
                        </select>
                      </label>
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="text-default" htmlFor="username"><strong className="text-red" >&#10043;</strong>Username</label>
                      <Input id="username"
                        placeholder="Ernesto.Sousa"
                        className="text-default text-uppercase"
                        type="text"
                        onChange={(e) =>{ setUsername(e.target.value); setError(""); setSuccess("")}}
                        value={username}
                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nome do Colaborador")}
                        onInput={e => e.target.setCustomValidity("")}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="text-default" htmlFor="password"><strong className="text-red" >&#10043;</strong>password</label>
                      <Input id="password"
                        placeholder="Password*1" type="text"
                        className="text-default text-uppercase"
                        onChange={(e) =>{ setPassword(e.target.value); setError(""); setSuccess("")}}
                        value={password}
                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o password do Colaborador")}
                        onInput={e => e.target.setCustomValidity("")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row >
                  <Col md="4">
                    <FormGroup>
                      <label className="text-default" htmlFor="name"><strong className="text-red" >&#10043;</strong>Nome</label>
                      <Input id="name"
                        placeholder="Ernesto"
                        className="text-default text-uppercase"
                        type="text"
                        onChange={(e) => {setName(e.target.value); setError(""); setSuccess("")}}
                        value={name}
                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nome do Colaborador")}
                        onInput={e => e.target.setCustomValidity("")}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="text-default" htmlFor="surname"><strong className="text-red" >&#10043;</strong>Apelido</label>
                      <Input id="surname"
                        placeholder="Sousa"
                        className="text-default text-uppercase"
                        type="text"
                        required
                        onChange={(e) => {setSurname(e.target.value); setError(""); setSuccess("")}}
                        value={surname}
                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o apelido do Colaborador")}
                        onInput={e => e.target.setCustomValidity("")}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="text-default" htmlFor="idNumber">Nr do B.I</label>
                      <Input id="idNumber"
                        placeholder="100102011190F" type="text"
                        className="text-default text-uppercase"
                        onChange={(e) =>{ setIdNumber(e.target.value); setError(""); setSuccess("")}}
                        value={idNumber}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row >
                  <Col md="4">
                    <FormGroup className="mb-2">

                      <label className="text-default form-control-label" htmlFor="sex">  Sexo:
                        <select id="sex"
                          className="text-default border-0 form-control font-weight-bold text-uppercase"
                          defaultValue={gender}
                          onChange={(e) => {setGender(e.target.value); setError(""); setSuccess("")}}
                          required>
                          <option value={genderConfig.female}>Femenino</option>
                          <option value={genderConfig.male}>Masculino</option>
                        </select>
                      </label>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="text-default" htmlFor="birthday">Data de Nascimento</label>
                      <Input id="birthday"
                        placeholder="10/20/2000"
                        className="text-default text-uppercase"
                        type="date"
                        defaultValue={birthday}
                        onChange={(e) =>{ setBirth(e.target.value); setError(""); setSuccess("")}}
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
                        onChange={(e) =>{ setPhone(e.target.value); setError(""); setSuccess("")}}
                        value={phoneNumber}
                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o número celular do Colaborador")}
                        onInput={e => e.target.setCustomValidity("")}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row >

                  <Col md="6">
                    <FormGroup>
                      <label className="text-default" htmlFor="phoneNumber">E-mail</label>
                      <Input id="email"
                        placeholder="ernesto.sousa@gmail.com"
                        className="text-default text-uppercase"
                        type="email"
                        onChange={(e) =>{ setEmail(e.target.value); setError(""); setSuccess("")}}
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
                        onChange={(e) =>{ setAddress(e.target.value); setError(""); setSuccess("")}}
                        value={address}
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
        <Col className="order-xl-1 text-default" xl="5">
          <Card className="bg-secondary mt-7 shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h2 className="mb-4 text-default">Lista dos utilizadores da plataforma <strong>ECOSEC</strong></h2>
                </Col>
                <FormGroup>
                  <Button className="btn btn-info " size="lg" to="/admin/editusers" type="button" tag={Link} ><i className="ni ni-send"></i> Editar Useres</Button>
                </FormGroup>
              </Row>
            </CardHeader>
            <CardBody className="mt-0">
              <Row>
                <Col>
                  <Table
                    className="align-items-center bg-default "
                    responsive
                  >
                    <thead className="text-white p-1 h1">
                      <tr>
                        <th className="p-1" scope="col">Nome</th>
                        <th className="p-1" scope="col">Apelido</th>
                        <th className="p-1" scope="col">Função</th>
                        <th className="p-1" scope="col">Nr. Telefone</th>
                        <th className="p-1" scope="col">Estado</th>
                        <th className="p-1" scope="col">Acção</th>
                      </tr>
                    </thead>
                    <tbody className="text-white text-uppercase p-1">

                      {users?.map((user) => (
                        <tr key={user?.id} value={user}>
                          <td className="p-0">{user?.name}</td>
                          <td className="p-1">{user?.surname}</td>
                          <td className="p-1">{user?.role}</td>
                          <td className="p-1">{user?.phoneNumber}</td>                     
                          <td className="p-1">{user?.active ? "activo" : "Desactivado"}</td>
                          <td className="p-0 ">
                            <UncontrolledTooltip
                              delay={0}
                              placement="left"
                              target="tooltip611234743"
                            >
                              Redefinir o password do utilizador para Password1
                            </UncontrolledTooltip>
                            <Button value className="btn btn-white p-1" type="button" onClick={(e) => handlePassword(e, user.id)} id="tooltip611234743" ><i className="fas fa-edit"></i>Red. Senha</Button>
                            <Button value className="btn btn-white p-1" type="button" onClick={(e) => handleStatus(e, user.id)} ><i className="fas fa-edit"></i>{user?.active ? "Desactivar" : "activar"}</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container>) :
      <Redirect from="*" to="/auth/login" />
    }

    </>

  );
}


export default Useres;