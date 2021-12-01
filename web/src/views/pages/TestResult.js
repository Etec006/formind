import React from 'react';
import { Badge, Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

import DemoNavbarDefault from 'components/Navbars/DemoNavbarDefault.js';
import CardsFooter from 'components/Footers/CardsFooter.js';
import '../../assets/css/styles-design-system.css';

import api from '../../services/api.js';
import { validateToken } from 'utils/authenticate';
import SimpleFooter from 'components/Footers/SimpleFooter';

class TestResult extends React.Component {
  constructor() {
    super();

    this.state = { test: {
        result: 0
    } };
  }

  async componentDidMount() {
    const testId = await this.props.match.params.testId
    const {data} = await api.get(`usertest/${testId}`)
    this.setState({test: data})
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
                                        Resultado
                                    </h3>

                                    <p>Nota: {this.state.test.result}</p>

                                    <div class="mt-3 py-5 border-bottom text-left">
                                        <div class="mt-lg-5 mb-lg-5">
                                            <Button
                                                className="btn-icon btn-3 mb-lg-3 mt-lg-5 text-left"
                                                color="darker"
                                                type="button"
                                                href="/principal"
                                            >
                                                <span className="btn-inner--icon mr-1">
                                                    <i className="ni ni-send" />
                                                </span>
                                                <span 
                                                    className="btn-inner--text"
                                                >Sair</span>
                                            </Button>
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

export default TestResult;
