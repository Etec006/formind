import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import "../../assets/css/styles-design-system.css";

import api from "../../services/api.js";

import ModuleFrame from "assets/img/brand/module-frame.png";
import { file, moduleExpression } from "@babel/types";
import { deprecationHandler } from "moment";

const playerimg = {
  width: '40%',
};

const alignImg = {
  margin: 'auto',
  width: '45%',
};

const Component = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={docco}>
      {value}
    </SyntaxHighlighter>
  );
};

const EditModule = (props) => {

  const [input, setInput] = useState(null);
  const [module, setModule] = useState();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const moduleid = props.match.params.id;

  const inputFilesRef = useRef(null); 

  function handleFile(e) {

    console.log(e.target.files, "$$$$");
    console.log(e.target.files[0], "$$$$");

    let file = e.target.files[0]

    setFile({ file: file })

  }

  function handleUpload(e) {

    console.log(file, "THE STATE ---- $$$$")

    let file = file

    let formdata = new FormData()

    formdata.append('image', file)
    formdata.append('name', "Teste Imagem")

  }

  function handleAddNewSession() {

    console.log(file.file);

    const form = new FormData();
    form.append("name", name);
    form.append("module", moduleid);
    form.append("content", content);
    form.append("thumbnail", file.file);

    const options = {
      method: 'POST',
      url: 'http://localhost:3333/session',
      headers: { 'Content-Type': 'multipart/form-data;' },
      data: form
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  function handleEditModule() {

    const form = new FormData();
    form.append("name", name);
    form.append("module", moduleid);
    form.append("content", content);
    form.append("thumbnail", file.file);

    const options = {
      method: 'POST',
      url: 'http://localhost:3333/session',
      headers: { 'Content-Type': 'multipart/form-data;' },
      data: form
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }

  console.log(module);

  return <>
    <DemoNavbarDefault />
    <main className="profile-page">
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
                <Col class="pl-lg-3 pr-lg-3 inlineblockdiv" lg="6">
                  <div class="pt-lg-2">
                    <FormGroup>
                      <InputGroup className="input-group-alternative input-module">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="font-weight-700"
                          placeholder="Nome do Módulo"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <div className="">
                    <FormGroup>
                      <InputGroup className="input-group-alternative input-module description-module">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input
                          className="pl-lg-3 font-weight-700"
                          placeholder="Descrição do Módulo"
                          type="text"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </div>
                </Col>
                <Col class="pl-lg-3 inlineblockdiv" lg="6">
                  <div className="pl-lg-4 pt-lg-2">
                    <iframe width="560" height="315" style={{ width: "100%" }} src="https://www.youtube.com/embed/0aUEDxYjZg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                  <Row>
                    <input className="alignbutton-center inputhiden" ref={inputFilesRef} type="file" name="file" onChange={(e) => handleFile(e)} />
                    <Button
                      className="btn-icon btn-3 alignbutton-center"
                      color="gray"
                      type="button"
                      onClick={() => inputFilesRef?.current?.click()}
                    >
                      <span className="btn-inner--text">Fazer upload da imagem</span>
                    </Button>
                  </Row>
                </Col>
              </Row>
              <Row className="row-grid row mt--4 p-4 markdown-align border-top border-bottom">
                <textarea
                  autoFocus
                  className="textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <ReactMarkdown children={input}
                  className="markdown text-darkerer "
                />
              </Row>
              <Row>
                <div className="p-4">
                  <Button
                    className="btn-icon btn-3 mt-lg-4 alignbutton-center"
                    color="gray"
                    type="button"
                    onClick={handleAddNewSession}
                  >
                    <div className="text-darker">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      <span className="btn-inner--text text-darker">Adicionar Nova sessão</span>
                    </div>
                  </Button>
                </div>
              </Row>
            </Container>
          </Card>
        </Container>
      </section>
    </main>
    <SimpleFooter />
  </>
}

// class EditModule extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       session: [],
//       input: "",

//     };
//   }

//   componentDidMount() {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//     this.refs.main.scrollTop = 0;
//   }
//   state = {};

//   render() {
//     return (

//     );
//   }
// }

export default EditModule;