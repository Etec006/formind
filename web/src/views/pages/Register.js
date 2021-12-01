import { useState, useEffect, useRef } from "react";

import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import api from "services/api";
import { useHistory } from "react-router";
import { getToken } from "utils/authenticate";

import iconeFormind from "assets/img/logo/iconeFormind.png"

const alignImg = {
  margin: 'auto',
  width: '50%',
  padding: '10px'
};

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function handleCreateUser() {

    const {data, status} = await api.post('/user', {
      name: name,
      email: email,
      password: password
    })

    if(status == 201){
      history.push('/login-page');
      alert('Usuário cadastrado com sucesso')
    }

  }

  if(getToken()) history.push('/')

  return <>
    <DemoNavbar />
    <main>
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="pt-lg-5">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <img
                  src={iconeFormind}
                  className="img-fluid"
                  style={alignImg}
                  alt="..."
                />
                <CardBody className="px-lg-5 py-lg-3">
                  <div className="text-center text-muted mb-4">
                    <small>Entrar com credenciais</small>
                  </div>
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Nome"
                          type="text"
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Senha"
                          type="password"
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center mt--6">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={handleCreateUser}
                      >
                        Criar Conta
                      </Button>
                    </div> <br /> <br />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
    <SimpleFooter />
  </>
}

export default Register;
