import { useState } from "react";

import axios from "axios";

// reactstrap components
import {
  Button,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Card,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import api from "../../services/api.js";

const alignImg = {
  margin: 'auto',
  width: '50%',
  padding: '10px'
};

const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function handleLogin() {

    console.log("EMAIl: ", email, "SENHA: ", password);

    // const options = {
    //   method: 'POST',
    //   url: 'http://localhost:3333/auth',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: { email: email, password: password }
    // };

    try {

      const {data} = await api.post("auth", { email: email, password: password }, { 'Content-Type': 'application/json'})
      const {token} = data

      console.log(token)

      localStorage.setItem("token", token)

    } catch (error) {
      console.log(error.message)
    }

  }



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
        </div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <img
                  src="https://cdn.discordapp.com/attachments/867424752222470152/892527803004764201/iconeFormind.png"
                  className="img-fluid"
                  style={alignImg}
                  alt="..."
                />
                <CardBody className="px-lg-5 py-lg-3">
                  <div className="text-center text-muted mb-4">
                    <small>Entrar com credenciais</small>
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
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
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Me lembrar</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Criar uma nova conta</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
    <SimpleFooter />
  </>
}

export default Login;
