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

import axios from '../../api/axios';
import { Redirect, Link } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';


const Tag = function () {
  const accessToken = sessionStorage.getItem('accessToken');
  const errorRef = useRef();
  const successRef = useRef();
  const printRef = useRef();


  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [tags, setTags] = useState([])
  const [orderRef, setOrderRef]= useState("")
  const [clientName, setClientName] = useState("")
  const [clientSurname, setClientSurname] = useState("")




  useEffect(() => {
    const tags = async () => {
      if (orderRef!==""){
        try {
          const response = await axios.get(`order/tag/${orderRef}`,
            {
              headers: { 'accesstoken': `${accessToken}` },
            }
          );
          setTags(JSON.parse(response?.data?.order))
          setClientName(response?.data?.clientName)
          setClientSurname(response?.data?.clientSurname)
          setOrderRef(response?.data?.orderRef)
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
      
    }
    tags()
  }, [accessToken, errorRef, orderRef]
  )
  setTimeout(function () {
    if(success)
      setSuccess("")
    if(error)
      setError("")  
}, 4000);
  
  const handlePrinter = () => {
   
      Printer()
   

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
  
  return (

    <>{accessToken ? (<Container fluid>


      <Row>
        <Col className="order-xl-1 mb-5 mt-7 mb-xl-0"  >
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

            <CardHeader className="text-center btag-0 pt-2 pt-md-4 pb-0 pb-md-0">
              <h3 className="mb-0 text-default">Etiquetas</h3>
            </CardHeader>
            <CardBody>
              <Form className="pl-4 font-weight-bold text-uppercase">

                <Row >
                  <Col md="6">
                    <FormGroup>
                      <label className="text-default" htmlFor="studentNumber" >Introduza a factura</label>
                      <Input id="studentNumber"
                        placeholder="FA1912023/33"
                        type="text"
                        autoComplete="new-client"
                        required
                        value={orderRef}
                        onChange={(e) => setOrderRef(e.target.value)}
                        list="clients"
                      />
                      


                    </FormGroup>
                  </Col>

                </Row>
                <Row >
                <Col >
                    <FormGroup>
                      <Button onClick={handlePrinter} block>Imprimir Etiqueta</Button>
                    
                  </FormGroup>
                  </Col>
                </Row>
                <hr style={{
                  width: "98%",
                  marginLeft: 0,
                  btagColor: "info"
                }} />
                   <Row >

                  <Col md="6"  className="center">
                  <div className="" ref={printRef}>
                      <style type="text/css" media="print">{"@page {size: portrait;}"}</style>

                    <h3 className="text-darker">{orderRef} -{clientName} {clientSurname}</h3>
                    <Table
                        className="align-items-center text-uppercase font-weight-bold"
                      responsive
                      bordered
                    >
                      <thead className="text-darker ">
                        <tr >
                          <th scope="col" className="p-1 pl-2">Quantidade</th>
                          <th scope="col" className="p-1 pl-2">Descrição</th>
                        </tr>
                      </thead>
                      <tbody className="text-darker p-0 ">
                        {tags?.map((tag, index) => (
                          <tr key={index} >
                            <td className="p-0 pl-2">{tag?.quantity}</td>
                            <td className="p-0 pl-2">{tag?.family}</td>
                          </tr>
                        ))}

                      </tbody>
                    </Table>
                    </div>
                  </Col>


                </Row>
                </Form>
                </CardBody>
         
            </Card>
        </Col>

        
      </Row>

    </Container>) : <Redirect from="*" to="/auth/login" />}

    </>
  );
};


export default Tag;