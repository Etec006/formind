import React from "react";
import Slider from "components/Slider";

import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import { createSolutionBuilder } from "typescript";

const course = [
  {
    id: 1,
    image: 'https://i.imgur.com/P00KbOD.jpg',
    imageBg: 'https://i.imgur.com/FhAPOaD.jpg',
    title: '1983'
  },
  {
    id: 2,
    image: 'https://i.imgur.com/ltXvrVS.jpg',
    imageBg: 'https://i.imgur.com/Q0e0GGu.jpg',
    title: 'Russian doll'
  },
  {
    id: 3,
    image: 'https://i.imgur.com/pImhf9V.jpg',
    imageBg: 'https://i.imgur.com/HoKfGC7.jpg',
    title: 'The rain',
  },
  {
    id: 4,
    image: 'https://i.imgur.com/vRfSOyn.jpg',
    imageBg: 'https://i.imgur.com/8vi0h7p.jpg',
    title: 'Sex education'
  },
  {
    id: 5,
    image: 'https://i.imgur.com/3cWa4OH.jpg',
    imageBg: 'https://i.imgur.com/ZYVdtCH.jpg',
    title: 'Elite'
  },
  {
    id: 6,
    image: 'https://i.imgur.com/f9aWyHB.jpg',
    imageBg: 'https://i.imgur.com/aJ21FYb.jpg',
    title: 'Black mirror'
  },
  {
    id: 7,
    image: 'https://i.imgur.com/P00KbOD.jpg',
    imageBg: 'https://i.imgur.com/FhAPOaD.jpg',
    title: '1983'
  },
  {
    id: 8,
    image: 'https://i.imgur.com/ltXvrVS.jpg',
    imageBg: 'https://i.imgur.com/Q0e0GGu.jpg',
    title: 'Russian doll'
  },
  {
    id: 9,
    image: 'https://i.imgur.com/pImhf9V.jpg',
    imageBg: 'https://i.imgur.com/HoKfGC7.jpg',
    title: 'The rain',
  },
  {
    id: 10,
    image: 'https://i.imgur.com/vRfSOyn.jpg',
    imageBg: 'https://i.imgur.com/8vi0h7p.jpg',
    title: 'Sex education'
  },
  {
    id: 11,
    image: 'https://i.imgur.com/3cWa4OH.jpg',
    imageBg: 'https://i.imgur.com/ZYVdtCH.jpg',
    title: 'Elite'
  },
  {
    id: 12,
    image: 'https://i.imgur.com/f9aWyHB.jpg',
    imageBg: 'https://i.imgur.com/aJ21FYb.jpg',
    title: 'Black mirror'
  }
];

class PrincipalSlider extends React.Component {
  render() {
    return (
        <>

      <div className="sliderzinho">
        <Slider>
          {course.map(movie => (
            <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
          ))}
        </Slider>
      </div>

        </>
    );
  }
}

export default PrincipalSlider;