import React from 'react';

import { Card, Col, Container, Row } from 'reactstrap';

import DemoNavbarDefault from 'components/Navbars/DemoNavbarDefault.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';

import api from '../../services/api.js';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { subjects: [], user: {} };
  }

  async componentDidMount() {
    const userId = window.localStorage.getItem('userId');
    const response = await api.get(`/user/${userId}`);

    this.setState({ user: response.data });

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    this.refs.main.scrollTop = 0;
  }

  render() {
    if (!this.state.subjects) {
      return <div>LOADING...</div>;
    }

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
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt={this.state.user.name}
                            className="rounded-circle"
                            src="https://cdn.discordapp.com/attachments/867424752222470152/892571975086661702/team-1-800x800.jpg"
                          />
                        </a>
                      </div>
                    </Col>

                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    />

                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Modulos</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Comentários</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Questões</span>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center mt-5">
                    <h3 />
                  </div>

                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>{this.state.user?.description}</p>
                      </Col>
                    </Row>
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

export default Profile;
