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

import lapis from "assets/img/logo/lapis.png"

// core components
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import "../../assets/css/styles-design-system.css";
import { getRedirectLink } from "utils/get-redirect-link";

const playerimg = {
  width: '40%',
};

const alignImg = {
  width: '60%',
};

class TestProd extends React.Component {
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
                  <Row className="row-grid row p-lg-4">
                    <Col class="border" lg="6">
                      <div className="row-grid justify-content-md-center row pt-lg-3">
                        <img
                          src={lapis}
                          className="img-fluid"
                          style={alignImg}
                          alt="..."
                        />
                      </div>
                    </Col>
                    <Col class="border" lg="6">
                      <div className="pt-lg-3">
                        <h4 className="pl-lg-2 text-darker font-weight-600">

                          Para se tornar um produtor, prossiga para a próxima etapa.
                          <br />  <br />  Deseja continuar ?

                        </h4>
                        <div>
                          <Button
                            className="btn-icon btn-3 ml-lg-2 mt-lg-4"
                            color="darker"
                            type="button"
                          >
                            <span className="btn-inner--icon mr-1">
                              <i className="ni ni-badge" />
                            </span>
                            <a href={getRedirectLink("producer/test/selectcontent")} className="text-white"> <span className="btn-inner--text">Começar</span> </a>
                          </Button>
                        </div>
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

export default TestProd;