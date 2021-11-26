import React from "react";

// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Button,
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
  margin: 'auto',
  width: '45%',
};

class ViewModule extends React.Component {
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
                  <Row className="row-grid row py-5 px-3">
                    <Col class="pl-lg-3 border " lg="3">
                      <div className="profile-image-creator">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src="https://cdn.discordapp.com/attachments/867424752222470152/892571975086661702/team-1-800x800.jpg"
                          />
                        </a>
                        <a href="/creator">
                          <h5 class="text-darker font-weight-600 text-center mt--5 pt-lg-2 pb-lg-1">
                            Cleytu Rogerio
                          </h5>
                        </a>
                      </div>
                      <div className="pt-lg-3 border-top">
                        <Button
                          className="text-darker"
                          color="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i class="ni ni-bold-right"></i> Conteúdo
                        </Button>
                        <Button
                          className="text-darker"
                          color="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i class="ni ni-bold-right"></i> Estatística
                        </Button>
                        <Button
                          className="text-darker"
                          color="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i class="ni ni-bold-right"></i> Comentários
                        </Button>
                      </div>
                    </Col>
                    <Col class="border" lg="9">
                      <ul class="uldot inlineblockdiv">
                        <h5 class="inlineblockdiv text-darker font-weight-700">
                          Seus Módulos
                        </h5>
                        <div className="pl-lg-9 float-right pb-3">
                          <Button
                            className="pl-lg-4 pr-lg-4"
                            color="default"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            size="sm"
                          >
                            CRIAR
                          </Button>
                        </div>
                      </ul>
                      <ul class="uldot inlineblockdiv pt-lg-3">
                        <img
                          src="https://i.imgur.com/8ywzGiD.png"
                          className="img-fluid shadow"
                          style={playerimg}
                          alt="..."
                        />
                        <div class="alignPlayer">
                          <p class="text-darker pl-lg-2 mb-2 font-weight-bolder">Curso de Matemática</p>
                          <br />
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Modulos: 12</p>
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Duração: 4hr 30m</p>
                        </div>
                      </ul>

                      <ul class="uldot inlineblockdiv">
                        <img
                          src="https://i.imgur.com/8ywzGiD.png"
                          className="img-fluid shadow"
                          style={playerimg}
                          alt="..."
                        />
                        <div class="alignPlayer">
                          <p class="text-darker pl-lg-2 mb-2 font-weight-bolder">Curso de Matemática</p>
                          <br />
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Modulos: 12</p>
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Duração: 4hr 30m</p>
                        </div>
                      </ul>

                      <ul class="uldot inlineblockdiv">
                        <img
                          src="https://i.imgur.com/8ywzGiD.png"
                          className="img-fluid shadow"
                          style={playerimg}
                          alt="..."
                        />
                        <div class="alignPlayer">
                          <p class="text-darker pl-lg-2 mb-2 font-weight-bolder">Curso de Matemática</p>
                          <br />
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Modulos: 12</p>
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Duração: 4hr 30m</p>
                        </div>
                      </ul>
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

export default ViewModule;