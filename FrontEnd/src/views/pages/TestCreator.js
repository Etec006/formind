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
  margin: 'auto',
  width: '45%',
};

class TestCreator extends React.Component {
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
                    <Col class="pl-lg-3 pt-lg-4 border text-left" lg="4">
                      <h6 class="text-darker">
                        Filtros de pesquisa personalizado
                      </h6>
                      <div class="pt-lg-2">
                        <FormGroup
                          className={classnames({
                            focused: this.state.searchAltFocused
                          })}
                        >
                          <InputGroup className="input-group-alternative mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-zoom-split-in" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Filtros"
                              type="text"
                              onFocus={e => this.setState({ searchAltFocused: true })}
                              onBlur={e => this.setState({ searchAltFocused: false })}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <h6 class="text-darker">
                        Categorias
                      </h6>
                      <div class="pt-lg-2">
                        <FormGroup
                          className={classnames({
                            focused: this.state.searchAltFocused
                          })}
                        >
                          <InputGroup className="input-group-alternative mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i class="ni ni-bullet-list-67" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Categorias"
                              type="text"
                              onFocus={e => this.setState({ searchAltFocused: true })}
                              onBlur={e => this.setState({ searchAltFocused: false })}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <h6 class="text-darker">
                        Tags
                      </h6>
                      <div class="text-darker">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio1"
                            name="custom-radio-1"
                            type="radio"
                          />
                          <label className="custom-control-label" htmlFor="customRadio1">
                            <span>Todas as Tags</span>
                          </label>
                        </div>
                      </div>
                      <div class="text-darker">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio2"
                            name="custom-radio-1"
                            type="radio"
                          />
                          <label className="custom-control-label" htmlFor="customRadio2">
                            <span>Matemática</span>
                          </label>
                        </div>
                      </div>
                      <div class="text-darker">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio3"
                            name="custom-radio-1"
                            type="radio"
                          />
                          <label className="custom-control-label" htmlFor="customRadio3">
                            <span>Português</span>
                          </label>
                        </div>
                      </div>
                      <div class="text-darker">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio4"
                            name="custom-radio-1"
                            type="radio"
                          />
                          <label className="custom-control-label" htmlFor="customRadio4">
                            <span>Química</span>
                          </label>
                        </div>
                      </div>
                      <div class="text-darker">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio5"
                            name="custom-radio-1"
                            type="radio"
                          />          
                          <label className="custom-control-label" htmlFor="customRadio5">
                            <span>Inglês</span>
                          </label>
                        </div>
                      </div>
                      <div class="text-darker">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio6"
                            name="custom-radio-1"
                            type="radio"
                          />
                          <label className="custom-control-label" htmlFor="customRadio6">
                            <span>Artes</span>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col class="border" lg="7">
                      <ul class="uldot inlineblockdiv pt-lg-3">
                        <img
                          src="https://i.imgur.com/8ywzGiD.png"
                          className="img-fluid shadow"
                          style={playerimg}
                          alt="..."
                        />
                        <div class="alignPlayer">
                          <p class="text-darker pl-lg-2 mb-2 font-weight-bolder">Curso de Matemática</p>
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Produtor: <a href="profile-page">Cleytu Rogerio</a></p>
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
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Produtor: <a href="profile-page">Cleytu Rogerio</a></p>
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
                          <p class="text-darker pl-lg-2 mb-0 font-weight-400">Produtor: <a href="profile-page">Cleytu Rogerio</a></p>
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

export default TestCreator;