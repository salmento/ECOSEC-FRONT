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
import moment from "moment"
import ReactToPrint from "react-to-print"

const Box = () => {

    const accessToken = sessionStorage.getItem('accessToken');
    const location = JSON.parse(sessionStorage.getItem('address'));
    const errorRef = useRef();
    const componentRef= useRef()
    const successRef = useRef();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [receipts, setReceipts] = useState([])
    const [orders, setOrders] = useState([])
    const [totalPayed, setTotalPayed] = useState(0)
    const [totalGenereted, setTotalGenereted] = useState(0)
    const date = moment().format("L")

 


    const handlePrint = () => {
        window.print()
    }

    setTimeout(function () {
        if(success)
          setSuccess("")
        if(error)
          setError("")  
    }, 4000);
    
    const boxClosure = async () => {

        try {
            const response = await axios.get(`receipt/boxclosure?addressId=${location.id}`,
                {
                    headers: { 'accesstoken': `${accessToken}` },
                }
            );
            setReceipts(response?.data?.receipts)
            setOrders(response?.data?.orders)
            setTotalGenereted(response?.data?.totalGenerated)
            setTotalPayed(response?.data?.totalPayed)
            
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
    
    return (

        <>{accessToken ?
            <Container fluid>
                <Row>
                    <Col className="order-xl-1 mb-5 mt-7 mb-xl-0" xl="7">
                        <Card className="card-profile shadow">
                            {error ? <Alert color={error ? "danger" : "secondary"}>
                                <strong ref={errorRef} >{error}  </strong>
                            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
                                <strong ref={successRef} >{success} </strong>
                            </Alert> : ""}
                            <Row>
                                <Col>
                            <Button className="m0 text-uppercase"  color="danger" to="/operator/cliebts" type="button" tag={Link}  >
            <i className="fas fa-arrow-left"></i>voltar</Button></Col></Row>
                            <CardHeader className="text-center border-0 pt-2 pt-md-4 pb-0 pb-md-0">
                                <h3 className="mb-0 text-default text-uppercase">Fecho do dia </h3>
                            </CardHeader>
                            <CardBody>
                                <Form className="pl-4 font-weight-bold text-uppercase">
                                    <Row >

                                        <Col md="12">
                                            <FormGroup>
                                                <Button onClick={boxClosure} block className="mt-4 p-3 btn btn-success">Gerar Fecho</Button>
                                            </FormGroup>
                                        </Col>
                                        <ReactToPrint
                                            trigger={() => (
                                                <Button onClick={handlePrint} block className=" p-3 ml-3 mr-3">Imprimir O Fecho Do Dia</Button>
                                            )}
                                            content={() => componentRef.current}
                                        />
                                       
                                    </Row>


                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-warning  btn-block mt-4 "
                                        table="table-to-xls"
                                        filename="Relatório"
                                        sheet="Facturas pendentes"
                                        buttonText="Download" />
                                    <hr style={{
                                        width: "98%",
                                        marginLeft: 0,
                                        borderColor: "green"
                                    }} />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1 text-default " xl="5">
                        <Card className="bg-secondary mt-7 shadow">
                            <CardBody>
                                <Form>
                                    <div className="" ref={componentRef}>
                                        <Row>
                                            <Col md="12" className="pl-5 pr-5 pt-4">
                                                <strong>Ecosec: {location?.name}</strong>
                                                <p>{location?.location}</p>
                                                <p>Nuit: {location?.nuit}</p>
                                                <h3 className="text-center">Pré-Relatório Diário</h3>

                                                <h4 className="my-1 p-0 text-center">[{date}]</h4>


                                                <h3 className="text-center">Movimentos</h3>
                                                <Table
                                                    id="table-to-xls"
                                                    className="align-items-center  "
                                                    responsive
                                                >
                                                    <thead className="text-white bg-info p-1 h1">
                                                        <tr>

                                                            <th className="p-1" scope="col">Tipo de Documento</th>
                                                            <th className="p-1" scope="col">Ref. documento</th>
                                                            <th className="p-1" scope="col"> Valor</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" p-0 text-default">

                                                        <tr key="10000000000000000000000000" >
                                                            <td className="p-0"><strong>Factura</strong></td>
                                                            <td className="p-0"><strong></strong></td>
                                                            <td className="p-0"><strong>{parseFloat(totalGenereted).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits:2})}MT</strong></td>
                                                        </tr>
                                                        {orders?.map((order) => (
                                                            <tr key={order?.orderRef} >
                                                                <td className="p-0">Factura</td>
                                                                <td className="p-0">{order?.orderRef}</td>
                                                                <td className="p-0">{parseFloat(order?.totalToPay).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits:2})} MT</td>
                                                            </tr>
                                                        ))}
                                                        <tr key="10000000000000000000000000111" >
                                                            <td className="p-0"><strong>Recibo</strong></td>
                                                            <td className="p-0"><strong></strong></td>
                                                            <td className="p-0"><strong>{parseFloat(totalPayed).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits:2})} MT</strong></td>
                                                        </tr>
                                                        {receipts?.map((receipt) => (
                                                            <tr key={receipt?.receiptRef} >
                                                                <td className="p-0">Recibo</td>
                                                                <td className="p-0">{receipt?.receiptRef}</td>
                                                                <td className="p-0">{parseFloat(receipt?.totalToPay).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits:2})} MT</td>
                                                            </tr>
                                                        ))}

                                                    </tbody>

                                                </Table>
                                            </Col>

                                        </Row>
                                    </div>


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


export default Box;