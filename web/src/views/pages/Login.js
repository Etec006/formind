import { useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';

import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import iconeFormind from 'assets/img/logo/iconeFormind.png'
import '../../assets/css/styles-design-system.css';

import api from '../../services/api.js';
import { useHistory } from 'react-router-dom';
import { setToken } from 'utils/authenticate.js';
import { getToken } from 'utils/authenticate.js';

const alignImg = {
  margin: 'auto',
  width: '50%',
  padding: '10px',
};


const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [persistent, setPersistent] = useState(false);

  async function handleLogin() {
    const errors = [];
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    if(!email){
      errors.push("Email não informado")
      emailInput.classList.add("invalid")
      emailInput.classList.remove("valid")
    }else{
      emailInput.classList.remove("invalid")
      emailInput.classList.add("valid")
    }
    
    if(!password){
      errors.push("Senha não informada")
      passwordInput.classList.remove("valid")
      passwordInput.classList.add("invalid")
    }else{
      passwordInput.classList.remove("invalid")
      passwordInput.classList.add("valid")
    }

    if(errors[0]) return
     
    const { data, status } = await api.post('/auth', {
      email: email,
      password: password,
    })

    const { token } = data;

    if(status == 200 && token){
      setToken(token, persistent)
      history.push('/principal');
    }else{
      emailInput.classList.remove("valid")
      passwordInput.classList.remove("valid")
      emailInput.classList.add("invalid")
      passwordInput.classList.add("invalid")
    }
  }

  async function handlePersistent(){
    setPersistent(!persistent)
  }

  if(getToken()) history.push('/principal')

  return (
    <>
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
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative" id="email">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            className="form-control"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative" id="password">
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
                            onChange={e => setPassword(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                          checked={persistent}
                          onChange={handlePersistent}
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
                      href="/register-page"
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
  );
};

export default Login;
