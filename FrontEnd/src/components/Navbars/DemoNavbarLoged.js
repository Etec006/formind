import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import "../../assets/css/styles-design-system.css";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

const alignImg = {
    width: '10%',
    padding: '10px'
  };

class DemoNavbarDefault extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
            <img
                        src="https://cdn.discordapp.com/attachments/867424752222470152/892886428286062642/nomeFormind.png"
                        className="img-fluid"
                        style={alignImg}
                        alt="..."
                    />
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Sobre Nós</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-single-copy-04" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              História
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Um pouco de como nós iniciamos está ideia.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-send" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Contato
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Quer nos dizer algo?, nos chame em nossos meios de contato.
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="ml-lg-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="nav-link-icon">
                      <i className="ni ni-notification-70 ni-large" />
                      <span className="nav-link-inner--text d-lg-none">
                        Settings
                      </span>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="navbar-default_dropdown_1"
                      right
                    > 
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Curso Ingles | Concluido
                      </DropdownItem >
                      <DropdownItem divider />
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Curso Portugues | Concluido
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Curso Matematica | Concluido
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="nav-link-icon">
                      <i className="ni ni-circle-08 ni-large"/>
                      <span className="nav-link-inner--text d-lg-none">
                        Settings
                      </span>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="navbar-default_dropdown_1"
                      right
                    >
                      <DropdownItem
                        href="profile-page"
                      >
                        Perfil
                      </DropdownItem>
                      <DropdownItem
                        href="modulos"
                      >
                        Modulos
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        href="home"
                      >
                        Sair
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbarDefault;
