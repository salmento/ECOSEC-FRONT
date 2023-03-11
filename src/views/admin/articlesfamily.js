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

const ArticlesFamily = () => {

  const accessToken = sessionStorage.getItem('accessToken');
  const errorRef = useRef();
  const successRef = useRef();
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [name, setName] = useState("")
  const [prince, setPrince] = useState(0)
  const [articles, setArticles] = useState([])
  const [id, setId] = useState("")

  const [update, setUpdate] = useState(false)

  setTimeout(function () {
    if(success)
      setSuccess("")
    if(error)
      setError("")  
}, 4000);
  useEffect(() => {
    const article = async () => {

      try {
        const response = await axios.get(`item/index`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setArticles(response?.data)
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
    article()
  }, [accessToken]
  )

  const handleEdit = async (event, article) => {
    event.preventDefault();
    setName(article?.name)
    setId(article?.id)
    setPrince(article?.prince)
    setUpdate(true)
    setSuccess("")
    setError("")
  }

  const handleStatus = async (event, id) => {
    event.preventDefault();
    if (id) {

      try {
        const response = await axios.patch(`item/activate/${id}`,{},
          {
            headers: {
              'accesstoken': `${accessToken}`,
            },
          }
        );
        setSuccess(response?.data?.message)
        setError("")
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (name && prince) {

      try {
        const response = await axios.put(`item/update/${id}`,
          JSON.stringify({
            name, prince
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
        setPrince(0)
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

  const handleCreate = async (event) => {
    event.preventDefault();
    if (name && prince) {

      try {
        const response = await axios.post(`item/create`,
          JSON.stringify({
            name, prince
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
        setPrince(0)
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
                    <Button className="m0 text-uppercase" color="danger" to="/admin/reporter" type="button" tag={Link}  >
                      <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
                <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
                  <h2 className="mb-0 text-default">Registar Tipo de Artigo</h2>
                </CardHeader>
                <CardBody className="align-items-center">
                  <Form className="font-weight-bold text-uppercase">
                    <Row >
                      <Col className="Col-12">
                        <FormGroup>
                          <label className="text-default" htmlFor="curse"  >Tipo de Artigo</label>
                          <Input id="curse"
                            placeholder="Bermuda"
                            type="text"
                            className="text-uppercase text-default"
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            onInvalid={e => e.target.setCustomValidity("Por favor, preencha o nome do item a ser registado")}
                            onInput={e => e.target.setCustomValidity("")}
                          />

                        </FormGroup>
                      </Col>

                      <Col className="Col-12">
                        <FormGroup>
                          <label className="text-default" htmlFor="prince"  >Preço</label>
                          <Input id="prince"
                            placeholder="100"
                            type="number"
                            min="0"
                            className="text-uppercase text-default"
                            onChange={(e) => setPrince(parseInt(e.target.value), 10)}
                            value={prince}
                            onInvalid={e => e.target.setCustomValidity("Por favor, preencha o preço do item a ser registado")}
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
                      <Col md="6" className="center">
                        <Table
                          className="align-items-center"
                          responsive
                          striped
                          bordered
                          hover
                        >
                          <thead className="bg-default text-white">
                            <tr >
                              <th scope="col" className="p-1 pl-2">Tipo de artigo</th>
                              <th scope="col" className="p-1 pl-2">Preço</th>
                              <th scope="col">Estado</th>
                              <th scope="col" className="p-1 pl-2">Acções</th>
                            </tr>
                          </thead>
                          <tbody className="text-default p-0">
                            {articles?.map((article) => (
                              <tr key={article?.id} value={article}>
                                <td className="p-1 pl-2">{article?.name}</td>
                                <td className="p-1 pl-2">{article?.prince}</td>
                                <td className="p-1 pl-2">{article?.active ? "Activo" : "Desactivo"}</td>
                                <td className="p-0 pl-2">
                                  <Button value className="btn btn-default p-1" type="button" color="default" onClick={(e) => handleEdit(e, article)}><i className="fas fa-edit"></i>Editar</Button>
                                  <Button value className="btn btn-default p-1" type="button" color="default" onClick={(e) => handleStatus(e, article.id)}><i className="fas fa-edit"></i>{article?.active ? "Desactivar" : "Activar"}</Button>
                                </td>
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


export default ArticlesFamily;