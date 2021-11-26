import { useState, useEffect } from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import api from "../../services/api.js";
import { getUploadUrl } from "utils/get-upload-url.js";

const alignImg = {
  margin: 'auto',
  width: '45%',
};

const Component = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language ?? null} style={docco} className="text-darker">
      {value ?? ""}
    </SyntaxHighlighter>
  );
};

const Session = (props) => {

  const [input, setInput] = useState(null);
  const [session, setSession] = useState({});

  const id = props.match.params.id;

  useEffect(function () {
    api.get(`session/${id}`, {})
      .then(response => {
        setSession(response.data)
      });
  }, []);

  console.log(session);

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
            <div className="px-6 pt-lg-3">
              <div className="text-left mt-5">
                <h3 className="mb-0 text-darker font-weight-bold">
                  {session?.name}
                </h3>

                <div className="mt-lg-4">
                  <img
                    src={getUploadUrl(session.thumbnail?.key)}
                    className="img-fluid shadow"
                    style={alignImg}
                    alt="..."
                  />
                </div>

                <div className="mt-lg-4 border-top border-bottom text-left">
                  <p className="mb-0 text-darker font-wright-400">
                    <ReactMarkdown children={session?.content}
                      className="markdown text-darkerer "
                    />
                  </p>
                </div>
                <Row>
                  <div className="mt-lg-4 mb-lg-4">
                    <h5 className="text-darker font-weight-bold">
                      Questão 1
                    </h5>
                    <p className="text-darker font-wright-400">
                      <strong className="font-weight-bold mr-lg-1">
                        (Enunciado)
                      </strong>
                      Curabitur iaculis facilisis ipsum eget varius.
                      Aliquam hendrerit nulla placerat lorem pellentesque,
                      sit amet pellentesque ex luctus.
                    </p>
                    <div className="text-darker">
                      <strong>
                        <input className="mb-lg-3" type="radio" value="Alternativa 1" name="gender" /> Alternativa 1 <br />
                        <input className="mb-lg-3" type="radio" value="Alternativa 2" name="gender" /> Alternativa 2 <br />
                        <input className="mb-lg-3" type="radio" value="Alternativa 3" name="gender" /> Alternativa 3 <br />
                        <input className="mb-lg-3" type="radio" value="Alternativa 4" name="gender" /> Alternativa 4 <br />
                        <input className="mb-lg-3" type="radio" value="Alternativa 5" name="gender" /> Alternativa 5 <br />
                      </strong>
                    </div>
                    <Button
                      className="btn-icon btn-3 mt-lg-4"
                      color="darker"
                      type="button"
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="ni ni-send" />
                      </span>
                      <span className="btn-inner--text">Enviar Respostas</span>
                    </Button>
                  </div>
                </Row>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </main>
    <SimpleFooter />
  </>
}

export default Session;