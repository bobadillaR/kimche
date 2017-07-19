import React from 'react';
import Parallax from 'react-springy-parallax';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { CardMedia, CardTitle } from 'material-ui/Card';
import YouTube from 'react-youtube';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import nodemailer from 'nodemailer';

import imgPizarra from '../img/backgroundLanding.jpg';
import imgReact from '../img/react.svg';
import imgAlert from '../img/alert.jpg';
import imgAnalysis from '../img/analysis.jpg';
import imgTeacher from '../img/teachers.jpg';
import imgInter from '../img/interOperadidad.jpg';
import imgEducationApp from '../img/educationApp.jpg';
import imgEducationIntegration from '../img/educationIntegration.jpg';
import imgEducationFollow from '../img/educationFollow.jpg';
import imgTeamKimche from '../img/teamKimche.jpg';
import imgRuta5 from '../img/ruta5.jpg';
import imgCentro from '../img/centroUc.jpg';
import imgKimcheContact from '../img/kimcheContact.jpg';
import imgCorfo from '../img/corfo.png';

// import email from './email';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderDesktop() {
    const { width, height } = this.props;
    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={6} scrolling style={{ backgroundColor: '#E9E9E9', height: height - 60, width }}>
        <Parallax.Layer offset={0} speed={0} style={{ backgroundImage: `url(${imgPizarra})`, backgroundSize: 'cover', backgroundPosition: 'left bottom' }} />

        <Parallax.Layer offset={0.1} speed={-0.5} style={{ justifyContent: 'space-around', display: 'flex' }} >
          <img alt="react" src={imgReact} height={35} />
          <img alt="react" src={imgReact} height={30} style={{ marginTop: '5%' }} />
          <img alt="react" src={imgReact} height={20} style={{ marginBottom: '2%', marginLeft: '10%' }} />
          <img alt="react" src={imgReact} height={25} style={{ marginBottom: '2%', marginLeft: '10%' }} />
          <img alt="react" src={imgReact} height={20} style={{ marginBottom: '2%', marginLeft: '10%' }} />
        </Parallax.Layer>
        <Parallax.Layer offset={0.3} speed={-0.15} style={{ display: 'flex' }} >
          <Col md={6} mdOffset={3} xs={8} xsOffset={2}>
            <h2 className="animated fadeInUp" style={{ color: 'white', textAlign: 'center', fontSize: width > 900 ? '60' : '35' }}>Que el apoyo para tus estudiantes no llegue tarde!</h2>
          </Col>
        </Parallax.Layer>
        <Parallax.Layer offset={0.35} speed={-0.3} style={{ justifyContent: 'space-around', display: 'flex' }} >
          <img alt="react" src={imgReact} height={20} style={{ marginLeft: 5, marginTop: 35 }} />
          <img alt="react" src={imgReact} height={15} style={{ marginLeft: 5, marginTop: 35 }} />
          <img alt="react" src={imgReact} height={35} style={{ marginLeft: 35, marginTop: 0 }} />
        </Parallax.Layer>
        <Parallax.Layer offset={0.5} speed={0.6} style={{ justifyContent: 'space-around', display: 'flex' }} >
          <img alt="react" src={imgReact} height={20} style={{ marginLeft: 5, marginTop: 35 }} />
          <img alt="react" src={imgReact} height={35} style={{ marginLeft: 35, marginTop: 0 }} />
        </Parallax.Layer>
        <Parallax.Layer offset={0.7} speed={0.4} style={{ justifyContent: 'space-around', display: 'flex' }} >
          <img alt="react" src={imgReact} height={20} style={{ marginLeft: 5, marginTop: 35 }} />
          <img alt="react" src={imgReact} height={35} style={{ marginLeft: 35, marginTop: 0 }} />
          <img alt="react" src={imgReact} height={15} style={{ marginLeft: 10, marginTop: 15 }} />
          <img alt="react" src={imgReact} height={30} style={{ marginLeft: 25, marginTop: 10 }} />
        </Parallax.Layer>
        <Parallax.Layer offset={0.9} speed={2} style={{ justifyContent: 'space-around', display: 'flex' }} >
          <img alt="react" src={imgReact} height={20} style={{ marginLeft: 5, marginTop: 35 }} />
          <img alt="react" src={imgReact} height={30} style={{ marginLeft: 25, marginTop: 10 }} />
        </Parallax.Layer>

        <Parallax.Layer offset={1.1} speed={0} >
          <center><h2>Información que transforma</h2></center>
          <center><p style={{ fontStyle: 'italic', fontSize: 20 }}>~ Como hacemos el cambio realidad ~</p></center>
        </Parallax.Layer>
        <Parallax.Layer offset={1.2} speed={1} >
          <center>
            <YouTube
              videoId="c2R9TwceJS8"
              opts={{
                width: width * 0.6,
                height: width * ((0.6 * 9) / 16),
              }}
            />
          </center>
        </Parallax.Layer>

        <Parallax.Layer offset={2} speed={0} style={{ backgroundColor: 'rgba(52, 73, 94,1.0)' }} />
        <Parallax.Layer offset={2.2} speed={0} >
          <center><h1 style={{ color: 'white' }}>Descubre la gestion preventiva</h1></center>
          <center><p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20, color: 'white' }}>~ La nueva forma de coordinar las acciones de tu escuela ~</p></center>
        </Parallax.Layer>
        <Parallax.Layer offset={2.35} speed={1.5} >
          <Col md={10} mdOffset={1} >
            <Row around="md">
              <Col xs={10} xsOffset={2} md={4} mdOffset={0} >
                <Paper zDepth={3} style={{ marginLeft: '1%' }}>
                  <CardMedia
                    overlay={<CardTitle title={<center style={{ fontSize: 26 }}>Alerta Temprana</center>} subtitle={<center><p style={{ color: 'white', fontSize: 18 }}>Detecta alumnos en riesgo en el momento adecuado, para prevenir un mal desempeño.</p></center>} />}
                  >
                    <img alt="dada" src={imgAlert} style={{ display: 'flex', height: '100%' }} />
                  </CardMedia>
                </Paper>
              </Col>
              <Col xs={10} xsOffset={2} md={4} mdOffset={0} />
              <Col xs={10} xsOffset={2} md={4} mdOffset={0} style={{ marginRighe: '1%' }}>
                <Paper zDepth={3} >
                  <CardMedia
                    overlay={<CardTitle title={<center style={{ fontSize: 26 }}>Apoyo Incremental</center>} subtitle={<center><p style={{ color: 'white', fontSize: 18 }}>Integra el esfuerzo de los profesores en aquellos niños que más lo necesitan.</p></center>} />}
                  >
                    <img alt="dada" src={imgTeacher} />
                  </CardMedia>
                </Paper>
              </Col>
            </Row>
          </Col>
        </Parallax.Layer>
        <Parallax.Layer offset={2.35} speed={-0.2} >
          <Col md={10} mdOffset={1} >
            <Row around="md">
              <Col xs={10} xsOffset={2} md={4} mdOffset={0} />
              <Col xs={10} xsOffset={2} md={4} mdOffset={0} >
                <Paper zDepth={3}>
                  <CardMedia
                    overlay={<CardTitle title={<center style={{ fontSize: 26 }}>Análisis personalizado</center>} subtitle={<center><p style={{ color: 'white', fontSize: 18 }}>Libera la carga docente, con el envío de información práctica para cada profesor.</p></center>} />}
                  >
                    <img alt="dada" src={imgAnalysis} style={{ display: 'flex', height: '100%' }} />
                  </CardMedia>
                </Paper>
              </Col>
              <Col xs={10} xsOffset={2} md={4} mdOffset={0} />
            </Row>
          </Col>
        </Parallax.Layer>
        <Parallax.Layer offset={3.1} speed={0}>
          <center style={{ paddingBottom: 20 }}><h1>Las mejores decisiones se toman con informacon a tiempo</h1></center>
          <center><p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20 }}>~ Enterate de lo que hacemos ~</p></center>
        </Parallax.Layer>
        <Parallax.Layer offset={3.3} speed={1}>
          <div className="animated fadeInUp" >
            <Col md={10} mdOffset={1} >
              <Row>
                <Col md={3} xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgInter} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>Inter operabilidad</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>No importa que sistema de gestion utilizas, no debes cambiar tu herramienta administrativa actual. Kimche opera con cualquiera de ella</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={3} xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationApp} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>Sistema de alerta</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>Kimche monitorea continuamente la informacion de cada alumno para anticipar casos de riesgo escolar, que generalmente son identificados al final del semestre</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={3} xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationIntegration} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>RECOMENDACIÓN</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>La integración de toda la información del colegio permite generar recomendaciones personalizadas por alumno, que faciliten la acción efectiva.</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={3} xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationFollow} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>Seguimiento</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>Cada alerta queda registrada para poder observar la evaluación del curso y de cada estudiante con el tiempo</p>
                    </div>
                  </Paper>
                </Col>
              </Row>
            </Col>
          </div>
        </Parallax.Layer>
        <Parallax.Layer offset={4} speed={0} style={{ backgroundColor: 'white' }} />
        <Parallax.Layer offset={4.1} speed={0} >
          <center><h1>Atrevete a Innovar</h1></center>
          <center><p style={{ fontStyle: 'italic', fontSize: 20 }}>~ Equipo ~</p></center>
        </Parallax.Layer>
        <Parallax.Layer offset={4.2} speed={0.2} >
          <center><img alt="dada" src={imgTeamKimche} style={{ display: 'flex', height: height * 0.5 }} /></center>
        </Parallax.Layer>
        <Parallax.Layer offset={4.7} speed={-0.02} >
          <div>
            <Col md={8} mdOffset={2} xs={12}>
              <center><img alt="dadas" src={imgKimcheContact} style={{ margin: 20 }} /></center>
              <Row style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Col md={3} ><img alt="dadas" src={imgCentro} style={{ width: '100%' }} /></Col>
                <Col md={3}><img alt="dadas" src={imgCorfo} style={{ width: '100%' }} /></Col>
                <Col md={3} ><img alt="dadas" src={imgRuta5} style={{ width: '100%' }} /></Col>
              </Row>
            </Col>
          </div>
        </Parallax.Layer>
        <Parallax.Layer offset={5} speed={0} />
        <Parallax.Layer offset={5.1} speed={0} >
          <center><h2>Encuentranos</h2></center>
          <center><p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20 }}>~ Ponte en conctacto para saber mucho mas~</p></center>
        </Parallax.Layer>
        <Parallax.Layer offset={5.3} speed={-0.3} >
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
                  <Col md={8} style={{ padding: 25 }}>
                    <h3>Contactanos</h3>
                    <hr />
                    <TextField hintText="Tu nombre" floatingLabelText="Nombre" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                    <TextField hintText="Tu email" floatingLabelText="Mail de contacto" onChange={(event, mail) => this.setState({ mail })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                    <TextField hintText="Tu Institución educacional" floatingLabelText="Institución educacional o colegio" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                    <TextField multiLine hintText="Escribe tu pregunta..." floatingLabelText="Que te gustaria saber" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                    <RaisedButton onClick={() => console.log('send email')} label="Enviar" primary style={{ align: 'right' }} />
                  </Col>
                </Row>
              </Paper>
            </Col>
          </form>
        </Parallax.Layer>
      </Parallax>
    );
  }

  renderMobile() {
    const { width, height } = this.props;
    return (
      <div style={{ backgroundColor: '#E9E9E9' }}>
        <div style={{ backgroundImage: `url(${imgPizarra})`, backgroundSize: '100% 100%', backgroundPosition: 'left', height: height * 0.6, alignItems: 'center', display: 'flex' }} >
          <Col xs={10} xsOffset={1}>
            <h2 className="animated fadeInUp" style={{ color: 'white', textAlign: 'center', fontSize: 35 }}>Que el apoyo para tus estudiantes no llegue tarde!</h2>
          </Col>
        </div>
        <div style={{ height: height * 0.8, justifyContent: 'space-around', display: 'flex', flexDirection: 'column' }}>
          <center>
            <h2>Información que transforma</h2>
            <p style={{ fontStyle: 'italic', fontSize: 20 }}>~ Como hacemos el cambio realidad ~</p>
          </center>
          <center>
            <YouTube
              videoId="c2R9TwceJS8"
              opts={{
                width: width * 0.9,
                height: width * ((0.9 * 9) / 16),
              }}
            />
          </center>
        </div>

        <div style={{ backgroundColor: 'rgba(52, 73, 94,1.0)', paddingTop: '10%', paddingBottom: '10%' }} >
          <Col xs={10} xsOffset={1} >
            <center><h1 style={{ color: 'white' }}>Descubre la gestion preventiva</h1></center>
            <center><p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20, color: 'white' }}>~ La nueva forma de coordinar las acciones de tu escuela ~</p></center>
            <Paper zDepth={3} style={{ marginLeft: '1%' }}>
              <CardMedia
                overlay={<CardTitle title={<center style={{ fontSize: 26 }}>Alerta Temprana</center>} subtitle={<center><p style={{ color: 'white', fontSize: 18 }}>Detecta alumnos en riesgo en el momento adecuado, para prevenir un mal desempeño.</p></center>} />}
              >
                <img alt="dada" src={imgAlert} style={{ display: 'flex', height: '100%' }} />
              </CardMedia>
            </Paper>
          </Col>
          <Col xs={10} xsOffset={1} style={{ paddingTop: '5%', paddingBottom: '5%' }} >
            <Paper zDepth={3} >
              <CardMedia
                overlay={<CardTitle title={<center style={{ fontSize: 26 }}>Apoyo Incremental</center>} subtitle={<center><p style={{ color: 'white', fontSize: 18 }}>Integra el esfuerzo de los profesores en aquellos niños que más lo necesitan.</p></center>} />}
              >
                <img alt="dada" src={imgTeacher} style={{ display: 'flex', height: '100%' }} />
              </CardMedia>
            </Paper>
          </Col>
          <Col xs={10} xsOffset={1} >
            <Paper zDepth={3}>
              <CardMedia
                overlay={<CardTitle title={<center style={{ fontSize: 26 }}>Análisis personalizado</center>} subtitle={<center><p style={{ color: 'white', fontSize: 18 }}>Libera la carga docente, con el envío de información práctica para cada profesor.</p></center>} />}
              >
                <img alt="dada" src={imgAnalysis} style={{ display: 'flex', height: '100%' }} />
              </CardMedia>
            </Paper>
          </Col>
        </div>
        <div style={{ paddingTop: '10%', paddingBottom: '10%' }}>
          <center>
            <h1>Las mejores decisiones se toman con informacon a tiempo</h1>
            <p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20 }}>~ Enterate de lo que hacemos ~</p>
          </center>
          <div className="animated fadeInUp" >
            <Col xs={10} xsOffset={1} >
              <Row>
                <Col xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgInter} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>Inter operabilidad</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>No importa que sistema de gestion utilizas, no debes cambiar tu herramienta administrativa actual. Kimche opera con cualquiera de ella</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={3} xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationApp} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>Sistema de alerta</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>Kimche monitorea continuamente la informacion de cada alumno para anticipar casos de riesgo escolar, que generalmente son identificados al final del semestre</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={3} xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationIntegration} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>RECOMENDACIÓN</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>La integración de toda la información del colegio permite generar recomendaciones personalizadas por alumno, que faciliten la acción efectiva.</p>
                    </div>
                  </Paper>
                </Col>
                <Col md={3} xs={12} >
                  <Paper zDepth={3}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationFollow} style={{ display: 'flex', height: height * 0.2 }} />
                    </CardMedia>
                    <div style={{ margin: '10%', minHeight: height * 0.3 }}>
                      <center><h3>Seguimiento</h3></center>
                      <hr style={{ borderTop: '5px solid' }} />
                      <p style={{ textAlign: 'center' }}>Cada alerta queda registrada para poder observar la evaluación del curso y de cada estudiante con el tiempo</p>
                    </div>
                  </Paper>
                </Col>
              </Row>
            </Col>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', paddingTop: '10%', paddingBottom: '10%' }} >
          <center><h1>Atrevete a Innovar</h1></center>
          <center><p style={{ fontStyle: 'italic', fontSize: 20 }}>~ Equipo ~</p></center>
          <center><img alt="dada" src={imgTeamKimche} style={{ display: 'flex', height: height * 0.5, position: 'relative', right: '20%' }} /></center>
          <div>
            <Col xs={8} xsOffset={2}>
              <center><img alt="dadas" src={imgKimcheContact} style={{ margin: 20 }} /></center>
              <Row style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Col><img alt="dadas" src={imgCentro} style={{ width: '100%' }} /></Col>
                <Col><img alt="dadas" src={imgCorfo} style={{ width: '100%', marginTop: 30, marginBottom: 30 }} /></Col>
                <Col><img alt="dadas" src={imgRuta5} style={{ width: '100%' }} /></Col>
              </Row>
            </Col>
          </div>
        </div>
        <div style={{ paddingTop: '10%', paddingBottom: '10%' }}>
          <center><h2>Encuentranos</h2></center>
          <center><p style={{ fontStyle: 'italic', fontSize: 20 }}>~ Ponte en conctacto para saber mucho mas~</p></center>
          <form onSubmit={e => this.login(e)}>
            <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
              <Paper zDepth={3}>
                <div style={{ padding: 25 }}>
                  <h3>Contactanos</h3>
                  <hr />
                  <TextField hintText="Tu nombre" floatingLabelText="Nombre" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                  <TextField hintText="Tu email" floatingLabelText="Mail de contacto" onChange={(event, mail) => this.setState({ mail })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                  <TextField hintText="Tu Institución educacional" floatingLabelText="Institución educacional" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                  <TextField multiLine hintText="Escribe tu pregunta..." floatingLabelText="Que te gustaria saber" onChange={(event, name) => this.setState({ name })} fullWidth errorText={false} floatingLabelFixed floatingLabelStyle={{ color: 'rgba(44, 62, 80,1.0)', fontSize: 22 }} />
                  <RaisedButton onClick={() => console.log('send email')} label="Enviar" primary style={{ align: 'right' }} />
                </div>
                <div style={{ backgroundColor: 'rgba(44, 62, 80,1.0)', color: 'white', textAlign: 'center', padding: 25 }}>
                  <h3>Ubicación</h3>
                  <hr />
                  <p>Centro de Innovación UC Anacleto Angelini</p>
                  <p>Av. Vicuña Mackenna 4860, Macul, Santiago, Chile</p>
                  <GettingStartedGoogleMap containerElement={<div style={{ width: '100%', height: 200, marginBottom: 15 }} />} mapElement={<div style={{ width: '100%', height: 200 }} />} />
                  <a href="mailto:info@kimche.co?Subject=Hola%20Kimche" >info@kimche.co</a>
                </div>
              </Paper>
            </Col>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const { width } = this.props;
    if (width > 773) return this.renderDesktop();
    else return this.renderMobile();
  }
}

const GettingStartedGoogleMap = withGoogleMap(() => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: -33.497905, lng: -70.615267 }} >
    <Marker position={{ lat: -33.497905, lng: -70.615267 }} />
  </GoogleMap>
));
