import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import "../../assets/css/styles-design-system.css";

import api from "../../services/api.js";
import { booleanTypeAnnotation } from "@babel/types";

function ratingChanged() {

}

const alignImg = {
  width: '70%',
};

const playerimg = {
  width: '40%',
};

const Modulo = (props) => {

  const id = props.match.params.id

  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [module, setModule] = useState({});

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [subject, setSubject] = useState(null);
  const [producer, setProducer] = useState(null);

  // useEffect(function () {

  //   api.get(`module/${id}`, {})
  //     .then(response => {
  //       setModule({ module: response.data?.[0] ?? {} })
  //     });

  //   console.log(module);


  // })

  useEffect(function () {
    api.get(`module/${id}`, {})
      .then(response => {
        console.log(response)

        setModule(response.data)
      })
      
      .catch(() => {history.push("/home")})
      .finally(() => {setLoading(false)});

  }, []);

  console.log(module.name);

  if(loading){
    return <p> CARREGANDO FILHO, ESPERA!!!</p>
  }

  return <>
    <DemoNavbarDefault />
    <main className="modulo">
      <section className="section-profile-cover section-shaped">
        {/* Circles background */}
        <div className="shape shape-style-1 shape-default">
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
            viewBox="0 0 1000 100"
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
          <Card className="card-profile  shadow mt--200">
            <Container>
              <div className="row-grid justify-content-between align-items-center row py-5">
                <div class="col-lg-6 pl-lg-6">
                  <img
                    src="https://conhecimentocientifico.com/wp-content/uploads/2020/04/matematica-o-que-e-conceito-historia-e-importancia-2.jpg"
                    className="img-fluid shadow"
                    style={alignImg}
                    alt="..."
                  />
                </div>

                <div class="col-lg-6 text-left ">
                  <h5 class="mb-0 text-darker font-weight-bold ">
                    {module?.module?.name}
                  </h5>
                  <h6 class="mb-0 text-darker pt-lg-4 font-weight-400">{module?.module?.description}</h6>

                  <div className="inlineblockdiv pt-lg-2">
                    <p class="mr-1 text-darker font-weight-bold">4,7</p>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged()}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                    <h6 class="ml-2 text-darker font-weight-bolder">(251 classificações)</h6>
                  </div>

                  <div class="pt-lg-2">
                    <p class="text-darker font-weight-bolder">Criado por <a href="profile-page">{module?.module?.producer.name}</a></p>
                  </div><br />

                </div>
              </div>
            </Container>
            <Container>
              <div className="row-grid justify-content-between align-items-center row py-5">
                <div class="col-lg-6 text-left pl-lg-6">
                  <p class="text-darker">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis hendrerit eros. Donec tempus, est pharetra placerat facilisis, felis libero dapibus lectus, in posuere lacus odio ac mi. Nunc id consectetur dolor. Nunc sodales ullamcorper elit, ac condimentum est. Curabitur euismod pellentesque vulputate. Aliquam erat volutpat. Integer sed lectus et ante iaculis euismod. Nulla nec erat a justo pellentesque luctus ut a mi. Pellentesque aliquet neque vel arcu auctor ullamcorper. Nullam lacinia vitae nisl nec rutrum. Praesent commodo feugiat faucibus. Nam eget felis sed urna eleifend ullamcorad.</p>
                </div>
                <div class="col-lg-6 pr-lg-6 border-left">

                  <ul class="uldot ul-session">
                    {module?.module?.sessions.map((session) => (
                      <li key={session.id} className="li-clear">
                        <img
                          src="https://i.imgur.com/XxUkL9C.png"
                          className="img-fluid shadow"
                          style={playerimg}
                          alt={session.name}
                        />

                        <div class="alignPlayer pl-lg-2">
                          <p class="text-darker mb-0 font-weight-bolder">
                            {session.name}
                          </p>
                          <p class="text-darker ">
                            {session.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </Container>
          </Card>
        </Container>
      </section>
      <SimpleFooter />
    </main>
  </>
}

export default Modulo;