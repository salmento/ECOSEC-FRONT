import React, { useState, useRef, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

// reactstrap components
import {
  Alert,
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
  Button

} from "reactstrap";

import axios from '../../api/axios';
import moment from 'moment';

const Invoices = () => {

  const accessToken = sessionStorage.getItem('accessToken');
  const errorRef = useRef();
  const successRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(0)
  const [invoices, setInvoices] = useState([])
  const [initialDate, setInitialDate] = useState(moment().format("YYYY-MM-DD"))
  const [finalDate, setFinalDate] = useState(moment().format("YYYY-MM-DD"))



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

  setTimeout(function () {
    if (success)
      setSuccess("")
    if (error)
      setError("")
  }, 4000);

    const bankstatement= async () => {

      try {
        if (clientId) {
          const response = await axios.get(`receipt/bankstatement?clientId=${clientId}&initialDate=${initialDate}&finalDate=${finalDate}`,
            {
              headers: { 'accesstoken': `${accessToken}` },
            }
          );
          setInvoices(response?.data)

          setError("")
          setSuccess("")
        }


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


  return (

    <>{accessToken ? <Container fluid>
      <Row>
        <Col className="order-xl-1 mb-5 mt-7 mb-xl-0 " xl="12" >
          <Card className="card-profile shadow">
            {error ? <Alert color={error ? "danger" : "secondary"}>
              <strong ref={errorRef} >{error}  </strong>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <strong ref={successRef} >{success} </strong>
            </Alert> : ""}
            <Row>
              <Col>
                <Button className="m0 text-uppercase" color="danger" to="/operator/clients" type="button" tag={Link}  >
                  <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>

            <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
              <h3 className="mb-0 text-default">Gerar Extracto do Cliente</h3>
            </CardHeader>
            <CardBody>
              <Form className="pl-4 font-weight-bold text-uppercase">

                <Row >
                  <Col md="4">
                    <FormGroup>
                      <label className="text-default" htmlFor="studentNumber" >Selecione Cliente</label>
                      <Input id="studentNumber"
                        placeholder="Salmento Chitlango"
                        type="text"
                        autoComplete="new-client"
                        required
                        onChange={(e) => setClientId(e.target.value)}
                        list="clients"
                      />
                      <datalist id="clients" className="bg-default">
                        {clients?.map((client, index) => (
                          <option key={index} value={client?.id}> {client?.clientId} - {client?.name} {client?.surname}</option>
                        ))}
                      </datalist>



                    </FormGroup>
                  </Col>
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
                                                <Button onClick={bankstatement} block className="mt-4 p-3 btn btn-success">Pesquisar</Button>
                                            </FormGroup>
                                        </Col>

                </Row>
                <hr style={{
                  width: "98%",
                  marginLeft: 0,
                  borderColor: "info"
                }} />

                <Row>
                  <Col md="12">
                    <Table
                      className="align-items-center bg-info "
                      responsive
                      bordered
                    >
                      <thead className="text-white p-1 h1">
                        <tr>
                          <th className="p-1" scope="col">Nr. Recibo</th>
                          <th className="p-1" scope="col">Valor Pago</th>
                          <th className="p-1" scope="col">Data de Pagamento</th>
                          <th className="p-1" scope="col">Forma de pagamento</th>
                          <th className="p-1" scope="col">Esta do pagamento</th>
                          <th className="p-1" scope="col">Nr. Factura</th>
                          <th className="p-1" scope="col">Valor da Factura</th>
                          <th className="p-1" scope="col">Data de Entrada</th>
                          <th className="p-1" scope="col">Balanco</th>
                          <th th className="p-1" scope="col">Codigo do Cliente</th>
                          <th className="p-1" scope="col">Nome do Cliente</th>
                          <th className="p-1" scope="col">Nome do Vendedor</th>
                        </tr>
                      </thead>
                      <tbody className="text-white p-1">

                        {invoices?.map((invoice, index) => (
                          <tr key={index} value={invoice} >
                            <td className="pl-1 p-0">{invoice?.receiptRef}</td>
                            <td className="pl-1 p-0">{invoice?.payedMoney}</td>
                            <td className="pl-1 p-0">{invoice?.paymentDate ? new Date(invoice?.paymentDate).toISOString(0, 10).substring(0, 10) : ""}</td>
                            <th className="pl-1 p-0">{invoice?.paymentMethod}</th>
                            <th className="pl-1 p-0">{invoice?.paymentStatus}</th>
                            <td className="pl-1 p-0">{invoice?.orderRef}</td>
                            <td className="pl-1 p-0">{invoice?.totalToPay}</td>
                            <td className="pl-1 p-0">{invoice?.entryDate ? new Date(invoice?.entryDate).toISOString(0, 10).substring(0, 10) : ""}</td>
                            <th className="pl-1 p-0">{invoice?.paymentMissing }</th>
                            <td className="pl-1 p-0">{invoice?.clientId}</td>
                            <td className="pl-1 p-0">{invoice?.clientName} {invoice?.clientSurname}</td>
                            <td className="pl-1 p-0">{invoice?.vendorName} {invoice?.vendorSurname}</td>

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

    </Container> : <Redirect from="*" to="/auth/login" />}

    </>
  );
}


export default Invoices;