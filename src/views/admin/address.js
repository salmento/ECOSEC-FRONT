import React, { useState, useRef, useEffect } from "react";


// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardHeader,
    CardBody,
    Card,
    Container,
    Table,
    Button,
    Alert
} from "reactstrap";

import axios from '../../api/axios';
import { Redirect, Link } from 'react-router-dom'

const Addresses = () => {

    const accessToken = sessionStorage.getItem('accessToken');
    const errorRef = useRef();
    const successRef = useRef();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [phoneNumber1, setphoneNumber1] = useState(0)
    const [phoneNumber2, setphoneNumber2] = useState(0)
    const [phoneNumber3, setphoneNumber3] = useState(0)
    const [nuit, setNuit] = useState(0)
    const [Addresses, setAddresses] = useState([])
    const [id, setId] = useState("")


    const [update, setUpdate] = useState(false)



    useEffect(() => {
        const address = async () => {

            try {
                const response = await axios.get(`address/index`,
                    {
                        headers: { 'accesstoken': `${accessToken}` },
                    }
                );
                setAddresses(response?.data)
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
        address()
    }, [accessToken]
    )

    const handleEdit = async (event, address) => {
        event.preventDefault();
        setName(address?.name)
        setLocation(address?.location)
        setNuit(address?.nuit)
        setphoneNumber1(address?.phoneNumber1)
        setphoneNumber2(address?.phoneNumber2)
        setphoneNumber3(address?.honeNumber3)
        setId(address?.id)
        setUpdate(true)
        setSuccess("")
        setError("")
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (name && nuit) {

            try {
                const response = await axios.put(`address/update/${id}`,
                    JSON.stringify({
                        name, nuit, location, phoneNumber1, phoneNumber2, phoneNumber3 
                    }),
                    {
                        headers: {
                            'accesstoken': `${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );
                setSuccess(response?.data?.message)
                setName("")
                setLocation("")
                setNuit(0)
                setphoneNumber1(0)
                setphoneNumber2(0)
                setphoneNumber3(0)
                setId(0)
                
                setNuit(0)
                setError("")
                setUpdate(false)
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
    setTimeout(function () {
        if(success)
          setSuccess("")
        if(error)
          setError("")  
    }, 4000);

    const handleCreate = async (event) => {
        event.preventDefault();
        if (name && nuit) {

            try {
                const response = await axios.post(`address/create`,
                    JSON.stringify({
                        name, nuit, location, phoneNumber1, phoneNumber2, phoneNumber3 
                    }),
                    {
                        headers: {
                            'accesstoken': `${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );
                setSuccess(response?.data?.message)
                setLocation("")
                setphoneNumber1(0)
                setphoneNumber2(0)
                setphoneNumber3(0)
                setId(0)
                setName("")
                setNuit(0)
                setError("")
                setUpdate(false)
                successRef?.current?.focus();
                window.location.reload()
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
    return (
        <>
            {accessToken ? (
                <Container fluid >
                    <Row>
                        <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" >
                            <Card className="card-profile shadow " >
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
                                    <h2 className="mb-0 text-default">Registar Endereço</h2>
                                </CardHeader>
                                <CardBody className="align-items-center">
                                    <Form className="font-weight-bold text-uppercase">
                                        <Row >
                                            <Col className="Col-12">
                                                <FormGroup>
                                                    <label className="text-default" htmlFor="curse"  >Nome</label>
                                                    <Input id="curse"
                                                        placeholder="Tirol"
                                                        type="text"
                                                        className="text-uppercase text-default"
                                                        required
                                                        onChange={(e) => setName(e.target.value)}
                                                        value={name}
                                                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nome do edificio a ser registado")}
                                                        onInput={e => e.target.setCustomValidity("")}
                                                    />

                                                </FormGroup>
                                            </Col>

                                            <Col className="Col-12">
                                                <FormGroup>
                                                    <label className="text-default" htmlFor="nuit"  >Nuit</label>
                                                    <Input id="nuit"
                                                        placeholder="400062121"
                                                        type="number"
                                                        className="text-uppercase text-default"
                                                        onChange={(e) => setNuit(e.target.value)}
                                                        value={nuit}
                                                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nuit da Filial a ser registado")}
                                                        onInput={e => e.target.setCustomValidity("")}
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col className="Col-12">
                                                <FormGroup>
                                                    <label className="text-default" htmlFor="location"  >Endereço</label>
                                                    <Input id="location"
                                                        placeholder="Maputo, Infulene D, Casa nr: 8000"
                                                        type="text"
                                                        className="text-uppercase text-default"
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        value={location}
                                                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nuit da Filial a ser registado")}
                                                        onInput={e => e.target.setCustomValidity("")}
                                                    />

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="Col-12">
                                                <FormGroup>
                                                    <label className="text-default" htmlFor="phoneNumber1"  >Telefone 1</label>
                                                    <Input id="phoneNumber1"
                                                        placeholder="849229754"
                                                        type="number"
                                                        className="text-uppercase text-default"
                                                        onChange={(e) => setphoneNumber1(e.target.value)}
                                                        value={phoneNumber1}
                                                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o Número do telefone da Filial a ser registado")}
                                                        onInput={e => e.target.setCustomValidity("")}
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col className="Col-12">
                                                <FormGroup>
                                                    <label className="text-default" htmlFor="phoneNumber2"  >Telefone 2</label>
                                                    <Input id="phoneNumber2"
                                                        placeholder="849229754"
                                                        type="number"
                                                        className="text-uppercase text-default"
                                                        onChange={(e) => setphoneNumber2(e.target.value)}
                                                        value={phoneNumber2}
                                                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o Número do telefone da Filial a ser registado")}
                                                        onInput={e => e.target.setCustomValidity("")}
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col className="Col-12">
                                                <FormGroup>
                                                    <label className="text-default" htmlFor="phoneNumber3"  >Telefone 3</label>
                                                    <Input id="phoneNumber3"
                                                        placeholder="849229754"
                                                        type="number"
                                                        className="text-uppercase text-default"
                                                        onChange={(e) => setphoneNumber3(e.target.value)}
                                                        value={phoneNumber3}
                                                        onInvalid={e => e.target.setCustomValidity("Por favor, preencha o Número do telefone da Filial a ser registado")}
                                                        onInput={e => e.target.setCustomValidity("")}
                                                    />

                                                </FormGroup>
                                            </Col>

                                            <Col className="Col-12">
                                                <FormGroup className="mt-1" >
                                                    {update ? <Button className="btn btn-default mt-4 btn-lg" color="default" type="submit" onClick={handleUpdate}><i className="fa fa-send" ></i> Update</Button> :
                                                        <Button className="btn btn-default mt-4 btn-lg" color="default" type="submit" onClick={handleCreate}><i className="fa fa-plus" ></i> Adicionar</Button>}
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row className="text-default mt-4 ">
                                            <Col  >
                                                <Table
                                                    className="align-items-center"
                                                    responsive
                                                    striped 
                                                    bordered
                                                    hover
                                                >
                                                    <thead className="bg-default text-white">
                                                        <tr >
                                                            <th scope="col" className="p-1 pl-2">Nome</th>
                                                            <th scope="col" className="p-1">Endereço</th>
                                                            <th scope="col" className="p-1">Nuit</th>
                                                            <th scope="col" className="p-1">Telefone 1</th>
                                                            <th scope="col" className="p-1">Telefone 2</th>
                                                            <th scope="col" className="p-1">Telefone 3</th>
                                                            <th scope="col" className="p-1 pl-2 ">Acções</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-default p-0">
                                                        {Addresses?.map((address) => (
                                                            <tr key={address?.id} value={address}>
                                                                <td className="p-0 pl-2">{address?.name}</td>
                                                                <td className="p-1">{address?.location}</td>
                                                                <td className="p-1">{address?.nuit}</td>
                                                                <td className="p-1">{address?.phoneNumber1===0 ? "": address?.phoneNumber1}</td>
                                                                <td className="p-1">{address?.phoneNumber2===0 ? "": address?.phoneNumber2}</td>
                                                                <td className="p-1">{address?.phoneNumber3===0 ? "" : address?.phoneNumber3}</td>
                                                                <td className="p-0 pl-2 "><Button value className="btn btn-default p-1" type="button" color="default" onClick={(e) => handleEdit(e, address)}><i className="fas fa-edit"></i>Editar</Button></td>
                                                            </tr>))}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>) : <Redirect from="*" to="/auth/login" />}
        </>
    );
}


export default Addresses;