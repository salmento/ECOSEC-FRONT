import React, { useRef, useState } from "react";


// reactstrap components
import {
    FormGroup,
    Form,
    Row,
    Col,
    Card,
    Container,
    CardHeader,
    CardBody,
    Table,
    Alert,
    Button

} from "reactstrap";

import axios from '../../api/axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Redirect, Link } from "react-router-dom";
const Itens = () => {

    const accessToken = sessionStorage.getItem('accessToken');
    const errorRef = useRef();
    const successRef = useRef();

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [itens, setitens] = useState([])

        const listitemNotPayed = async () => {

            try {
                const response = await axios.get(`item/index`,
                    {
                        headers: { 'accesstoken': `${accessToken}` },
                    }
                );
                setitens(response?.data)
                setError("")
                setSuccess("")
            } catch (err) {
                if (!err?.response) {
                    setError('Nenhum servidor responde');
                } else if (err.response?.status === 404 || 400 || 401 || 500) {
                    setError(err.response?.data?.error);
                } else {
                    setError('Falha na pesquisa pelas facturas pendentes, port favor faça refresh');
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

        <>{accessToken ?
            <Container fluid>
                <Row>
                    <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" >
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
                                <h3 className="mb-0 text-default text-uppercase">Familia de artigos e quantidades vendidas</h3>
                            </CardHeader>
                            <CardBody>
                                <Form className="pl-4 font-weight-bold text-uppercase">
                                    <Row >
                                        
                                        <Col md="4">
                                            <FormGroup>
                                                <Button onClick={listitemNotPayed} block className="mt-4 p-3 btn btn-success">Pesquisar</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <hr style={{
                                        width: "98%",
                                        marginLeft: 0,
                                        borderColor: "info"
                                    }} />

                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-danger  btn-block "
                                        table="table-to-xls"
                                        filename="Relatório"
                                        sheet="Facturas pendentes"
                                        buttonText="Download" />
                                    <hr style={{
                                        width: "98%",
                                        marginLeft: 0,
                                        borderColor: "green"
                                    }} />

                                    <Row>
                                        <Col md="12">
                                            <Table
                                                id="table-to-xls"
                                                className="align-items-center  "
                                                responsive
                                                striped
                                                bordered
                                                hover
                                            >
                                                <thead className="text-white bg-info p-1 h1">
                                                    <tr>

                                                        <th className="p-1 pl-2" scope="col">Nome</th>
                                                        <th className="p-1 pl-2" scope="col">Preço</th>
                                                        <th className="p-1 pl-2" scope="col">Q. Vendida </th>
                                                    </tr>
                                                </thead>
                                                <tbody className=" p-0 text-default">
                        {itens?.map((item, index) => (
                          <tr key={index} >
                            <td className="p-0 pl-2">{item?.name}</td>
                            <td className="p-0 pl-2">{item?.prince}</td>
                            <td className="p-0 pl-2">{item?.soldQuantity}</td>
                          </tr>
                        ))}

                      </tbody>
                                                
                                            </Table>
                                        </Col>
                                    </Row>


                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </Container> : <Redirect from="*" to="/auth/login" />

        }
        </>
    );
}


export default Itens;