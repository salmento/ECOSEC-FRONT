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
  Button,
  UncontrolledTooltip

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
  const [remainToReceive, setRemainToReceive] = useState(0)
  const [totalPayed, setTotalPayed] = useState(0)
  const [total, setTotal] = useState(0)

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
          balanceCalculator(response?.data)

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

    const handleOrderRef = async ( orderRef) => {
    if (orderRef) {
      sessionStorage.setItem("orderRef", orderRef)
    }
    }
  

    const balanceCalculator = (invoices) => {
      let  totalToPay = 0
      let  totalPayed = 0
      let total= 0
    
      invoices?.forEach((invoiceFirst)=>{
        totalPayed += invoiceFirst.payedMoney
        const invoiceNumber = invoiceFirst.orderRef
        let paymentMissing=invoiceFirst.paymentMissing
        invoices?.forEach((invoice) => {
          if(paymentMissing > invoice.paymentMissing && invoiceNumber===invoice.orderRef) 
           paymentMissing = invoice.paymentMissing
        })
        totalToPay += paymentMissing
        total+=invoiceFirst.totalToPay

      })
      setTotalPayed(totalPayed)
      setRemainToReceive(totalToPay)
      setTotal(total)
      
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
                <Button className="m0 text-uppercase" color="danger" to="/admin/reporter" type="button" tag={Link}  >
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
                      className="align-items-center  "
                      responsive
                      bordered
                    >
                      <thead className="text-info p-1 h1">
                        <tr>
                          <th className="p-1" scope="col">Nr. Factura</th>
                          <th className="p-1" scope="col">Valor da Factura</th>
                          <th className="p-1" scope="col">Valor Pago</th>
                          <th className="p-1" scope="col">Valor Por Pagar</th>
                          <th className="p-1" scope="col">Estado do pagamento</th>
                          <th className="p-1" scope="col">Data de Entrada</th>
                          <th className="p-1" scope="col">Balanco</th>
                          <th th className="p-1" scope="col">Codigo do Cliente</th>
                          <th className="p-1" scope="col">Nome do Cliente</th>
                          <th className="p-1" scope="col">Nome do Vendedor</th>
                          <th className="p-1" scope="col">Detalhes da Factura</th>
                        </tr>
                      </thead>
                      <tbody className="text-info p-1">
                        {invoices?.map((invoice, index) => (
                          <tr key={index} value={invoice} >
                            <td className="pl-1 p-0">{invoice?.orderRef}</td>
                            <td className="pl-1 p-0">{invoice?.totalToPay.toLocaleString()}</td>
                            <td className="pl-1 p-0">{invoice?.payedMoney.toLocaleString()}</td>
                            <td className="pl-1 p-0">{invoice?.paymentMissing.toLocaleString()
                            }</td>
                            <td className="pl-1 p-0">{invoice?.paymentStatus}</td>
                            <td className="pl-1 p-0">{invoice?.entryDate ? new Date(invoice?.entryDate).toISOString(0, 10).substring(0, 10) : ""}</td>
                            <td className={invoice?.paymentMissing===0 ? "pl-1 p-0 text-success" : invoice?.paymentMissing<=1000 ?   "pl-1 p-0 text-warning" :  "pl-1 p-0 text-danger"} >{invoice?.paymentMissing.toLocaleString() }</td>
                            <td className="pl-1 p-0">{invoice?.clientId}</td>
                            <td className="pl-1 p-0">{invoice?.clientName} {invoice?.clientSurname}</td>
                            <td className="pl-1 p-0">{invoice?.vendorName} {invoice?.vendorSurname}</td>
                            <td className="p-0 ">
                            <UncontrolledTooltip
                              delay={0}
                              placement="left"
                              target="tooltip611234743"
                            >
                              Clica em "Ver mais" para verificar o historico da factura
                            </UncontrolledTooltip>
                            <Link value className="btn btn-white p-1"  id="tooltip611234743"   to="/admin/orderhistory"  onClick={(e) => handleOrderRef( invoice.orderRef)} ><i className="fas fa-edit" ></i>Ver mais</Link>
                            </td>
                          </tr>))}
                          
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row >
                <Col md="4">
                    Total Facturado: {total.toLocaleString()}
                  </Col>
                  <Col md="4">
                    Total Recebido: {totalPayed.toLocaleString()}
                  </Col>
                  <Col md="4">
                     Total Por Pagar: {remainToReceive.toLocaleString()}
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