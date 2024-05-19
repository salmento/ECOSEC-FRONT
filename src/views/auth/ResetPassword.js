
import React, {useState, useRef, useEffect } from 'react';
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
    Alert
} from "reactstrap";
import axios from '../../api/axios';
import { Redirect, } from "react-router-dom";


const ResetPassword = (props) => {
    const accessToken = sessionStorage.getItem('accessToken');
    const errorRef = useRef();
    const successRef = useRef();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [password, setPassword] = useState('');
    const [PasswordConfirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        setError('');
      }, [password, PasswordConfirm])
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    if (password===PasswordConfirm){
        try {
            const response = await axios.patch("/auth/resetPassword",
              JSON.stringify({  password }),
              {
                  headers: {
                    'accesstoken': `${accessToken}`,
                    'Content-Type': 'application/json'
                  },
                }
            );
            setPassword('')
            setSuccess(response?.data?.message)
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
    } else {
        setError("O password e o password de confirmação deve ser iguais")
    }
        
      }
    
      setTimeout(function () {
        if(success)
          setSuccess("")
        if(error)
          setError("")  
    }, 4000);

    return (
        <> { accessToken ? (
            <Col lg="6" md="6" xl="6">
                <Card className="bg-secondary shadow border-0 text-uppercase">
                     {error ? <Alert color={error ? "danger" : "secondary"}>
              <strong ref={errorRef} >{error}  </strong>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <strong ref={successRef} >{success} </strong>
            </Alert> : ""}
                    <CardBody className="px-5 py-2 h2 mt-4">
                        
                        <div className="text-center text-default  mb-5">
                            <small> Definir novo password</small>
                        </div>
                        <Form role="form">
                            
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
                                        value={password}
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
                                        placeholder="Confirmar password"
                                        type="password"
                                        className="text-default"
                                        id="passwordMatch"
                                        required
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        value={PasswordConfirm}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div>
                                <Button block className="my-2" size="lg" color="default" type="button"  onClick={handleSubmit} >
                                    Recuperar
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col className="text-center text-uppercase h1">
                        <a
                            className=" text-default"
                            href="/auth/login"
                        >
                            <small >Click aqui, para fazer login</small>
                        </a>
                    </Col>

                </Row>
            </Col> ) : <Redirect from="*" to="/auth/login" />}
        </>
    );
};

export default ResetPassword;
