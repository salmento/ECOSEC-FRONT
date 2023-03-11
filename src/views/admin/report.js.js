import React , {useState, useRef, useEffect}from "react";


// reactstrap components
import {
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  CardBody,
  CardTitle,
  Alert,
} from "reactstrap";
 
import moment from "moment";

import axios from '../../api/axios';
import { Redirect, } from "react-router-dom";

const Clients = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const auth = JSON.parse(sessionStorage.getItem("auth"))
  const location = JSON.parse(sessionStorage.getItem('address'));


  const errorRef = useRef();
  const successRef = useRef();
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [invoiceCountNotPayed , setinvoiceCountNotPayed ] = useState(0)
  const [receiptCount, setReceiptCount] = useState(0)
  const [invoiceDiaryCount, setInvoiceDiaryCount] = useState(0)
  const [mostSoldItem, setMostSoldItem] = useState({})
  const [totalPayed, setTotalPayed] = useState(0)
  const [isRequested, setIsRequested] = useState(false)

  useEffect(() => {
    const invoiceNotPayed = async () => {

      try {
        const response = await axios.get(`order/invoiceNotPayed`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setinvoiceCountNotPayed (response?.data)
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
    const receiptCount = async () => {

      try {
        const response = await axios.get(`receipt/receiptCount`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setReceiptCount (response?.data)
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
    const invoiceDiaryCount = async () => {

      try {
        const response = await axios.get(`order/invoicediarycount`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setInvoiceDiaryCount (response?.data)
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
    const mostSoldItem = async () => {

      try {
        const response = await axios.get(`item/mostsolditem`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setMostSoldItem(response?.data)
        setError("")
        setSuccess("")
      } catch (err) {
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 404 || 400 || 401 || 500) {
          setError(err.response?.data?.error);
        } else {
          setError('Falha na pesquisa pelos items vendidos, por favor tente novamente');
        }
        errorRef?.current?.focus();
      }
    }

    
    const totalSold = async () => {

      try {
        const response = await axios.get(`receipt/totalpayed/${location.id}`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        )
        setTotalPayed(response?.data)
        setError("")
        setSuccess("")
      } catch (err) {
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 404 || 400 || 401 || 500) {
          setError(err.response?.data?.error);
        } else {
          setError('Falha na pesquisa pelos items vendidos, por favor tente novamente');
        }
        errorRef?.current?.focus();
      }
    }
    if(!isRequested){
      invoiceNotPayed()
      receiptCount()
      invoiceDiaryCount()
      mostSoldItem()
      totalSold()
      setIsRequested(true)
    }
    
  }, [accessToken, errorRef, auth, location, isRequested]
  )
  const date= moment().format('MMMM Do YYYY, h:mm:ss a')
  setTimeout(function () {
    if(success)
      setSuccess("")
    if(error)
      setError("")  
}, 4000);
  return (
    <>{ accessToken ? 
      <Container fluid className="align-items-center text-uppercase">
        <Row>
          <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" >
            <Card className="card-profile shadow">
            {error ? <Alert color={error ? "danger" : "secondary"}>
              <strong ref={errorRef} >{error}  </strong>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <strong ref={successRef} >{success} </strong>
            </Alert> : ""}
              <CardHeader className="text-center border-0 pt-2 pt-md-4   pb-0 pb-md-0">
                <h2 className="mb-4 text-default"> Relatório</h2>



              </CardHeader>
              <CardBody>
              <Row>
                <Col >
                <Card className="card-stats mb-4 mb-lg-0 ml-2">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle className="text-uppercase text-muted mb-0">
                          Total de facturas pendentes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{invoiceCountNotPayed}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <a size="lg" href="/admin/invoicereport" type="button"  ><i className="fas fa-arrow-right"></i> </a>
                        
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" />
                        
                      </span>
                      <span className="text-nowrap">{date}</span>
                    </p>
                  </CardBody>
                </Card>
                </Col>
                <Col>
                <Card className="card-stats mb-4 mb-lg-0  ml-2">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle className="text-uppercase text-muted mb-0">
                          Total de Recibos Diarios 
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{receiptCount}</span>
                      </div>
                      <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <a size="lg" href="/admin/receiptsreport" type="button"  ><i className="fas fa-arrow-right"></i> </a>
                        
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" />
                        
                      </span>
                      <span className="text-nowrap">{date}</span>
                    </p>
                  </CardBody>
                </Card>
                </Col>
                <Col>
                <Card className="card-stats mb-4 mb-lg-0  ml-2" >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle className="text-uppercase text-muted mb-0">
                          Total das Facturas Diaras
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{invoiceDiaryCount}</span>
                      </div>
                      <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <a size="lg" href="/admin/moneyreport" type="button"  ><i className="fas fa-arrow-right"></i> </a>
                        
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" />
                        
                      </span>
                      <span className="text-nowrap">{date}</span>
                    </p>
                  </CardBody>
                </Card>
                </Col>
                </Row>
                <hr style={{
                    width: "98%",
                    marginLeft: 0,
                    borderColor: "info"
                  }} />
                 <Row>
                <Col >
                <Card className="card-stats mb-4 mb-lg-0 ml-2 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle className="text-uppercase text-muted mb-0">
                          Artigo mais vendido
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{mostSoldItem?.name}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <a size="lg" href="/admin/articlereport" type="button"  ><i className="fas fa-arrow-right"></i> </a>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-right"></i>
                       
                      </span>
                      <span className="text-nowrap">{date}</span>
                    </p>
                  </CardBody>
                </Card>
                </Col>
                
                <Col>
                <Card className="card-stats mb-4 mb-lg-0 ml-2 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle className="text-uppercase text-muted mb-0">
                          Valor diario vendido na filial
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{location.name}: {totalPayed}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <a size="lg" href="/admin/buildingreport" type="button"  ><i className="fas fa-arrow-right"></i> </a>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-right"></i>
                       
                      </span>
                      <span className="text-nowrap">{date}</span>
                    </p>
                  </CardBody>
                </Card>
                </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>



        </Row>
      </Container>: <Redirect from="*" to="/auth/login" />

    }
    </>

  );
}


export default Clients;