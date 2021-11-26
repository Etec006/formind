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
import ModuleFrame from "assets/img/brand/module-frame.png";
import { moduleExpression } from "@babel/types";

const playerimg = {
  width: '40%',
};

const alignImg = {
  margin: 'auto',
  width: '45%',
};

class EditSession extends React.Component {
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
                <div className="px-6 pt-lg-3">
                  <div className="text-left mt-5">
                    <h3 class="mb-0 text-darker font-weight-bold">
                      Nome da sessão
                    </h3>

                    <div class="mt-lg-4">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/0aUEDxYjZg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="mt-5 py-5 text-left">
                      <p class="mb-0 text-darker font-wright-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat elit id porttitor faucibus. Nunc eget consectetur tellus. Nullam vel malesuada mauris, ac euismod tortor. Fusce eros lorem, pellentesque in gravida lacinia, imperdiet non dui. Integer pellentesque aliquet enim. Ut egestas maximus mi, ut porta justo tempor cursus. Nam ac purus luctus, vulputate lectus sed, sodales nunc.
                      </p>
                    </div>
                    <div className="">
                      <FormGroup
                        className={classnames({
                          focused: this.state.searchAltFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative input-module description-module">
                          <InputGroupAddon addonType="prepend">
                          </InputGroupAddon>
                          <Input
                            className="pl-lg-3 font-weight-700"
                            placeholder="Descrição do Módulo"
                            type="text"
                            onFocus={e => this.setState({ searchAltFocused: true })}
                            onBlur={e => this.setState({ searchAltFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="pb-lg-4">
                        <Button
                          className="btn-icon btn-3 mt-lg-4 alignbutton-center"
                          color="gray"
                          type="button"
                        >
                          <div className="text-darker">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            <span className="btn-inner--text text-darker">Adicionar Nova sessão</span>
                          </div>
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

export default EditSession;