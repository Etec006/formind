import React from 'react';
import { Badge, Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

import DemoNavbarDefault from 'components/Navbars/DemoNavbarDefault.js';
import CardsFooter from 'components/Footers/CardsFooter.js';
import '../../assets/css/styles-design-system.css';

import api from '../../services/api.js';
import { validateToken } from 'utils/authenticate';

class Principal extends React.Component {
  constructor() {
    super();

    this.state = { modules: [] };
  }

  async componentDidMount() {
    const isLogged = await validateToken()

    if(!isLogged) this.props.history.push("/");

    await api.get('modules', []).then(response => {
      this.setState({ modules: response.data });
    });

    console.log(this.state.modules);
  }

  navigateOnDetail = moduleId => {
    this.props.history.push(`/modulo/${moduleId}`);
  };

  render() {

    return (
      <>
        <DemoNavbarDefault />

        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                        Bem vindo, usuário{''}
                        <span>Verifique seu progresso.</span>
                      </h1>
                      <p className="lead text-white mb-lg-5">
                        Temos vários cursos a sua disposição, escolha o que mais
                        lhe agradar!.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>

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
            {/* 1st Hero Variation */}
          </div>

          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    {this.state.modules.map(module => {
                      return (
                        <Col lg="4">
                          <Card className="card-lift--hover shadow border-0" style={{margin: '12px'}}>
                            <CardBody className="py-5">
                              <h6 className="text-primary text-uppercase">
                                {module.name}
                              </h6>
                              <p className="description mt-3">
                                {module.concept}
                              </p>
                              <div>
                                <Badge color="primary" pill className="mr-1">
                                  {module.subject.name}
                                </Badge>
                              </div>
                              <Button
                                className="mt-4"
                                color="primary"
                                onClick={() => this.navigateOnDetail(module.id)}
                              >
                                Saiba mais
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className=""></section>
          <section className="section">
            <Container></Container>
          </section>
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Principal;
