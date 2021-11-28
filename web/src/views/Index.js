/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

// index page sections
import Hero from "./sections/Hero.js";
import Buttons from "./sections/Buttons.js";
import Inputs from "./sections/Inputs.js";
import CustomControls from "./sections/CustomControls.js";
import Menus from "./sections/Menus.js";
import Navbars from "./sections/Navbars.js";
import Tabs from "./sections/Tabs.js";
import Progress from "./sections/Progress.js";
import Pagination from "./sections/Pagination.js";
import Pills from "./sections/Pills.js";
import Labels from "./sections/Labels.js";
import Alerts from "./sections/Alerts.js";
import Typography from "./sections/Typography.js";
import Modals from "./sections/Modals.js";
import Datepicker from "./sections/Datepicker.js";
import TooltipPopover from "./sections/TooltipPopover.js";
import Carousel from "./sections/Carousel.js";
import Icons from "./sections/Icons.js";
import Login from "./sections/Login.js";
import Download from "./sections/Download.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />
          <Buttons />
          <Inputs />
          <section className="section">
            <Container>
              <CustomControls />
              <Menus />
            </Container>
          </section>
          <Navbars />
          <section className="section section-components">
            <Container>
              <Tabs />
              <Row className="row-grid justify-content-between align-items-center mt-lg">
                <Progress />
                <Pagination />
              </Row>
              <Row className="row-grid justify-content-between">
                <Pills />
                <Labels />
              </Row>
              <Alerts />
              <Typography />
              <Modals />
              <Datepicker />
              <TooltipPopover />
            </Container>
          </section>
          <Carousel />
          <Icons />
          <Login />
          <Download />
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Index;
