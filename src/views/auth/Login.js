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
  Alert
} from "reactstrap";

import { Redirect, } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';

import roleConfig from "../../config/role"
import axios from '../../api/axios';


const Login = () => {
  const errorRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [index, setIndex] = useState(0)
  const [controlAddress, setControlAddress] = useState(0)
  const  [isAddressAvailable, setIsAddressAvailable] = useState(false)

  useEffect(() => {
    const handleSelectaddress = () => {
      const address = addresses[index]
      sessionStorage.setItem("address", JSON.stringify(address))
      
    }

    handleSelectaddress()
  }, [index, addresses])


  useEffect(() => {
    setError('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const response = await axios.post("/auth/signin",
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      const role = response?.data?.user?.role;
      setRole(role)
      sessionStorage.setItem("role", role)
      sessionStorage.setItem("auth", JSON.stringify(user))
      sessionStorage.setItem("accessToken", accessToken)
      setUsername('');
      setPassword('');
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setError('Nenhum servidor responde');
      } else if (err.response?.status === 400 || 401 || 4044 | 500) {
        setError(err.response?.data?.error);
      } else {
        setError('Login Falhou');
      }
      errorRef?.current?.focus();
    }
  }

  useEffect(() => {

    const address = async () => {

      try {
        const response = await axios.get(`address/index`);
        setAddresses(response?.data)
        setIsAddressAvailable(true)
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
    if (controlAddress===0){
      address()
      setControlAddress(1)
    }
  },[controlAddress] 
  )
  setTimeout(function () {
    if(success)
      setSuccess("")
    if(error)
      setError("")  
}, 4000);

const handleOnKeyDown = (event) => {
  if(event.key==='Enter')
    handleSubmit()
    
}

  return (
    <>{success ? (
      role === roleConfig.admin ?
        <Redirect from="*" to="/admin/reporter" />
        :  role === roleConfig.operator ?
            <Redirect to="/operator/clients" /> 
            :
            <Redirect to="/report/report" /> 
    ) : (<Col lg="6" md="6" xl="6">
      <Card className="bg-secondary shadow border-0 text-default text-uppercase">
        {error ? <Alert color={error ? "danger" : "secondary"}>
          <strong ref={errorRef} >{error}  </strong>
        </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
          <strong  >{success} </strong>
        </Alert> : ""}
        <CardBody className="p-4">
          <div className="text-center mb-2" >
            <small> Faça o Login, para aceder a Plataforma </small>
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
                  placeholder="Username"
                  type="username"
                  id="username"
                  autoComplete="new-username"
                  className="text-default text-uppercase"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="password"
                  type="password"
                  id="password"
                  required
                  className="text-default text-uppercase"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleOnKeyDown}
                  value={password}
                />
              </InputGroup>
              <select id="family"
                  className="text-default border-0 form-control border-dark font-weight-bold text-uppercase select mt-2"
                  defaultValue={index}
                  onChange={(e) => setIndex(e.target.value)}
                  required>
                  {addresses?.map((address, index) => (
                    <option key={index} value={index}>  {address?.name} </option>
                  ))}
                </select>
            </FormGroup>
  
            <div>
              <Button block className="my-2" size="lg" color="info" type="button" onClick={handleSubmit}  disabled= {isAddressAvailable ? false : true}>
                Iniciar
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      
    </Col>)

    }

    </>
  );
};

export default Login;
