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
import paymentStatusConfig from "../../config/paymentStatus"
import paymentMethodConfig from "../../config/paymentMethod"

import { useReactToPrint } from 'react-to-print';

import moment from "moment";


const Invoices = () => {

  const [orders, setOrders] = useState([])
  const accessToken = sessionStorage.getItem('accessToken');
  const location = JSON.parse(sessionStorage.getItem('address'));
  const errorRef = useRef();
  const successRef = useRef();
  const date = moment().format('MMMM Do YYYY, h:mm:ss a')
  const printRef = useRef()

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [total, setTotal] = useState(0)
  const [payedMoney, setPayedMoney] = useState(0)
  const [paymentMissing, setPaymentMissing] = useState(0)
  const [paymentReference, setPaymentRef] = useState("")
  const [isPayment, setIsPayment] = useState(false)
  const [isMoney, setIsMoney] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(paymentStatusConfig.notPayed)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderRef, setOrderRef] = useState("")
  const [order, setOrder] = useState({})
  const [payChange, setPayChange] = useState(0)
  const [receiptRef, setReceiptRef] = useState(0)
  const [clientId, setClientId] = useState(0)
  const [observation, setObservation] = useState("")
  const [isPrint, setIsPrint] = useState(false)

  useEffect(() => {
    setPaymentMissing(total >= payedMoney ? parseFloat(parseFloat(total) - parseFloat(payedMoney)).toFixed(2) : parseFloat(0).toFixed(2))

    setPaymentStatus(parseFloat(total) <= parseFloat(payedMoney) ? paymentStatusConfig.payed : parseFloat(payedMoney) === 0 ? paymentStatusConfig.notPayed : paymentStatusConfig.partiallyPayed)

    setPayChange(payedMoney >= total ? parseFloat(parseFloat(payedMoney) - parseFloat(total)).toFixed(2) : parseFloat(0))
  }, [payedMoney, total])

  const HandleMoneyPayment = (ismoney, isOther, paymentmethod) => {
    setIsMoney(ismoney)
    setIsPayment(isOther)
    setPaymentMethod(paymentmethod)
  }


  useEffect(() => {
    const order = async () => {

      try {
        if (orderRef) {
          const response = await axios.get(`order/orderref/${orderRef}`,
            {
              headers: { 'accesstoken': `${accessToken}` },
            }
          );
          setOrder(response?.data)
          const ref = response?.data?.orderRef.substring(2, response?.data?.orderRef?.length)
          const finalRef = `RE${ref}`
          setReceiptRef(finalRef)
          setTotal(response?.data?.totalToPay)
          setOrders(JSON.parse(response?.data?.order))
          setPayedMoney(response?.data?.payedMoney)
          setPaymentMissing(response?.data?.paymentMissing)
          setPaymentStatus(response?.data?.paymentStatus)
          setClientId(response?.data?.clientId)
          setError("")
          setSuccess("")
        }

      } catch (err) {
        if (!err?.response) {
          setError('A requisição falhou, por favor tente novamente');
        } else if (err.response?.status === 404 || 400 || 401 || 500) {
          setError(err.response?.data?.error);
        } else {
          setError('Falha na pesquisa pelos utilizadores, por favor tente novamente');
        }
        errorRef?.current?.focus();
      }
    }



    if (orderRef) {
      order()
    }


  }, [accessToken, errorRef, orderRef,]
  )


  useEffect(() => {
    setError("")
    setSuccess("")
  }, [observation, orderRef])

  const handlePayment = async (event) => {
    setIsPrint(true)
    event.preventDefault()
    if (parseFloat(total) <= parseFloat(payedMoney)) {

      try {
        const response = await axios.post(`receipt/payment/`,
          JSON.stringify({
            paymentMethod, paymentStatus, paymentReference, paymentMissing, payedMoney, orderRef, receiptRef, orders, clientId, location: location.id, totalToPay: total, observation

          }),
          {
            headers: {
              'accesstoken': `${accessToken}`,
              'Content-Type': 'application/json'
            },
          }
        );


        handlePrinter()
        setIsPrint(false)
        setError("")
        setSuccess(response?.data?.message)
        successRef?.current?.focus();
      } catch (err) {
        setSuccess("")
        setIsPrint(false)
        if (!err?.response) {
          setError('A requisição falhou, verique a referênçia da factura!');
        } else if (err.response?.status === 400 || 401 || 404 || 500) {
          setError(err.response?.data?.error);
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
    if (success)
      setSuccess("")
    if (error)
      setError("")
  }, 4000);

  const Printer = useReactToPrint({
    pageStyle: `@media print {
      div {
      width: -moz-fit-content;
        width: fit-content;
        font-family: " Georgia, serif";
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
      setClientId(1)
      setOrders([])
      setIsPrint(false)
    } else {
      setError("Selecione o cliente e pelos um item da requisicao")
    }

  }


  return (

    <>{accessToken ? <Container fluid>
      <Row>
        <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" xl="6">
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
              <h3 className="mb-0 text-default">Pagamentos</h3>
            </CardHeader>
            <CardBody>
              <Form className="pl-4 font-weight-bold text-uppercase">

                <Row >
                  <Col md="6">
                    <FormGroup>
                      <label className="text-default" htmlFor="orderRef" >Introduza a Referência da factura</label>
                      <Input id="orderRef"
                        placeholder="FA611/1"
                        type="text"
                        autoComplete="new-client"
                        required
                        value={orderRef}
                        onChange={(e) => setOrderRef(e.target.value.trim())}
                        list="clients"
                      />




                    </FormGroup>
                  </Col>

                </Row>
                <hr style={{
                  width: "98%",
                  marginLeft: 0,
                  borderColor: "info"
                }} />

                <Row>
                  <Col>
                    <FormGroup>
                      <Button className="btn btn-danger m-0" disabled={paymentStatus === "pago" ? true : false} type="button" onClick={(e) => HandleMoneyPayment(false, true, paymentMethodConfig.mobileCard)}><i className="fas fa-hand-holding-usd"></i>Carteira Móvel</Button>
                    </FormGroup>
                  </Col>
                  <Col >
                    <FormGroup>
                      <Button className="btn btn-danger m-0" disabled={paymentStatus === "pago" ? true : false} type="button" onClick={(e) => HandleMoneyPayment(false, true, paymentMethodConfig.pos)}><i className="ni ni-credit-card"></i>POS</Button>
                    </FormGroup>
                  </Col>
                  <Col >
                    <FormGroup>
                      <Button className="btn btn-danger m-0" disabled={paymentStatus === "pago" ? true : false} type="button" onClick={(e) => HandleMoneyPayment(false, true, paymentMethodConfig.check)}><i className="fas fa-money-check-alt"></i>Cheque</Button>
                    </FormGroup>
                  </Col>
                  <Col >
                    <FormGroup>
                      <Button className="btn btn-danger m-0" disabled={paymentStatus === "pago" ? true : false} type="button" onClick={(e) => HandleMoneyPayment(true, false, paymentMethodConfig.money)}><i className="fas fa-money-bill-wave"></i>Dinheiro</Button>
                    </FormGroup>
                  </Col>
                </Row>

                {isPayment ? (<Row >
                  <Col md="12"  >
                    <FormGroup className="mb-4">
                      <label className="text-default form-control-label" htmlFor="observation">Comentarios: </label>

                      <Input
                        type="textarea"
                        id="observation"
                        className="text-default text-uppercase"
                        placeholder="Escreva aqui as observações da roupa recebida"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}

                      />
                    </FormGroup>
                  </Col>

                  <Col md="3" >
                    <FormGroup className="mb-4">

                      <label className="text-default form-control-label" htmlFor="payedMoney" >Valor pago: </label>
                      <Input id="payedMoney"
                        placeholder="1000"
                        type="number"
                        value={payedMoney}
                        disabled={receiptRef ? false : true}
                        className="text-uppercase text-default"
                        onChange={(e) => setPayedMoney(Math.abs(e.target.value))}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="5" >
                    <FormGroup className="mb-4">

                      <label className="text-default form-control-label" htmlFor="paymentReference">Referência do pagamento: </label>
                      <Input id="paymentReference"
                        placeholder="849229754"
                        type="text"
                        value={paymentReference}
                        disabled={receiptRef ? false : true}
                        className="text-uppercase text-default"
                        onChange={(e) => setPaymentRef(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col >
                    <FormGroup>
                      <Button onClick={handlePayment} className="btn-success mt-4"  >Efectuar o pagamento</Button>
                    </FormGroup>
                  </Col>

                </Row>) : ""
                }
                {isMoney ? (

                  <Row >
                    <Col md="12" >
                      <FormGroup className="mb-4">
                        <label className="text-default form-control-label" htmlFor="observation">Comentarios: </label>

                        <Input
                          type="textarea"
                          id="observation"
                          className="text-default text-uppercase"
                          placeholder="Escreva aqui as observações da roupa recebida"
                          value={observation}
                          onChange={(e) => setObservation(e.target.value)}

                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" >
                      <FormGroup className="mb-4">

                        <label className="text-default form-control-label" htmlFor="payedMoney">Valor pago: </label>
                        <Input id="payedMoney"
                          placeholder="8000"
                          type="number"
                          min={1}
                          value={payedMoney}
                          disabled={receiptRef ? false : true}
                          onInvalid={e => e.target.setCustomValidity("Por favor, preencha com valor numericos")}
                          className="text-uppercase text-default"
                          onChange={(e) => setPayedMoney(Math.abs(e.target.value))}
                        />
                      </FormGroup>
                    </Col>
                    <Col >
                      <FormGroup>
                        <Button onClick={handlePayment} className="btn-success mt-4" >Salvar pagamento</Button>
                      </FormGroup>
                    </Col>

                  </Row>) : ""
                }


              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col className="order-xl-1 text-darker" xl="6" id="print">
          <div className="" ref={printRef}>
            <style type="text/css" media="print">{"@page {size: portrait;}"}</style>
            <Card className={isPrint ? "  " : " mt-7"}>
              <CardHeader className=" border-0 text-center text-uppercase">

                <h3 className="text-darker  p- font-weight-bolder m-0" >ECOSEC Lavandaria</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Nuit: {location?.nuit}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" > {location?.name}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >{location?.location}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Tel: {location?.phoneNumber1 ? location?.phoneNumber1 : ""}  {location?.phoneNumber2 ? location?.phoneNumber2 : ""}  {location?.phoneNumber3 ? location?.phoneNumber3 : ""}</h3>

              </CardHeader>
              <h3 className="text-darker  pl-2 font-weight-bolder m-0 text-uppercase">Codigo: {order?.clientId}</h3>
              <h3 className="text-darker  pl-2 font-weight-bolder m-0 text-uppercase" >Nome: {order?.clientName} {order?.clientSurname}</h3>
              <h3 className="text-darker  pl-2 font-weight-bolder m-0 text-uppercase">Nuit: {order?.clientNuit}</h3>
              <h3 className="text-darker  pl-2 font-weight-bolder m-0 text-uppercase">Morada:  {order?.clientAddress}</h3>
              <h3 className="text-darker  pl-2 font-weight-bolder m-0 text-uppercase">Contacto: {order?.clientPhone}</h3>

              <h3 className="m-0  p-0   pl-2 text-darker font-weight-bolder text-uppercase">Recibo: {receiptRef}</h3>
              <h3 className="m-0  p-0   pl-2 text-darker font-weight-bolder text-uppercase">Data: {date}</h3>
              <CardBody className="mt-0">
                <Row>
                  <Col>{
                    isPrint ? <Col className="p-0">

                      <ul className=" text-darker ni-ul p-0 m-0">
                        <li style={{ float: "left", display: "block", width: "30px", height: "30px", margin: 0, padding: 0 }}  ><h3 className="text-darker">QT</h3></li>
                        <li style={{ float: "left", display: "block", width: "120px", height: "30px", margin: 0, padding: 0 }}><h3 className="text-darker">Descrição</h3></li>
                        <li style={{ float: "left", display: "block", width: "100px", height: "30px", margin: 0, padding: 0 }}><h3 className="text-darker">P.Unidade</h3></li>
                        <li style={{ float: "left", display: "block", width: "100px", height: "30px", margin: 0, padding: 0 }} ><h3 className="text-darker">Subtotal</h3></li>
                        <li style={{ float: "left", display: "block", width: "80px", height: "30px", margin: 0, padding: 0 }} ><h3 className="text-darker">Obs</h3></li>
                      </ul>
                      {orders?.map((order, index) => (
                        <ul className=" text-darker ni-ul p-0 m-0" key={index} value={order}>
                          <li style={{ float: "left", display: "block", width: "30px", height: "30px", margin: 0, padding: 0 }} ><h3 className="text-darker">{order?.quantity}</h3></li>
                          <li style={{ float: "left", display: "block", width: "120px", height: "30px", margin: 0, padding: 0 }} ><h3 className="text-darker">{order?.family}</h3></li>
                          <li style={{ float: "left", display: "block", width: "100px", height: "30px", margin: 0, padding: 0 }} ><h3 className="text-darker">{parseFloat(order?.prince).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</h3></li>
                          <li style={{ float: "left", display: "block", width: "100px", height: "30px", margin: 0, padding: 0 }} ><h3 className="text-darker">{parseFloat(order?.subTotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</h3></li>
                          <li style={{ float: "left", display: "block", width: "80px", height: "30px", margin: 0, padding: 0 }}><h3 className="text-darker">{order?.observation}</h3></li>
                        </ul>
                      ))}
                    </Col>

                      :
                    <Table
                      className="align-items-center "
                      responsive
                      bordered
                    >
                      <thead className="text-darker">
                        <tr >
                          <th scope="col" className="font-weight-bolder p-1">Qt</th>
                          <th scope="col" className="font-weight-bolder p-1">Descrição</th>
                          <th scope="col" className="font-weight-bolder p-1">P.Unidade</th>
                          <th scope="col" className="font-weight-bolder p-1">Subtotal</th>
                          <th scope="col" className="font-weight-bolder p-1">Comentario</th>
                        </tr>
                      </thead>
                      <tbody className="text-darker p-0">
                        {orders?.map((order, index) => (
                          <tr key={index} value={order}>
                            <td className="p-1 font-weight-bolder text-uppercase">{order?.quantity}</td>
                            <td className="p-1 font-weight-bolder text-uppercase">{order?.family}</td>
                            <td className="p-1 font-weight-bolder text-uppercase">{parseFloat(order?.prince).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</td>
                            <td className="p-1 font-weight-bolder text-uppercase">{parseFloat((parseFloat(order?.prince) * 0.16 + parseFloat(order?.prince)) * order?.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</td>
                            <td className="p-1 font-weight-bolder text-uppercase">{order?.observation}</td>

                          </tr>
                        ))}

                      </tbody>
                    </Table>
}
                  </Col>


                </Row>

                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Total a pagar: {total} MT</h3>
                <h3 className=" text-darker  p-0 font-weight-bolder m-0" >Valor pago: {payedMoney} MT</h3>
                <h3 className=" text-darker  p-0 font-weight-bolder m-0" >Valor por pagar: {parseFloat(paymentMissing).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Troncos: {payChange} MT</h3>
                <hr style={{
                  width: "98%",
                  marginLeft: 0,
                  borderColor: "info"
                }} />
                <h3 className="m-0  p-0 pb-2 pr-2 ">Comentários: {observation}</h3>
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