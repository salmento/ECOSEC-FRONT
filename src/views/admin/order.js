import React, { useState, useRef, useEffect } from "react";


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
  Button,
  Alert,

} from "reactstrap";


import paymentStatusConfig from "config/paymentStatus";
import axios from '../../api/axios';
import { Redirect, Link } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

const Order = function () {
  const accessToken = sessionStorage.getItem('accessToken');
  const location = JSON.parse(sessionStorage.getItem('address'));
  const errorRef = useRef();
  const successRef = useRef();
  const printRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [clients, setClients] = useState([])
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [clientId, setClientId] = useState(1)
  const [client, setClient] = useState(0)
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [articles, setArticles] = useState([])
  const [index, setIndex] = useState("1000000")
  const [total, setTotal] = useState(0)
  const [payedMoney, setPayedMoney] = useState(0)
  const [paymentMissing, setPaymentMissing] = useState(0)
  const [orders, setOrders] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [family, setFamily] = useState(1000000)
  const [prince, setPrince] = useState(0)
  const [orderRef, setOrderRef] = useState()
  const [count, setCount] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState(paymentStatusConfig.notPayed)
  const tax = 16
  const [observation, setObservation] = useState("")
  const [isPrint, setIsPrint] = useState(false)


  const removeOrder = (order) => {
    const removedOrder = orders.filter((prevOrder) => prevOrder !== order)
    let total = 0
    removedOrder.forEach(order => {
      total += order.subTotal
    })

    setTotal(total)
    setOrders(removedOrder);
  };

  const addOrder = (order) => {
    if (parseInt(quantity) !== 0 && parseInt(prince) !== 0) {
      const subtax = parseFloat(quantity) * parseFloat(prince) * parseFloat(tax) / 100
      const sub = parseFloat(quantity) * parseFloat(prince) + parseFloat(subtax)

      order.subTotal = sub
      const addedOrder = orders;
      let total = 0
      addedOrder.push(order)

      addedOrder.forEach(order => {
        total += order.subTotal
      })

      setTotal(total)

      setOrders(addedOrder);
      setFamily("")
      setPrince(0)
      setQuantity(0)
      setObservation("")
      const day = new Date().getDate()
      const month = new Date().getMonth()
      const year = new Date().getFullYear()


      setOrderRef("FA".concat(day, month, year, "/", count + 1))


    }
  }

  useEffect(() => {


    setPaymentMissing(total >= payedMoney ? parseFloat(parseFloat(total) - parseFloat(payedMoney)).toFixed(2) : parseFloat(0).toFixed(2))

    setPaymentStatus(parseFloat(total) <= parseFloat(payedMoney) ? paymentStatusConfig.payed : parseFloat(payedMoney) === 0 ? paymentStatusConfig.notPayed : paymentStatusConfig.partiallyPayed)


  }, [payedMoney, total])


  useEffect(() => {
    const handleSelectArticle = () => {
      const article = articles[index]
      if (index !== "1000000") {
        setFamily(article?.name ? article?.name : "")
        setPrince(article?.prince ? article?.prince : "")
      }
    }

    handleSelectArticle()
  }, [index, articles])


  useEffect(() => {
    const handleSelectClient = () => {
      const client = clients.find(client => {
        return parseInt(client.id) === parseInt(clientId);
      });
      setName(client?.name ? client?.name : "")
      setClient(client?.id ? client?.id : "")
      setSurname(client?.surname ? client?.surname : "")
      setAddress(client?.address ? client?.address : "");
      setPhone(client?.phoneNumber ? client?.phoneNumber : "")
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
        errorRef?.current.focus();
      }
    }
    client()
  }, [accessToken, errorRef]
  )

  useEffect(() => {
    const count = async () => {

      try {
        const response = await axios.get(`order/count`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setCount(response?.data)
        setError("")
        setSuccess("")
      } catch (err) {
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 404 || 400 || 401 || 500) {
          setError(err.response?.data?.error);
        } else {
          setError('Falha na contagem das requisiçoes, por favor tente novamente');
        }
        errorRef?.current.focus();
      }
    }
    count()
  }, [accessToken, errorRef]
  )

  useEffect(() => {
    const article = async () => {

      try {
        const response = await axios.get(`item/index/active`,
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


  const handleCreate = async (event) => {
    setIsPrint(true)
    event.preventDefault()
    if (client && orders) {
      try {
        const response = await axios.post(`order/create`,
          JSON.stringify({
            client, order: orders, paymentStatus, observation, location: location.id, orderRef, paymentMissing, payedMoney, totalToPay: total

          }),
          {
            headers: {
              'accesstoken': `${accessToken}`,
              'Content-Type': 'application/json'
            },
          }
        );
        handlePrinter()
        setError("")
        setSuccess(response?.data?.message)
        setCount(count + 1)
        successRef?.current?.focus();
        setIsPrint(false)
      } catch (err) {
        setIsPrint(false)
        setSuccess("")
        if (!err?.response) {
          setError('Nenhum servidor responde');
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
    if (error)
      setError("")
  }, 4000);

  const handleReset = () => {
    setOrders([])
    setTotal(0)
    setPayedMoney(0)
    setPaymentMissing(0)
    setObservation("")
    setClientId(0)
    setOrderRef("")
    window.location.reload();
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
        size: 80mm 140mm;
      } 
    }`,
    content: () => printRef.current,

  });

  const handlePrinter = () => {
    if (clientId !== 1 && orders.length > 0) {
      setIsPrint(true)
      Printer()
      setAddress("")
      setClientId(1)
      setPhone("")
      setName("")
      setSurname("")
      setOrders([])
      setIsPrint(false)
    } else {
      setError("Selecione o cliente e pelos um item da requisicao")
    }

  }

  return (

    <>{accessToken ? (<Container fluid>


      <Row>
        <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" xl="6"  >
          <Card className="card-profile shadow">
            {error ? <Alert color={error ? "danger" : "secondary"}>
              <h3 ref={errorRef} >{error}  </h3>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <h3 ref={successRef} >{success} </h3>
            </Alert> : ""}
            <Row>
              <Col>
                <Button className="m0 text-uppercase" color="danger" to="/admin/reporter" type="button" tag={Link}  >
                  <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
            <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
              <h3 className="mb-0 text-default">Facturação e Cotação</h3>
            </CardHeader>
            <CardBody>
              <Form className="pl-4 font-weight-bold text-uppercase">

                <Row >
                  <Col md="6">
                    <FormGroup>
                      <Button onClick={handleReset} block className="mt-4 p-3 btn btn-warning">Facturar Outro Cliente</Button>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="text-default" htmlFor="studentNumber" >Selecione Cliente</label>
                      <Input id="studentNumber"
                        placeholder="Salmento Chitlango"
                        type="text"
                        autoComplete="new-client"
                        required
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        list="clients"
                      />
                      <datalist id="clients" className="bg-default">
                        {clients?.map((client, index) => (
                          <option key={index} value={client?.id}> {client?.id} - {client?.name} {client?.surname}</option>
                        ))}
                      </datalist>


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

                  </Col>
                </Row>

                <Row >
                  <Col md="4" >
                    <FormGroup className="mb-4">

                      <label className="text-default form-control-label" htmlFor="quantity">Quantidade: </label>
                      <Input id="quantity"
                        placeholder="0"
                        type="number"
                        disabled={name ? false : true}
                        className="text-uppercase text-default"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min={1}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" >
                    <FormGroup className="mb-4">

                      <label className="text-default form-control-label " htmlFor="family">  Selecione o artigo:
                        <select id="family"
                          className="text-default border-0 form-control border-dark font-weight-bold text-uppercase select mt-2"
                          defaultValue={index}
                          disabled={clientId ? false : true}
                          onChange={(e) => setIndex(e.target.value)}
                          required>
                          <option key="1000000" value={1000000} disabled>  Clique aqui </option>
                          {articles?.map((article, index) => (
                            <option key={index} value={index}>  {article?.name} </option>
                          ))}
                        </select>
                      </label>


                    </FormGroup>
                  </Col>
                  <Col md="4" >
                    <FormGroup className="mb-4">

                      <label className="text-default form-control-label" htmlFor="prince">Preço: </label>
                      <Input id="prince"
                        placeholder="120"
                        type="number"
                        min={1}
                        value={prince}
                        readOnly
                        disabled={clientId ? false : true}
                        className="text-uppercase text-default"
                        onChange={(e) => setPrince(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4" >
                    <FormGroup className="mb-4">

                      <label className="text-default form-control-label" htmlFor="obsertvation">Comentario: </label>
                      <Input id="observation"
                        placeholder="Camisa com noda"
                        type="text"
                        minLength={1}
                        maxLength={20}
                        value={observation}
                        className="text-uppercase text-default"
                        onChange={(e) => setObservation(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col className="m-0">
                    <FormGroup>
                      <Button
                        className="bg-white mt-4 pt-3 pb-3"
                        block
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          addOrder({ quantity, family, prince, tax, observation })
                        }}
                      ><i className="ni ni-fat-add"></i>Adicionar</Button>
                    </FormGroup>
                  </Col>

                </Row>

                <Row>
                  <Col >
                    <FormGroup>
                      <Button onClick={handleCreate} className="btn-success" block>Gerar factura</Button>

                    </FormGroup>
                  </Col>


                </Row>


              </Form>
            </CardBody>

          </Card>
        </Col>

        <Col className="order-xl-1 text-darker" xl="6" id="print">
          <div className="" ref={printRef}>
            <style type="text/css" media="print">{"@page {size: portrait;}"}</style>
            <Card className={isPrint ? "" : "mt-7"} >
              <CardHeader className="bg-white border-0 text-center text-uppercase">

                <h3 className="text-darker  p-0 font-weight-bolder m-0" >ECOSEC Lavandaria</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Nuit: {location?.nuit}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >{location?.name}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >{location?.location}</h3>
                <h3 className="text-darker  p-0 font-weight-bolder m-0" >Tel: {location?.phoneNumber1 ? location?.phoneNumber1 : ""}  {location?.phoneNumber2 ? location?.phoneNumber2 : ""}  {location?.phoneNumber3 ? location?.phoneNumber3 : ""}</h3>

              </CardHeader>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase">Codigo: {clientId}</h3>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase" >Nome: {name} {surname}</h3>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase">Morada:  {address}</h3>
              <h3 className="m-0  text-darker pl-2 font-weight-bolder text-uppercase">Contacto: {phoneNumber}</h3>

              <h3 className="m-0  p-0   pl-2 text-darker font-weight-bolder text-uppercase">Factura: {orderRef}</h3>
              <h3 className="m-0  p-0   pl-2 text-darker font-weight-bolder text-uppercase">Data: {new Date().toUTCString()}</h3>
              <CardBody className="mt-0 bg-white">
                <Row>
                  <Col>{
                    isPrint ? <Table
                      className="align-items-center"
                      responsive
                      bordered
                    >
                      <thead className=" text-darker text-uppercase">
                        <tr >
                          <th scope="col" className="font-weight-bolder p-1">Qt</th>
                          <th scope="col" className="font-weight-bolder p-1">Descrição</th>
                          <th scope="col" className="font-weight-bolder p-1">P.Unidade</th>
                          <th scope="col" className="font-weight-bolder p-1">Subtotal</th>
                          <th scope="col" className="font-weight-bolder p-1">Comentario</th>
                        </tr>
                      </thead>
                      <tbody className="p-0 text-uppercase text-darker ">
                        {orders?.map((order, index) => (
                          <tr key={index} value={order}>
                            <td className=" p-1 font-weight-bolder text-uppercase text-darker ">{order?.quantity}</td>
                            <td className="p-1 font-weight-bolder text-uppercase text-darker ">{order?.family}</td>
                            <td className="p-1 font-weight-bolder text-uppercase text-darker ">{parseFloat(order?.prince).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</td>
                            <td className="p-1 font-weight-bolder text-uppercase text-darker ">{parseFloat(order?.subTotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</td>
                            <td className="p-1 font-weight-bolder text-uppercase text-darker ">{order?.observation}</td>
                          </tr>
                        ))}
                      </tbody> </Table> :
                      <Table
                        className="align-items-center"
                        responsive
                        bordered
                      >
                        <thead className="">
                          <tr >
                            <th scope="col" className="text-darker p-1 text-uppercase">Qt</th>
                            <th scope="col" className="text-darker p-1 text-uppercase">Descrição</th>
                            <th scope="col" className="text-darker p-1 text-uppercase">P.Unidade</th>
                            <th scope="col" className="text-darker p-1 text-uppercase">Subtotal</th>
                            <th scope="col" className="text-darker p-1 text-uppercase">Comentario</th>
                            <th scope="col" className="text-darker p-1 text-uppercase">Acção</th>
                            <th scope="col" className="text-darker p-1 text-uppercase" />
                          </tr>
                        </thead>
                        <tbody className=" p-0 text-darker  ">
                          {orders?.map((order, index) => (
                            <tr key={index} value={order}>
                              <td className="p-1 font-weight-bolder text-uppercase">{order?.quantity}</td>
                              <td className="p-1 font-weight-bolder text-uppercase">{order?.family}</td>
                              <td className="p-1 font-weight-bolder text-uppercase">{parseFloat(order?.prince).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</td>
                              <td className="p-1 font-weight-bolder text-uppercase">{parseFloat(order?.subTotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</td>
                              <td className="p-1 font-weight-bolder text-uppercase" text-uppercase>{order?.observation}</td>
                              <td className="p-1 font-weight-bolder text-uppercase"><button value={order} className="btn btn-warning p-1" onClick={(e) => {
                                e.preventDefault();
                                removeOrder(order)
                              }} ><i className="ni ni-fat-delete"></i> Remover</button></td>

                            </tr>
                          ))}

                        </tbody></Table>
                  }
                  </Col>


                </Row>

                <h3 className=" text-darker  p-0 font-weight-bolder m-0" >Total a pagar: {parseFloat(total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT</h3>
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

    </Container>) : <Redirect from="*" to="/auth/login" />}

    </>
  );
};


export default Order;