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
import { useReactToPrint } from 'react-to-print';

const Invoices = () => {

  const [orders, setOrders] = useState([])
  const accessToken = sessionStorage.getItem('accessToken');
  const location = JSON.parse(sessionStorage.getItem('address'));
  const errorRef = useRef();
  const successRef = useRef();
  const printRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(0)
  const [invoices, setInvoices] = useState([])
  const [total, setTotal] = useState(0)
  const [orderRef, setOrderRef] = useState(0)
  const [client, setClient] = useState({})
  const [isPrint, setIsPrint] = useState(false)

  useEffect(() => {
    const handleSelectClient = () => {
      const client = clients.find(client => {
        return parseInt(client.id) === parseInt(clientId);
      });
      setClientId(client?.id ? client?.id : "")
      setClient(client)
    }

    handleSelectClient()
  }, [clientId, clients])



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

  useEffect(() => {
    const order = async () => {

      try {
        if (clientId) {
          const response = await axios.get(`order/index/${clientId}`,
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
    order()
  }, [accessToken, errorRef, clientId]
  )

  const handleEdit = (invoice) => {
    setOrders(JSON.parse(invoice?.order))
    setTotal(invoice?.totalToPay)
    setOrderRef(invoice?.orderRef)
  }

  const Printer = useReactToPrint({
    pageStyle: `@media print {
      div {
       width: -moz-fit-content;
        width: fit-content;
        font-family: "Helvetica Oblique";
        font-size: 24pt;
        margin:0;
        padding:0;
      }
      
      @page {
        size: 100mm 140mm;
      } 
    }`,
    content: () => printRef.current,

  });

  const handlePrinter = () => {
    if (clientId !== 1 && orders.length > 0) {
      setIsPrint(true)
      Printer()
      setIsPrint(false)
    } else {
      setError("Selecione o cliente e pelos um item da requisicao")
    }

  }


  return (

    <>{accessToken ? <Container fluid>
      <Row>
        <Col className="order-xl-1 mb-5 mt-7 mb-xl-0 " xl="6" >
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
              <h3 className="mb-0 text-default">Visualizar facturas dum cliente</h3>
            </CardHeader>
            <CardBody>
              <Form className="pl-4 font-weight-bold text-uppercase">

                <Row >
                  <Col md="6">
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
                  <Col className="mt-4 pt-2 pb-2 " >

                    <Button onClick={handlePrinter} block disabled={total ? false : true}>Imprimir Factura</Button>
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
                          <th className="p-1" scope="col">N. Factura</th>
                          <th className="p-1" scope="col">N. Recibo</th>
                          <th className="p-1" scope="col">V. Total</th>
                          <th className="p-1" scope="col">V. Pago</th>
                          <th className="p-1" scope="col">Data</th>
                          <th className="p-1" scope="col">C. Cliente</th>
                          <th className="p-1" scope="col">nome</th>
                          <th className="p-1" scope="col">apelido/responsavel</th>
                          <th className="p-1" scope="col">Acção</th>
                        </tr>
                      </thead>
                      <tbody className="text-white p-1">

                        {invoices?.map((invoice, index) => (
                          <tr key={index} value={invoice} >
                            <td className="pl-1 p-0">{invoice?.orderRef}</td>
                            <td className="pl-1 p-0">{invoice?.receiptRef}</td>
                            <td className="pl-1 p-0">{invoice?.totalToPay}</td>
                            <td className="pl-1 p-0">{invoice?.payedMoney}</td>
                            <td className="pl-1 p-0">{invoice?.createdAt ? new Date(invoice?.createdAt).toISOString(0, 10).substring(0, 10) : ""}</td>
                            <td className="pl-1 p-0">{invoice?.clientId}</td>
                            <td className="pl-1 p-0">{invoice?.clientName}</td>
                            <td className="pl-1 p-0">{invoice?.clientSurname}</td>
                            <td className="pl-1 p-0"><Button className="btn btn-white p-1" onClick={(e) => { handleEdit(invoice) }}>Selecionar</Button></td>

                          </tr>))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>


              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col className="order-xl-1 text-darker" xl="6" id="print">
          <div ref={printRef}>
            <style type="text/css" media="print">{"@page {size: portrait;}"}</style>
            <Card className={isPrint ? "" : "mt-7"}>
              <CardHeader className=" border-0 text-center text-uppercase">

                <h3 className="text-darker  p-0 font-weight-bolder m-0" >ECOSEC Lavandaria</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Nuit: {location.nuit}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >{location.name}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Tel: {location?.phoneNumber1 ? location.phoneNumber1 : ""}  {location?.phoneNumber2 ? location.phoneNumber2 : ""}  {location?.phoneNumber3 ? location.phoneNumber3 : ""} </h3>

              </CardHeader>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase">Codigo: {client?.id}</h3>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase" >Nome: {client?.name} {client?.surname}</h3>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase">Nuit: {client?.nuit ? client.nuit : ""}</h3>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase">Morada:  {client?.address}</h3>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase">Contacto: {client?.phoneNumber}</h3>

              <h3 className="m-0  p-0   pl-2 text-darker font-weight-bolder text-uppercase">Factura: {orderRef}</h3>
              <h3 className="m-0  p-0   pl-2 text-darker font-weight-bolder text-uppercase">Data: {new Date().toUTCString()}</h3>
              <h4 className="text-center m-0 text-darker text-uppercase">Segunda Via</h4>
              <CardBody className="mt-0">
                <Row>
                  <Col>
                    <Table
                      className="align-items-center "
                      responsive
                      bordered
                    >
                      <thead className=" text-darker h1">
                        <tr >
                          <th scope="col" className="p-1 font-weight-bolder">Qt</th>
                          <th scope="col" className="p-1 font-weight-bolder">Descrição</th>
                          <th scope="col" className="p-1 font-weight-bolder">P.Unidade</th>
                          <th scope="col" className="p-1 font-weight-bolder">Subtotal</th>
                          <th scope="col" className="p-1 font-weight-bolder" >comentario</th>
                        </tr>
                      </thead>
                      <tbody className="text-darker p-0 text-uppercase">
                        {orders?.map((order, index) => (
                          <tr key={index} value={order}>
                            <td className="p-1 font-weight-bolder">{order?.quantity}</td>
                            <td className="p-1 font-weight-bolder">{order?.family}</td>
                            <td className="p-1 font-weight-bolder">{parseFloat(order?.prince).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="p-1 font-weight-bolder">{(parseFloat(parseFloat(order?.prince) * 0.16 + parseFloat(order?.prince)) * order?.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="p-1 font-weight-bolder">{order?.observation}</td>

                          </tr>
                        ))}

                      </tbody>
                    </Table>
                  </Col>


                </Row>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Total a pagar: {parseFloat(total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >IVA: 16 %</h3>
                <hr style={{
                  width: "98%",
                  marginLeft: 0,
                  borderColor: "info"
                }} />

                <h3 className="text-uppercase   text-darker  font-weight-bolder p-0 m-0">O levantamento das roupas deve ser feito  </h3>
                <h3 className="text-uppercase  text-darker  font-weight-bolder  p-0 m-0">dentro de 30 dias, fora do prazo estabelecido</h3>
                <h3 className="text-uppercase  text-darker  font-weight-bolder  p-0 m-0"> não nos responsabilizamos, Obrigado!</h3>
              </CardBody>

            </Card>
          </div>

        </Col>



      </Row>

    </Container> : <Redirect from="*" to="/auth/login" />}

    </>
  );
}


export default Invoices;