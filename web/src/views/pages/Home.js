import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import CardsFooter from "components/Footers/CardsFooter.js";
import "../../assets/css/styles-design-system.css";

const alignImg = {  
    margin: 'auto',
    width: '50%',
    padding: '10px'
  };

class Home extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped shape-style-2 pb-250 home-large">
              <div className="shape shape-style-1 shape-default"/>
              <Container className="py-lg-md d-flex">
                <div className="col px-0 mt-auto mb-auto">
                    <img
                        src="https://cdn.discordapp.com/attachments/867424752222470152/892886428286062642/nomeFormind.png"
                        className="img-fluid"
                        style={alignImg}
                        alt="..."
                    /> <br/>
                    <img
                        src="https://cdn.discordapp.com/attachments/867424752222470152/892892324806398012/cabecaFormind.png"
                        className="img-fluid"
                        style={alignImg}
                        alt="..."
                    />
                </div>
                <div className="col px-1 mt-auto mb-auto">
                    <Col lg="10">
                      <p className="lead text-white">
                        Formind é uma plataforma de educação, que visa ajudar alunos que possuem dificuldades com "Aprender a Aprender".
                      </p>
                      <div className="btn-wrapper">
                      <Button
                            className="btn-icon mb-3 mb-sm-0"
                            color="white"
                            href="login-page"
                          >
                          <span className="btn-inner--icon">
                           <i class="fa fa-sign-in" aria-hidden="true"></i>
                          </span>
                          <span className="btn-inner--text">
                            Entrar
                          </span>
                        </Button>
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="white"
                          href="register-page"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-code" />
                          </span>
                          <span className="btn-inner--text">Cadastrar-se</span>
                        </Button>
                      </div>
                    </Col>
                </div>
              </Container>
            </section>
          </div>        
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Home;