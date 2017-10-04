import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import YouTube from 'react-youtube';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import email from 'emailjs';


import imgPizarra from '../img/backgroundLanding.jpg';
import imgRuta5 from '../img/ruta5.jpg';
import imgInacap from '../img/logo-inacap.png';
import imgCentro from '../img/centroUc.jpg';
import imgCorfo from '../img/corfo.png';

import landingFont from '../AvenirLTStd-Black.ttf';

// import email from './email';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { width, height } = this.props;
    return (
      <div style={{ fontFamily: landingFont }}>
        <div style={{ backgroundImage: `url(${imgPizarra})`, backgroundSize: 'cover', backgroundPosition: 'left bottom', height: height * 0.8 }} >
          <Col md={6} mdOffset={3} xs={8} xsOffset={2} style={{ paddingTop: height * 0.2 }}>
            <h2 className="animated fadeInUp" style={{ color: 'white', textAlign: 'center', fontSize: width > 900 ? 65 : 25 }}>Que el apoyo para tus estudiantes no llegue tarde!</h2>
            <p className="animated fadeInUp" style={{ color: 'white', textAlign: 'center', fontSize: width > 900 ? 32 : 20 }}>Kimche es la forma más fácil de hacer gestión escolar basada en datos - y obtener resultados</p>
          </Col>
        </div>
        <div style={{ marginTop: '5%' }}>
          <Row style={{ alignItems: 'center' }}>
            <Col mdOffset={2} md={5} xs={12}>
              <center>
                <YouTube
                  videoId="c2R9TwceJS8"
                  opts={{
                    width: width > 900 ? width * 0.4 : width * 0.8,
                    height: width > 900 ? width * ((0.4 * 9) / 16) : width * ((0.8 * 9) / 16),
                  }}
                />
              </center>
            </Col>
            <Col md={3} xs={10} xsOffset={1} style={{ marginTop: width < 900 && 20 }}>
              <center><h2>Transforma la información de tu colegio en impacto</h2></center>
              <center><p style={{ fontStyle: 'italic', fontSize: 20 }}>Las prioridades están claras, Kimche enfoca el trabajo de los profesionales de la escuela en aquellos alumnos que más lo necesitan.</p></center>
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: '5%' }}>
          <center style={{ paddingBottom: 20 }}><h1>Las mejores decisiones se toman con información a tiempo</h1></center>
          <div className="animated fadeInUp" >
            <Col md={10} mdOffset={1} >
              <Row>
                <Col md={4} xs={12} >
                  <Paper zDepth={3}>
                    <div style={{ margin: '10%', minHeight: height * 0.25, padding: '2%' }}>
                      <center><h3>Sistema Integrado</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>No importa que sistema de gestión utilizas, no debes cambiar tu herramienta administrativa actual. Kimche opera con cualquiera de ellas.</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={4} xs={12} >
                  <Paper zDepth={3}>
                    <div style={{ margin: '10%', minHeight: height * 0.25, padding: '2%'  }}>
                      <center><h3>Información en Movimiento</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>Visualización reduce el tiempo de análisis de la información para pasar rápidamente al diseño de soluciones.</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={4} xs={12} >
                  <Paper zDepth={3}>
                    <div style={{ margin: '10%', minHeight: height * 0.25, padding: '2%'  }}>
                      <center><h3>Gestión Colaborativa</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>Coordinamos los esfuerzos de los profesionales integrando responsabilidades en casos de alto riesgo.</p>
                    </div>
                  </Paper>
                </Col>
              </Row>
            </Col>
          </div>
        </div>
        <div style={{ marginTop: '5%' }}>
          <center><h1>Innovando juntos en Educación</h1></center>
          <center><p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20, color: 'gray' }}>Redes de colaboración que llevan lo mejor de la innovación al aula.</p></center>
          <div>
            <Col md={8} mdOffset={2} xs={12}>
              <Row style={{ marginTop: '10%', marginBottom: width > 900 ? '10%' : '5%', justifyContent: 'center', alignItems: 'center' }}>
                <Col md={3} xs={6}><img alt="dadas" src={imgCentro} style={{ width: '100%' }} /></Col>
                <Col md={3} xs={6}><img alt="dadas" src={imgCorfo} style={{ width: '100%' }} /></Col>
                <Col md={3} xs={6}><img alt="dadas" src={imgRuta5} style={{ width: '100%' }} /></Col>
                <Col md={3} xs={6}><img alt="dadas" src={imgInacap} style={{ width: '100%' }} /></Col>
              </Row>
            </Col>
          </div>
        </div>
        <div style={{ marginTop: '10%', marginBottom: '5%' }}>
          <center><h2>¡ Trabajemos Juntos !</h2></center>
          <center><p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20, color: 'gray' }}>Conversemos sobre el impacto que ha generado Kimche y cómo mejorará los indicadores de gestión de tu escuela.</p></center>
          <form onSubmit={e => this.login(e)}>
            <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
              <Paper zDepth={3}>
                <Row around="md" >
                  <Col md={4} style={{ backgroundColor: 'rgba(44, 62, 80,1.0)', color: 'white', textAlign: 'center', padding: 25 }}>
                    <h3>Ubicación</h3>
                    <hr />
                    <p>Centro de Innovación UC Anacleto Angelini</p>
                    <p>Av. Vicuña Mackenna 4860, Macul, Santiago, Chile</p>
                    <GettingStartedGoogleMap containerElement={<div style={{ width: '100%', height: 200, marginBottom: 15 }} />} mapElement={<div style={{ width: '100%', height: 200 }} />} />
                    <a href="mailto:info@kimche.co?Subject=Hola%20Kimche" >info@kimche.co</a>
                  </Col>
                  <Col md={8} style={{ padding: 25, backgroundColor: '#EFEFEF' }}>
                    <h3>Contáctanos</h3>
                    <hr />
                    <form method="POST" action="http://formspree.io/lucas@kimche.co">
                      <TextField type="email" name="_replyto" hintText="Tu email" floatingLabelText="Mail de contacto" onChange={(event, mail) => this.setState({ mail })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                      <TextField name="nombre" hintText="Tu nombre" floatingLabelText="Nombre" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                      <TextField name="Institucion educacional" hintText="Tu Institución educacional" floatingLabelText="Institución educacional" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                      <TextField name="Mensaje" multiLine hintText="Escribe tu pregunta..." floatingLabelText="Que te gustaria saber?" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                      <RaisedButton type="submit" label="Enviar" primary style={{ align: 'right' }} />
                    </form>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </form>
        </div>
      </div>
    );
  }
}

const GettingStartedGoogleMap = withGoogleMap(() => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: -33.497905, lng: -70.615267 }} >
    <Marker position={{ lat: -33.497905, lng: -70.615267 }} />
  </GoogleMap>
));
