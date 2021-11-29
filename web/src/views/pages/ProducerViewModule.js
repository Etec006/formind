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


// core components
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import "../../assets/css/styles-design-system.css";
import { getToken } from "utils/authenticate";
import api from "services/api";
import { getUploadUrl } from "utils";

const playerimg = {
  width: '40%',
};

const alignImg = {
  margin: 'auto',
  width: '45%',
};

class ProducerViewModule extends React.Component {
  async componentDidMount() {

    const {data} = await api.get('user', {})

    this.setState({user: data.user})

    console.log(data);

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  state = {user: {modulesProduced: []}};
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
                            src={this.state.user.profile ? getUploadUrl(this.state.user.profile.key) : "https://cdn.discordapp.com/attachments/867424752222470152/892571975086661702/team-1-800x800.jpg"}
                          />
                        </a>
                        <a href="/creator">
                          <h5 class="text-darker font-weight-600 text-center mt--5 pt-lg-2 pb-lg-1">
                            {this.state.user.name}
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
                            href={"/producer/module/"}
                            size="sm"
                          >
                            CRIAR
                          </Button>
                        </div>
                      </ul>

                      {this.state.user.modulesProduced.map(module => {
                        return <a href={`/producer/module/${module.id}`}>
                          <ul class="uldot inlineblockdiv pt-lg-3">
                            <img
                              src={getUploadUrl(module?.image?.key)}
                              className="img-fluid shadow"
                              style={playerimg}
                              alt="..."
                            />
                            <div class="alignPlayer">
                              <p class="text-darker pl-lg-2 mb-2 font-weight-bolder">{module.name}</p>
                              <p class="text-darker pl-lg-2 mb-0 font-weight-400">{module.concept}</p>
                            </div>
                          
                        </ul>
                      </a>
                      })}
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

export default ProducerViewModule;