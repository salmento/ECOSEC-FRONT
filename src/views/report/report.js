import React, { useState, useRef, useEffect } from "react";


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
    Table,
    Progress,
    Form
} from "reactstrap";

import moment from "moment";

import axios from '../../api/axios';
import { Redirect } from "react-router-dom";

const Clients = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const auth = JSON.parse(sessionStorage.getItem("auth"))
    const location = JSON.parse(sessionStorage.getItem('address'));


    const errorRef = useRef();
    const successRef = useRef();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [invoiceCounted, setInvoiceCounted] = useState(0)
    const [isRequested, setIsRequested] = useState(false)
    const [receiptCounted, setReceiptCounted] = useState(0)
    const [totalToBePayed, setTotalBePayed] = useState(0)
    const [totalPayedMoney, setTotalPayedMoney] = useState(0)
    const [totalSoldByFilial, setTotalSoldByFilial] = useState([])
    const [totalMostUsedPaymentMethodMoney, setTotalMostUsedPaymentMethodMoney] = useState({ name: " Dinheiro", totalPayed: 0 })
    const [totalMostUsedPaymentMethodCheck, setTotalMostUsedPaymentMethodCheck] = useState({ name: "CHEQUE", totalPayed: 0 })
    const [totalMostUsedPaymentMethodPos, setTotalMostUsedPaymentMethodPos] = useState({ name: "POS", totalPayed: 0 })
    const [totalMostUsedPaymentMethodMobileCard, setTotalMostUsedPaymentMethodMobileCard] = useState({ name: "Carteira Móvel", totalPayed: 0 })
    const [moneyPercentagem, setMoneyPercentagem] = useState(0)
    const [mobileCardPercentagem, setMobileCardPercentagem] = useState(0)
    const [posPercentagem, setPosPercentagem] = useState(0)
    const [checkPercentagem, setCheckPercentagem] = useState(0)
    const [tirolTotalMostUsedPaymentMethodMoney, setTirolTotalMostUsedPaymentMethodMoney] = useState({ name: " Dinheiro", totalPayed: 0 })
    const [tirolTotalMostUsedPaymentMethodCheck, setTirolTotalMostUsedPaymentMethodCheck] = useState({ name: "CHEQUE", totalPayed: 0 })
    const [tirolTotalMostUsedPaymentMethodPos, setTirolTotalMostUsedPaymentMethodPos] = useState({ name: "POS", totalPayed: 0 })
    const [tirolTotalMostUsedPaymentMethodMobileCard, setTirolTotalMostUsedPaymentMethodMobileCard] = useState({ name: "Carteira Móvel", totalPayed: 0 })
    const [vilaTotalMostUsedPaymentMethodMoney, setVilaTotalMostUsedPaymentMethodMoney] = useState({ name: " Dinheiro", totalPayed: 0 })
    const [vilaTotalMostUsedPaymentMethodCheck, setVilaTotalMostUsedPaymentMethodCheck] = useState({ name: "CHEQUE", totalPayed: 0 })
    const [vilaTotalMostUsedPaymentMethodPos, setVilaTotalMostUsedPaymentMethodPos] = useState({ name: "POS", totalPayed: 0 })
    const [vilaTotalMostUsedPaymentMethodMobileCard, setVilaTotalMostUsedPaymentMethodMobileCard] = useState({ name: "Carteira Móvel", totalPayed: 0 })
    const [interfrancaTotalMostUsedPaymentMethodMoney, setInterfrancaTotalMostUsedPaymentMethodMoney] = useState({ name: " Dinheiro", totalPayed: 0 })
    const [interfrancaTotalMostUsedPaymentMethodCheck, setInterfrancaTotalMostUsedPaymentMethodCheck] = useState({ name: "CHEQUE", totalPayed: 0 })
    const [interfrancaTotalMostUsedPaymentMethodPos, setInterfrancaTotalMostUsedPaymentMethodPos] = useState({ name: "POS", totalPayed: 0 })
    const [interfrancaTotalMostUsedPaymentMethodMobileCard, setInterfrancaTotalMostUsedPaymentMethodMobileCard] = useState({ name: "Carteira Móvel", totalPayed: 0 })

    setTimeout(function () {
        window.location.reload();
    }, 60000);
    useEffect(() => {
        const percentagem = () => {
            const total = totalMostUsedPaymentMethodMoney?.totalPayed + totalMostUsedPaymentMethodCheck?.totalPayed + totalMostUsedPaymentMethodPos?.totalPayed + totalMostUsedPaymentMethodMobileCard?.totalPayed
            if (total) {
                setMoneyPercentagem((totalMostUsedPaymentMethodMoney?.totalPayed * 100) / total)
                setPosPercentagem((totalMostUsedPaymentMethodPos?.totalPayed * 100) / total)
                setMobileCardPercentagem((totalMostUsedPaymentMethodMobileCard?.totalPayed * 100) / total)
                setCheckPercentagem((totalMostUsedPaymentMethodCheck?.totalPayed * 100) / total)
            }

        }

        percentagem()
    })

    useEffect(() => {
        const report = async () => {

            try {
                const response = await axios.get(`report/dashboard`,
                    {
                        headers: { 'accesstoken': `${accessToken}` },
                    }
                );
                setInvoiceCounted(response?.data?.invoiceCounted)
                setReceiptCounted(response?.data?.receiptCounted)
                setTotalBePayed(response?.data?.totalToBePayed)
                setTotalPayedMoney(response?.data?.totalPayedMoney)
                setTotalSoldByFilial(response?.data?.totalSoldByFilial)
                setTotalMostUsedPaymentMethodMoney(response?.data?.totalMostUsedPaymentMethodMoney)
                setTotalMostUsedPaymentMethodCheck(response?.data?.totalMostUsedPaymentMethodCheck)
                setTotalMostUsedPaymentMethodPos(response?.data?.totalMostUsedPaymentMethodPos)
                setTotalMostUsedPaymentMethodMobileCard(response?.data?.totalMostUsedPaymentMethodMobileCard)
                setError("")
                setSuccess("")
                setIsRequested(true)

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
        const tirol = async () => {

            try {
                const response = await axios.get(`receipt/boxClosurePaymentMethodByLocation?addressId=21`,
                    {
                        headers: { 'accesstoken': `${accessToken}` },
                    }
                );
                setTirolTotalMostUsedPaymentMethodCheck(response?.data?.totalMostUsedPaymentMethodCheck)
                setTirolTotalMostUsedPaymentMethodMobileCard(response?.data?.totalMostUsedPaymentMethodMobileCard)
                setTirolTotalMostUsedPaymentMethodMoney(response?.data?.totalMostUsedPaymentMethodMoney)
                setTirolTotalMostUsedPaymentMethodPos(response?.data?.totalMostUsedPaymentMethodPos)
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
        const vila = async () => {

            try {
                const response = await axios.get(`receipt/boxClosurePaymentMethodByLocation?addressId=22`,
                    {
                        headers: { 'accesstoken': `${accessToken}` },
                    }
                );
                setVilaTotalMostUsedPaymentMethodCheck(response?.data?.totalMostUsedPaymentMethodCheck)
                setVilaTotalMostUsedPaymentMethodMobileCard(response?.data?.totalMostUsedPaymentMethodMobileCard)
                setVilaTotalMostUsedPaymentMethodMoney(response?.data?.totalMostUsedPaymentMethodMoney)
                setVilaTotalMostUsedPaymentMethodPos(response?.data?.totalMostUsedPaymentMethodPos)
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
        const interfranca = async () => {

            try {
                const response = await axios.get(`receipt/boxClosurePaymentMethodByLocation?addressId=23`,
                    {
                        headers: { 'accesstoken': `${accessToken}` },
                    }
                );
                setInterfrancaTotalMostUsedPaymentMethodCheck(response?.data?.totalMostUsedPaymentMethodCheck)
                setInterfrancaTotalMostUsedPaymentMethodMobileCard(response?.data?.totalMostUsedPaymentMethodMobileCard)
                setInterfrancaTotalMostUsedPaymentMethodMoney(response?.data?.totalMostUsedPaymentMethodMoney)
                setInterfrancaTotalMostUsedPaymentMethodPos(response?.data?.totalMostUsedPaymentMethodPos)
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
        if (!isRequested) {
            report()
            tirol()
            vila()
            interfranca()
        }

    }, [accessToken, errorRef, auth, location, isRequested]
    )

    const date = moment().format('MMMM Do YYYY, h:mm:ss a')
    return (
        <>{accessToken ?
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
                                        <Card className="card-stats mb-4 mb-lg-0 ml-2 bg-info text-white">
                                            <CardBody>
                                                <Row>
                                                    <div className="col">
                                                        <CardTitle className="text-uppercase  mb-0">
                                                            Total de facturas
                                                        </CardTitle>
                                                        <span className="h2 font-weight-bold  text-white mb-0">{invoiceCounted}</span>
                                                    </div>

                                                </Row>
                                                <p className="mt-3 mb-0  text-sm">
                                                    <span className="text-success mr-2">
                                                        <i className="fa fa-arrow-up" />

                                                    </span>
                                                    <span className="text-nowrap">{date}</span>
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-stats mb-4 mb-lg-0  ml-2 bg-info text-white">
                                            <CardBody>
                                                <Row>
                                                    <div className="col">
                                                        <CardTitle className="text-uppercase  mb-0">
                                                            Total de Recibos
                                                        </CardTitle>
                                                        <span className="h2 font-weight-bold text-white mb-0">{receiptCounted}</span>
                                                    </div>
                                                </Row>
                                                <p className="mt-3 mb-0  text-sm">
                                                    <span className="text-success mr-2">
                                                        <i className="fa fa-arrow-up" />

                                                    </span>
                                                    <span className="text-nowrap">{date}</span>
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-stats mb-4 mb-lg-0  ml-2 bg-info text-white" >
                                            <CardBody>
                                                <Row>
                                                    <div className="col">
                                                        <CardTitle className="text-uppercase  mb-0">
                                                            Total valor por pagar
                                                        </CardTitle>
                                                        <span className="h2 font-weight-bold text-white mb-0">{totalToBePayed}</span>
                                                    </div>

                                                </Row>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2">
                                                        <i className="fa fa-arrow-up" />

                                                    </span>
                                                    <span className="text-nowrap">{date}</span>
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-stats mb-4 mb-lg-0  ml-2 bg-info text-white" >
                                            <CardBody>
                                                <Row>
                                                    <div className="col">
                                                        <CardTitle className="text-uppercase  mb-0">
                                                            Total Pago
                                                        </CardTitle>
                                                        <span className="h2 font-weight-bold text-white mb-0">{totalPayedMoney}</span>
                                                    </div>

                                                </Row>
                                                <p className="mt-3 mb-0  text-sm">
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

                                    <Col md="7" className="order-xl-1">
                                        <Table
                                            id="table-to-xls"
                                            className="align-items-center  "
                                            responsive
                                            bordered
                                            striped
                                            hover
                                        >
                                            <thead className="text-white bg-info p-1 h1">
                                                <tr>

                                                    <th className="p-1  pl-2" scope="col">Edificio</th>
                                                    <th className="p-1  pl-2" scope="col">Total Facturado (MT)</th>
                                                    <th className="p-1  pl-2" scope="col">Total Pago (MT)</th>
                                                    <th className="p-1  pl-2" scope="col">Total por facturar (MT) </th>
                                                </tr>
                                            </thead>
                                            <tbody className=" p-0 text-default">
                                                {totalSoldByFilial?.map((filial, index) => (
                                                    <tr key={index} >
                                                        <td className="p-1  pl-2">{filial?.name}</td>
                                                        <td className="p-1  pl-2">{filial?.total}</td>
                                                        <td className="p-1  pl-2">{filial?.totalPayed}</td>
                                                        <td className="p-1  pl-2">{filial?.totalToPay}</td>
                                                    </tr>
                                                ))}

                                            </tbody>

                                        </Table>
                                    </Col>
                                    <Col md="5" className="order-xl-1">
                                        <Table
                                            id="table-to-xls"
                                            className="align-items-center  "
                                            responsive
                                            bordered
                                            striped
                                            hover
                                        >
                                            <thead className="text-white bg-info p-1 h1">
                                                <tr>

                                                    <th className="p-1  pl-2" scope="col">Tipo</th>
                                                    <th className="p-1  pl-2" scope="col">Valor (MT)</th>
                                                    <th className="p-1  pl-2" scope="col">Percentagem (%)</th>
                                                </tr>
                                            </thead>
                                            <tbody className=" p-0 text-default">

                                                <tr key="1" >
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodMoney?.name}</td>
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodMoney?.totalPayed}</td>
                                                    <td className="p-1  pl-2">{parseFloat(moneyPercentagem).toFixed(2)} %<Progress max="100" value={moneyPercentagem} color="warning" /></td>
                                                </tr>
                                                <tr key="2" >
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodPos?.name}</td>
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodPos?.totalPayed}</td>
                                                    <td className="p-1  pl-2">{parseFloat(posPercentagem).toFixed(2)} %<Progress max="100" value={posPercentagem} color="success" /></td>
                                                </tr>
                                                <tr key="3" >
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodMobileCard?.name}</td>
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodMobileCard?.totalPayed}</td>
                                                    <td className="p-1  pl-2">{parseFloat(mobileCardPercentagem).toFixed(2)} %<Progress max="100" value={mobileCardPercentagem} color="info" /></td>
                                                </tr>
                                                <tr key="4" >
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodCheck?.name}</td>
                                                    <td className="p-1  pl-2">{totalMostUsedPaymentMethodCheck?.totalPayed}</td>
                                                    <td className="p-1  pl-2">{parseFloat(checkPercentagem).toFixed()} %<Progress max="100" value={checkPercentagem} color="danger" /></td>
                                                </tr>



                                            </tbody>

                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1 text-default " xl="12">
                        <Card className="bg-secondary mt-1 shadow">
                        <CardHeader className="text-center border-0 pt-2 pt-md-4   pb-0 pb-md-0">
                                <h2 className="mb-4 text-default"> Resumo dos Pagamentos feitos</h2>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="" >
                                        <Row>
                                            <Col md="12" className="pl-5 pr-5 pt-4">
                                                <strong>Ecosec: Tirol</strong>

                                                <Table
                                                    id="table-to-xls"
                                                    className="align-items-center  "
                                                    responsive
                                                    bordered
                                                    striped
                                                    hover
                                                >
                                                    <thead className=" p-1">
                                                        <tr>

                                                            <th className="p-1  pl-2  " scope="col"><h4 className="text-default">Tipo</h4></th>
                                                            <th className="p-1  pl-2" scope="col"> <h4 className="text-default">Valor (MT)</h4></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" p-0 text-default">

                                                        <tr key="1" >
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodMoney?.name}</td>
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodMoney?.totalPayed}</td>

                                                        </tr>
                                                        <tr key="2" >
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodPos?.name}</td>
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodPos?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="3" >
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodMobileCard?.name}</td>
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodMobileCard?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="4" >
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodCheck?.name}</td>
                                                            <td className="p-1  pl-2">{tirolTotalMostUsedPaymentMethodCheck?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="5" >
                                                            <td className="p-1  pl-2 text-danger font-weight-bold">Total</td>
                                                            <td className="p-1  pl-2 text-danger font-weight-bold">{tirolTotalMostUsedPaymentMethodCheck?.totalPayed + tirolTotalMostUsedPaymentMethodMoney?.totalPayed + tirolTotalMostUsedPaymentMethodMobileCard?.totalPayed + tirolTotalMostUsedPaymentMethodPos?.totalPayed}</td>
                                                        </tr>


                                                    </tbody>

                                                </Table>
                                            </Col>
                                            <Col md="12" className="pl-5 pr-5 mt-4">
                                                <strong>Ecosec: Vila das Mangas </strong>

                                                <Table
                                                    id="table-to-xls"
                                                    className="align-items-center  "
                                                    responsive
                                                    bordered
                                                    striped
                                                    hover
                                                >
                                                    <thead className=" p-1">
                                                        <tr>

                                                            <th className="p-1  pl-2  " scope="col"><h4 className="text-default">Tipo</h4></th>
                                                            <th className="p-1  pl-2" scope="col"> <h4 className="text-default">Valor (MT)</h4></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" p-0 text-default">

                                                        <tr key="1" >
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodMoney?.name}</td>
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodMoney?.totalPayed}</td>

                                                        </tr>
                                                        <tr key="2" >
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodPos?.name}</td>
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodPos?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="3" >
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodMobileCard?.name}</td>
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodMobileCard?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="4" >
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodCheck?.name}</td>
                                                            <td className="p-1  pl-2">{vilaTotalMostUsedPaymentMethodCheck?.totalPayed}</td>
                                                        </tr>

                                                        <tr key="5" >
                                                            <td className="p-1  pl-2 text-danger font-weight-bold">Total</td>
                                                            <td className="p-1  pl-2 text-danger font-weight-bold">{vilaTotalMostUsedPaymentMethodCheck?.totalPayed + vilaTotalMostUsedPaymentMethodMoney?.totalPayed + vilaTotalMostUsedPaymentMethodMobileCard?.totalPayed + vilaTotalMostUsedPaymentMethodPos?.totalPayed}</td>
                                                        </tr>

                                                    </tbody>

                                                </Table>
                                            </Col>
                                            <Col md="12" className="pl-5 pr-5 mt-4">
                                                <strong>Ecosec: Interfranca</strong>

                                                <Table
                                                    id="table-to-xls"
                                                    className="align-items-center  "
                                                    responsive
                                                    bordered
                                                    striped
                                                    hover
                                                >
                                                    <thead className=" p-1">
                                                        <tr>

                                                            <th className="p-1  pl-2  " scope="col"><h4 className="text-default">Tipo</h4></th>
                                                            <th className="p-1  pl-2" scope="col"> <h4 className="text-default">Valor (MT)</h4></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" p-0 text-default">

                                                        <tr key="1" >
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodMoney?.name}</td>
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodMoney?.totalPayed}</td>

                                                        </tr>
                                                        <tr key="2" >
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodPos?.name}</td>
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodPos?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="3" >
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodMobileCard?.name}</td>
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodMobileCard?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="4" >
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodCheck?.name}</td>
                                                            <td className="p-1  pl-2"> {interfrancaTotalMostUsedPaymentMethodCheck?.totalPayed}</td>
                                                        </tr>
                                                        <tr key="5" >
                                                            <td className="p-1  pl-2 text-danger font-weight-bold">Total</td>
                                                            <td className="p-1  pl-2 text-danger font-weight-bold">{interfrancaTotalMostUsedPaymentMethodCheck?.totalPayed + interfrancaTotalMostUsedPaymentMethodMoney?.totalPayed + interfrancaTotalMostUsedPaymentMethodMobileCard?.totalPayed + interfrancaTotalMostUsedPaymentMethodPos?.totalPayed}</td>
                                                        </tr>


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


export default Clients;