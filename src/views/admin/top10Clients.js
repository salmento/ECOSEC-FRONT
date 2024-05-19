import React, { useState, useEffect, useRef } from "react";
// reactstrap components
import {
  Row,
  Col,
  Container,
  CardHeader,
  CardBody,
  Alert,
  Form

} from "reactstrap";

import axios from '../../api/axios';
import { Redirect } from "react-router-dom"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


const columns = [
  { dataField: 'clientId', text: 'ID', hidden: true },
  { dataField: 'name', text: 'Nome' },
  { dataField: 'surname', text: 'Apelido' },
  { dataField: 'totalToPay', text: 'Valor Gerado em Facturas' },
  { dataField: 'payedMoney', text: 'Valor Pago' },
];

const TopClients = () => {

  const accessToken = sessionStorage.getItem('accessToken');
  const errorRef = useRef();
  const successRef = useRef();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [top10Clients, setTop10Clients] = useState([])

  useEffect(() => {
    const top10Clients = async () => {

      try {
        const response = await axios.get(`report/top10clients`,
          {
            headers: { 'accesstoken': `${accessToken}` },
          }
        );
        setTop10Clients(response?.data)
        setError("")
        setSuccess("")
      } catch (err) {
        if (!err?.response) {
          setError('Nenhum servidor responde');
        } else if (err.response?.status === 404 || 400 || 401 || 500) {
          setError(err.response?.data?.error);
        } else {
          setError('Falha na pesquisa pelos top 10 clientes, por favor tente novamente');
        }
        errorRef?.current?.focus();
      }
    }
    top10Clients()
  }, [accessToken])
  
  function rowStyleFormat(row, rowIdx) {
    const color = "#A3EBB1"

    return { backgroundColor: color };
  }
  setTimeout(function () {
    if (success)
      setSuccess("")
    if (error)
      setError("")
  }, 4000);
  return (
    <>{accessToken ? (
      <Container fluid className="align-items-center">
        <Row>
          <Col className="order-xl-1 text-default mt-9" xl="12">
            {error ? <Alert color={error ? "danger" : "secondary"}>
              <strong ref={errorRef} >{error}  </strong>
            </Alert> : success ? <Alert color={success ? "success" : "secondary"} >
              <strong ref={successRef} >{success} </strong>
            </Alert> : ""}
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h2 className="mb-4 text-default">Top 10 dos Clientes em {new Date().toLocaleString('default', {month: 'long'})} </h2>
                </Col>
              </Row>

              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success btn-block "
                table="Top10CLients"
                filename="Top10CLients"
                sheet="clientes"
                buttonText="Download" />
              <hr style={{
                width: "98%",
                marginLeft: 0,
                borderColor: "green"
              }} />

            </CardHeader>
            <CardBody className="mt-0">
              <Form className="   pl-4 pb-4 pt-2 pt-md-3 font-weight-bold text-uppercase">

              </Form>
              <Row>
                <Col>
                <BootstrapTable
                  bootstrap4
                  keyField="mecanograf"
                  data={top10Clients}
                  columns={columns}
                  rowStyle={rowStyleFormat}
                  pagination={paginationFactory({ sizePerPage: 25 })}
                  id="Top10CLients"
                />
              </Col>
              </Row>
            </CardBody>
          </Col>

        </Row>
      </Container>) : <Redirect from="*" to="/auth/login" />
    }
    </>

  );
}


export default TopClients;