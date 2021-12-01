import React from "react";

// reactstrap components
import {
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

import api from "../../services/api.js";
import { getUploadUrl } from "utils/get-upload-url.js";

const playerimg = {
  width: '40%',
};

const alignImg = {
  margin: 'auto',
  width: '45%',
};

class Search extends React.Component {

  constructor() {
    super();
    this.state = { modules: [], search: '' };
  }

  async componentDidMount() {
    const name = await this.props.match.params.name

    this.setState({search: name})

    await api.get(`module/search/${this.state.search}`, [])
      .then(response => {
        this.setState({ modules: response.data })

      });
  }

  async componentDidUpdate(){
    const name = await this.props.match.params.name

    if(this.state.search != this.props.match.params.name && this.state.search){
      this.setState({search: name})
  
      await api.get(`module/search/${this.state.search}`, [])
        .then(response => {
          this.setState({ modules: response.data })
  
        });
    }
  }

  render() {
    if (!this.state.modules) return <h1> - NÃO CARREGADO - </h1>

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
                    <Col class="border" lg="7">
                      {this.state.modules.map((module) => {
                        return <a href={`/modulo/${module.id}`}>
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

export default Search;