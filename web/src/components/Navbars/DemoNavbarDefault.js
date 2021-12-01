import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import "../../assets/css/styles-design-system.css";
import { Redirect } from 'react-router-dom';

import classnames from "classnames";

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
  UncontrolledTooltip,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { logout } from "utils/authenticate";
import { getRedirectLink } from "utils/get-redirect-link";
import api from "services/api";

const search = {
  border: "2px solid white",
  "border-radius": "12px"
};

const alignImg = {
  width: '50%',
  padding: '10px'
};



class DemoNavbarDefault extends React.Component {
  constructor() {
    super();

    this.state = { 
      collapseClasses: "",
      collapseOpen: false,
      search: '',
      redirect: false,
      user: {roles: [{name:''}]} 
    };
  }
  

  async componentDidMount() {
    const {data} = await api.get('user', {})
    this.setState({user: data.user})

    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }

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
    const handleLogout = () => {
      logout();
      this.setState({
        redirect: true
      })
    }

    const handleSearch = (event) => {
      event.preventDefault();
      this.setState({
        redirect: true
      })
    }

    const renderRedirect = () => {
      
      const search = this.state.search;

      if (this.state.redirect) {
        return <Redirect to={`/search/${search}`} />
      }
      
    }

    const producerOptions = () =>{
      const isProducer = this.state.user.roles.find(role => role.name == "PRODUCER")
      console.log(isProducer)
      if(!isProducer) return (
        <DropdownItem
          href={`${getRedirectLink("producer/test")}`}
        >
          Virar Produtor
        </DropdownItem>
      )
      return (<>
        <DropdownItem
          href={`${getRedirectLink("producer/test/selectcontent")}`}
        >
          Realizar Prova
        </DropdownItem>
        <DropdownItem
          href={`${getRedirectLink("producer/viewmodule")}`}
        >
          Meus Modulos
        </DropdownItem>
      </>)
    }

    return (
      <>
        {renderRedirect()}
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <a href="/">
                <img
                  src="https://cdn.discordapp.com/attachments/867424752222470152/892886428286062642/nomeFormind.png"
                  className="img-fluid"
                  style={alignImg}
                  alt="..."
                />
              </a>
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
                <div className="search-bar-input m-auto">
                  <form onSubmit={handleSearch}>
                    <FormGroup
                      className={classnames({
                        focused: this.state.searchAltFocused
                      })}
                    >
                      <InputGroup className="input-group-alternative input-module">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fa fa-search" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="font-weight-700"
                          placeholder="Search"
                          type="search"
                          value={this.state.search}
                          onFocus={e => this.setState({ searchAltFocused: true })}
                          onBlur={e => this.setState({ searchAltFocused: false })}  
                          onChange={e => this.setState({search: e.target.value})}
                        />
                      </InputGroup>
                    </FormGroup>
                  </form>
                </div>
                <Nav className="ml-lg-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="nav-link-icon">
                      <i className="ni ni-circle-08 ni-large" />
                      <span className="nav-link-inner--text d-lg-none">
                        Settings
                      </span>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="navbar-default_dropdown_1"
                      right
                    >
                      <DropdownItem
                        href={`${getRedirectLink("perfil")}`}            
                      >
                        Perfil
                      </DropdownItem>
                      {producerOptions()}
                      <DropdownItem divider />
                      <DropdownItem
                        onClick={handleLogout}
                        href="/"
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
