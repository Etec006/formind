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

// core components
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import "../../assets/css/styles-design-system.css";
import api from "services/api";
import { getRedirectLink } from "utils/get-redirect-link";

const playerimg = {
  width: '40%',
};

const alignImg = {
  width: '60%',
};

class TestSelectContent extends React.Component {
  constructor(){
    super();
    this.state = {
      selectArea: '',
      selectSubject: '',
      area: { subjects: []},
      areas: []
    }
  }

  async componentDidMount() {
    const {data} = await api.get('areas', [])
    this.setState({areas: data})

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  async componentDidUpdate(){
      if(this.state.selectArea != this.state.area.id && this.state.selectArea){
        const {data} = await api.get(`area/${this.state.selectArea}`, {})
        this.setState({area: data})
      }
  }

  render() {
    const handleSeachTest = () =>{
      const errors = [];
      const areaInput = document.getElementById("area")
      const subjectInput = document.getElementById("subject")
      if(!this.state.selectArea){
        errors.push("Área não informada")
        areaInput.classList.add("is-invalid")
      }else{
        areaInput.classList.remove("is-invalid")
        areaInput.classList.add("is-valid")
      }
      if(!this.state.selectSubject){
        errors.push("Matéria não informada")
        subjectInput.classList.add("is-invalid")
      }else{
        subjectInput.classList.remove("is-invalid")
        subjectInput.classList.add("is-valid")
      }
      if(!errors[0]) this.props.history.push(`/producer/test/${this.state.selectSubject}`); 
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
                <Container>
                  <Row className="row-grid row p-lg-5">
                    <Col class="border" lg="6">
                      <div className="">
                        <h5 className="text-darker"> Deseja produzir que tipo de conteúdo?</h5>
                        <div className="pt-lg-4">
                          <select 
                            className="pl-lg-2 pr-lg-9 pt-lg-1 pb-lg-1 form-control" 
                            name="area" 
                            id="area"
                            style={{width: '100%'}}
                            onChange={e => this.setState({selectArea: e.target.value})}
                          >
                            <option value="" disabled selected>Área de Entendimento</option>
                            {this.state.areas.map(area => {
                              if(!area.subjects[0]) return
                              return <option value={area.id}>{area.name}</option>
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="">
                        <div className="pt-lg-2">
                          <select 
                            className="pl-lg-2 pr-lg-9 pt-lg-1 pb-lg-1 form-control" 
                            name="subject" 
                            id="subject" 
                            style={{width: '100%'}}
                            onChange={e => this.setState({selectSubject: e.target.value})}
                          >
                            <option value="" disabled selected>Matéria</option>
                            {this.state.area.subjects.map(subject => {
                              return <option value={subject.id}>{subject.name}</option>
                            })}
                          </select>
                        </div>
                        <Button
                          className="btn-icon btn-3 mt-lg-4"
                          color="gray"
                          type="button"
                          onClick={handleSeachTest}
                        >
                          <span className="btn-inner--text">Ir para a Prova</span>
                        </Button>
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

export default TestSelectContent;