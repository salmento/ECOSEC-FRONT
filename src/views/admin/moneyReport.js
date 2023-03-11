import React, { useRef, useState, useEffect } from "react";


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
    Button

} from "reactstrap";

import axios from '../../api/axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
const Invoices = () => {

    const accessToken = sessionStorage.getItem('accessToken');
    const errorRef = useRef();
    const successRef = useRef();

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [initialDate, setInitialDate] = useState(moment().format("YYYY-MM-DD"))
    const [finalDate, setFinalDate] = useState(moment().format("YYYY-MM-DD"))
    const [invoices, setInvoices] = useState([])
    const [controlAddress, setControlAddress] = useState(0)
    const [addresses, setAddresses] = useState([]);
    const [addressId, setAddressId] = useState(21)
    useEffect(() => {

        const address = async () => {
    
          try {
            const response = await axios.get(`address/index`);
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
        if (controlAddress===0){
          address()
          setControlAddress(1)
        }
      },[controlAddress] 
      )

        const listinvoiceNotPayed = async () => {

            try {
                const response = await axios.get(`order/listinvoices?initialDate=${initialDate}&finalDate=${finalDate}&addressId=${addressId}`,
                    {
                        headers: { 'accesstoken': `${accessToken}` },
                    }
                );
                setInvoices(response?.data)
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
                            <Row >
                <Col md="4">
            <Button className="m0 text-uppercase"  color="danger" to="/admin/reporter" type="button" tag={Link}  >
            <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
                            <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
                                <h3 className="mb-0 text-default">Facturas Geradas</h3>
                            </CardHeader>
                            <CardBody>
                                <Form className="pl-4 font-weight-bold text-uppercase">
                                    <Row >
                                        <Col md="4">
                                            <FormGroup>
                                                <label className="text-default" htmlFor="studentNumber" >Data inicial</label>
                                                <Input id="studentNumber"
                                                    placeholder="Salmento Chitlango"
                                                    type="date"
                                                    required
                                                    value={initialDate}
                                                    onChange={(e) => setInitialDate(e.target.value)}
                                                />



                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <label className="text-default" htmlFor="studentNumber" >Data Final</label>
                                                <Input id="studentNumber"
                                                    placeholder="Salmento Chitlango"
                                                    type="date"
                                                    required
                                                    value={finalDate}
                                                    onChange={(e) => setFinalDate(e.target.value)}
                                                />



                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                            <label className="text-default" htmlFor="studentNumber" >Selecione o Endereço</label>
                                        <select id="family"
                                            className="text-default border-0 form-control border-dark font-weight-bold text-uppercase select mt-2"
                                            defaultValue={addressId}
                                            onChange={(e) => setAddressId(e.target.value)}
                                            required>
                                            {addresses?.map((address) => (
                                                <option key={address.id} value={address.id}>  {address?.name} </option>
                                            ))}
                                        </select>
                                        </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Button onClick={listinvoiceNotPayed} block className="mt-4 p-3 btn btn-success">Pesquisar</Button>
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

                                                        <th className="p-1 pl-2" scope="col">Cod. Cliente</th>
                                                        <th className="p-1  pl-2" scope="col">Nome</th>
                                                        <th className="p-1  pl-2" scope="col">Apelido/Responsável</th>
                                                        <th className="p-1  pl-2" scope="col">Contacto </th>
                                                        <th className="p-1  pl-2" scope="col">Factura</th>
                                                        <th className="p-1  pl-2" scope="col">Recibo</th>
                                                        <th className="p-1  pl-2" scope="col">Valor</th>
                                                        <th className="p-1  pl-2" scope="col">Data</th>
                                                        <th className="p-1  pl-2" scope="col">Estado</th>
                                                        <th className="p-1  pl-2" scope="col">Colaborador</th>
                                                    </tr>
                                                </thead>
                                                <tbody className=" p-0 text-default">
                        {invoices?.map((invoice, index) => (
                          <tr key={index} >
                            <td className="p-0  pl-2">{invoice?.clientId}</td>
                            <td className="p-0  pl-2">{invoice?.clientName}</td>
                            <td className="p-0  pl-2">{invoice?.clientSurname}</td>
                            <td className="p-0  pl-2">{invoice?.clientPhone}</td>
                            <td className="p-0  pl-2">{invoice?.orderRef}</td>
                            <td className="p-0  pl-2">{invoice?.receiptRef}</td>
                            <td className="p-0  pl-2">{invoice?.totalToPay}</td>
                            <td className="p-0  pl-2">{moment(invoice?.createdAt).format("L")}</td>
                            <td className="p-0  pl-2">{invoice?.paymentStatus}</td>
                            <td className="p-0  pl-2">{invoice?.vendorName} {invoice?.vendorSurname}</td>
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


export default Invoices;