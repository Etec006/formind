import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import "../../assets/css/styles-design-system.css";

const alignImg = {
    margin: 'auto',
    width: '45%',
};

class Test2 extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
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
                                <div className="px-6 pt-lg-3">
                                    <div className="text-left mt-3">
                                        <h3 class="mb-0 text-darker font-weight-bold">
                                            Questão 1
                                        </h3>

                                        <div class="mt-3 py-5 border-bottom text-left">
                                            <h6 class="mb-0 text-darker font-wright-400">
                                                <strong class="font-weight-bold mr-lg-1">
                                                    (Enunciado)
                                                </strong>
                                                É possível afirmar que muitas expressões idiomáticas transmitidas pela cultura regional possuem autores anônimos, no entanto, algumas delas surgiram em consequência de contextos históricos bem curiosos.
                                            </h6>
                                        </div>

                                        <div class="mt-lg-5 mb-lg-5">
                                            <div class="text-darker">
                                                <strong>
                                                    <input class="mb-lg-3" type="radio" value="Alternativa 1" name="gender" /> Alternativa 1 <br />
                                                    <input class="mb-lg-3" type="radio" value="Alternativa 2" name="gender" /> Alternativa 2 <br />
                                                    <input class="mb-lg-3" type="radio" value="Alternativa 3" name="gender" /> Alternativa 3 <br />
                                                    <input class="mb-lg-3" type="radio" value="Alternativa 4" name="gender" /> Alternativa 4 <br />
                                                    <input class="mb-lg-3" type="radio" value="Alternativa 5" name="gender" /> Alternativa 5 <br />
                                                </strong>
                                            </div>
                                            <Button
                                                className="btn-icon btn-3 mb-lg-3 mt-lg-5 text-left"
                                                color="darker"
                                                type="button"
                                            >
                                                <span className="btn-inner--icon mr-1">
                                                    <i className="ni ni-send" />
                                                </span>
                                                <span className="btn-inner--text">Enviar Respostas</span>
                                            </Button>
                                        </div>
                                        <div class="mt-lg-5 mb-lg-5">
                                            <div class="mt-4 py-5 border-top text-left">
                                                <h6 class="mb-0 text-darker font-wright-400">
                                                    <strong class="font-weight-bold mr-lg-1">
                                                        Mapa de Questões
                                                    </strong>
                                                </h6>
                                                <div className="inlineblockdiv">
                                                    <h6 class="mt-lg-2 text-darker font-wright-400">
                                                        <a href="test1">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">1</span>
                                                            </Button>
                                                        </a>
                                                        <a href="test2">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">2</span>
                                                            </Button>
                                                        </a>
                                                        <a href="test3">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">3</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">4</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">5</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">6</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">7</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">8</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">9</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">10</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">11</span>
                                                            </Button>
                                                        </a>
                                                        <a href="#">
                                                            <Button
                                                                className="btn-icon btn-3 mt-lg-1"
                                                                color="gray"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--text font-weight-bolder font-italic">12</span>
                                                            </Button>
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    </section>
                </main>
                <SimpleFooter />
            </>
        );
    }
}

export default Test2;