import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useHistory } from 'react-router-dom';

import { Card, Container } from 'reactstrap';

import DemoNavbarDefault from 'components/Navbars/DemoNavbarDefault.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import '../../assets/css/styles-design-system.css';

import api from '../../services/api.js';
import { getUploadUrl } from '../../utils';
import { validateToken } from 'utils/authenticate';

function ratingChanged() {}

const alignImg = {
  width: '100%',
};

const playerimg = {
  width: '40%',
};

const Modulo = props => {
  const id = props.match.params.id;
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});

  useEffect(
    function () {
      api
        .get(`module/${id}`, {})
        .then(response => {
          console.log(response);

          setDetail(response.data);
        })

        .catch(() => {
          history.push('/home');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [history, id],
  );


  return (
    <>
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
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>

        <section className="section">
          <Container>
            <Card className="card-profile  shadow mt--200">
              <Container>
                <div className="row-grid justify-content-between align-items-center row py-5">
                  <div class="col-lg-6 pl-5">
                    <img
                      src={getUploadUrl(detail?.module?.image?.key)}
                      className="img-fluid shadow"
                      style={alignImg}
                      alt="..."
                    />
                  </div>

                  <div class="col-lg-6 text-left ">
                    <h5 class="mb-0 text-darker font-weight-bold ">
                      {detail?.module?.name}
                    </h5>
                    <h6 class="mb-0 text-darker pt-lg-3 font-weight-400">
                      {detail?.module?.concept}
                    </h6>

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

                      <h6 class="ml-2 text-darker font-weight-bolder">
                        (1 classificações)
                      </h6>
                    </div>

                    <div class="pt-lg-2">
                      <p class="text-darker font-weight-bolder">
                        Criado por{' '}
                        <Link to={`/perfil/${detail?.module?.producer.id}`}>
                          <a>{detail?.module?.producer.name}</a>
                        </Link>
                      </p>
                    </div>
                    <br />
                  </div>
                </div>
              </Container>

              <Container>
                <div className="row-grid justify-content-between row pb-lg-4">
                  <div
                    class="col-lg-6 text-left pl-lg-5"
                    dangerouslySetInnerHTML={{
                      __html: detail?.module?.description,
                    }}
                  />

                  <div class="col-lg-6 pr-lg-6 border-left" >
                    <ul class="uldot ul-session">
                      {detail?.module?.sessions.map(session => (
                        <a href={`/session/${session.id}`}>
                          <li key={session.id} className="li-clear">
                          <img
                            src={getUploadUrl(session.thumbnail.key)}
                            className="img-fluid shadow"
                            style={playerimg}
                            alt={session.name}
                          />

                          <div class="alignPlayer pl-lg-2">
                            <p class="text-darker mb-0 font-weight-bolder block-with-text">
                              {session.name}
                            </p>

                            <p class="text-darker block-with-text">{session.content}</p>
                          </div>
                        </li>
                        </a> 
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
  );
};

export default Modulo;
