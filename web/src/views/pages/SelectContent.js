import React from "react";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import classnames from "classnames";

// core components
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import "../../assets/css/styles-design-system.css";

const playerimg = {
  width: '40%',
};

const alignImg = {
  width: '60%',
};

class SelectContent extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  state = {};
  render() {
    return (
      <>
        <DemoNavbarDefault />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <Container>
                  <Row className="row-grid row p-lg-5">
                    <Col class="border" lg="6">
                      <div className="">
                        <h5 className="text-darker"> Deseja produzir que tipo de conteúdo?</h5>
                        <div className="pt-lg-4">
                          <select className="pl-lg-2 pr-lg-9 pt-lg-1 pb-lg-1" name="area" id="area">
                            <option value="" disabled selected>Área de Entendimento</option>
                            <option value="Matematica">Matemática</option>
                            <option value="Portugues">Português</option>
                            <option value="Ingles">Inglês</option>
                            <option value="Historia">História</option>
                          </select>
                        </div>
                      </div>
                      <div className="">
                        <div className="pt-lg-2">
                          <select className="pl-lg-2 pr-lg-9 pt-lg-1 pb-lg-1" name="subject" id="subject">
                            <option value="" disabled selected>Matéria</option>
                            <option value="Matematica">Matemática</option>
                            <option value="Portugues">Português</option>
                            <option value="Ingles">Inglês</option>
                            <option value="Historia">História</option>
                          </select>
                        </div>
                        <Button
                          className="btn-icon btn-3 mt-lg-4"
                          color="gray"
                          type="button"
                        >
                          <span className="btn-inner--text">Ir para a Prova</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default SelectContent;