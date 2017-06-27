import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import backgroundImage from '../img/backgroundLanding.jpg';

export default class LadingPage2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div>
        <Row>
          <Col xs={12} style={{ backgroundImage, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
            Texto de prueba
          </Col>
        </Row>
      </div>
    );
  }
}
