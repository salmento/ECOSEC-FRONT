import React, { useState, useRef, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

// reactstrap components
import {
  Alert,
  Form,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  CardBody,
  Table,
  Button,
} from "reactstrap";

import axios from '../../api/axios';

const Invoices = () => {

  const accessToken = sessionStorage.getItem('accessToken');
  const orderRef = sessionStorage.getItem('orderRef');
  const errorRef = useRef();
  const successRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [invoices, setInvoices] = useState([])
  const [remainToReceive, setRemainToReceive] = useState(0)
  const [totalPayed, setTotalPayed] = useState(0)
  const [totalToPay, setTotalToPay] = useState()

  useEffect(() => {
   
    const orderHistory= async () => {

      try {
        if (orderRef) {
          const response = await axios.get(`receipt/orderhistory?orderRef=${orderRef}`,
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
    orderHistory()
  }, [accessToken, errorRef, orderRef]
  )


  setTimeout(function () {
    if (success)
      setSuccess("")
    if (error)
      setError("")
  }, 4000);

    

    const balanceCalculator = (invoices) => {
      let  totalToPay = 0
      let  totalPayed = 0
    
      invoices?.forEach((invoiceFirst)=>{
        totalPayed += invoiceFirst.payedMoney
        const invoiceNumber = invoiceFirst.orderRef
        let paymentMissing=invoiceFirst.paymentMissing
        invoices?.forEach((invoice) => {
          if(paymentMissing > invoice.paymentMissing && invoiceNumber===invoice.orderRef) 
           paymentMissing = invoice.paymentMissing
          console.log(paymentMissing)
        })
        totalToPay += paymentMissing


      })
      setTotalPayed(totalPayed)
      setRemainToReceive( totalToPay)
      setTotalToPay(invoices[0].totalToPay)
      
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
                <Button className="m0 text-uppercase" color="danger" to="/admin/bankStatement" type="button" tag={Link}  >
                  <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>

            <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
              <h3 className="mb-0 text-default">HistoriCo de Pagamento</h3>
            </CardHeader>
            <CardBody>
              <Form className="pl-4 font-weight-bold text-uppercase">

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
                          <th className="p-1" scope="col">Nr. Recibo</th>
                          <th className="p-1" scope="col">Valor Pago</th>
                          <th className="p-1" scope="col">Valor Por Pagar</th>
                          <th className="p-1" scope="col">Estado do pagamento</th>
                          <th className="p-1" scope="col">Metodo de Pagamento</th>
                          <th className="p-1" scope="col">Carteria Movel/Banco</th>
                          <th className="p-1" scope="col">Data de Pagamento</th>
                          <th className="p-1" scope="col">Balanco</th>
                          <th th className="p-1" scope="col">Codigo do Cliente</th>
                          <th className="p-1" scope="col">Nome do Cliente</th>
                          <th className="p-1" scope="col">Nome do Vendedor</th>
                        </tr>
                      </thead>
                      <tbody className="text-info p-1">
                        {invoices?.map((invoice, index) => (
                          <tr key={index} value={invoice} >
                            <td className="pl-1 p-0">{invoice?.orderRef}</td>
                            <td className="pl-1 p-0">{invoice?.totalToPay.toLocaleString()}</td>
                            <td className="pl-1 p-0">{invoice?.receiptRef}</td>
                            <td className="pl-1 p-0">{invoice?.payedMoney.toLocaleString()}</td>
                            <td className="pl-1 p-0">{invoice?.paymentMissing.toLocaleString()
                            }</td>
                            <td className="pl-1 p-0">{invoice?.paymentStatus}</td>
                            <td className="pl-1 p-0">{invoice?.paymentMethod}</td>
                            <td className="pl-1 p-0">{invoice?.paymentCompany}</td>
                            <td className="pl-1 p-0">{invoice?.createdAt ? new Date(invoice?.createdAt).toISOString(0, 10).substring(0, 10) : ""}</td>
                            <td className={invoice?.paymentMissing===0 ? "pl-1 p-0 text-success" : invoice?.paymentMissing<=1000 ?   "pl-1 p-0 text-warning" :  "pl-1 p-0 text-danger"} >{invoice?.paymentMissing.toLocaleString() }</td>
                            <td className="pl-1 p-0">{invoice?.clientId}</td>
                            <td className="pl-1 p-0">{invoice?.clientName} {invoice?.clientSurname}</td>
                            <td className="pl-1 p-0">{invoice?.vendorName} {invoice?.vendorSurname}</td>
                            <td className="p-0 ">
                            </td>
                          </tr>))}
                          
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row >
                <Col md="4">
                    Total Facturado: {totalToPay?.toLocaleString()}
                  </Col>
                  <Col md="4">
                    Total Recebido: {totalPayed?.toLocaleString()}
                  </Col>
                  <Col md="4">
                     Total Por Pagar: {remainToReceive?.toLocaleString()}
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