import React from 'react';
import Parallax from 'react-springy-parallax';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { CardMedia, CardTitle } from 'material-ui/Card';
import YouTube from 'react-youtube';

import imgPizarra from '../img/backgroundLanding.jpg';
import imgReact from '../img/react.svg';
import imgAlert from '../img/alert.jpg';
import imgAnalysis from '../img/analysis.jpg';
import imgTeacher from '../img/teachers.jpg';
import imgInter from '../img/interOperadidad.jpg';
import imgEducationApp from '../img/educationApp.jpg';
import imgEducationIntegration from '../img/educationIntegration.jpg';
import imgEducationFollow from '../img/educationFollow.jpg';

export default class extends React.Component {
  render() {
    const { width } = this.props;
    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={8} scrolling style={{ backgroundColor: '#E9E9E9' }}>
        <Parallax.Layer offset={0} speed={1} style={{ backgroundImage: `url(${imgPizarra})`, backgroundSize: 'cover' }} />

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
          <center><h1>Descubre la gestion preventiva</h1></center>
          <center><p style={{ paddingBottom: 40, fontStyle: 'italic', fontSize: 20 }}>~ La nueva forma de coordinar las acciones de tu escuela ~</p></center>
        </Parallax.Layer>
        <Parallax.Layer offset={1.15} speed={1.5} >
          <Row around="md" style={{ margin: '2%' }}>
            <Col xs={10} xsOffset={2} md={4} mdOffset={0} >
              <Paper zDepth={3} style={{ marginLeft: '1%' }}>
                <CardMedia
                  overlay={<CardTitle title="Alerta Temprana" subtitle="Detecta alumnos en riesgo en el momento adecuado, para prevenir un mal desempeño." />}
                >
                  <img alt="dada" src={imgAlert} style={{ display: 'flex', height: '100%' }} />
                </CardMedia>
              </Paper>
            </Col>
            <Col xs={10} xsOffset={2} md={4} mdOffset={0} />
            <Col xs={10} xsOffset={2} md={4} mdOffset={0} style={{ marginRighe: '1%' }}>
              <Paper zDepth={3} >
                <CardMedia
                  overlay={<CardTitle title="Apoyo Incremental" subtitle="Integra el esfuerzo de los profesores en aquellos niños que más lo necesitan." />}
                >
                  <img alt="dada" src={imgTeacher} />
                </CardMedia>
              </Paper>
            </Col>
          </Row>
        </Parallax.Layer>
        <Parallax.Layer offset={1.25} speed={-0.2} >
          <Row around="md">
            <Col xs={10} xsOffset={2} md={4} mdOffset={0} />
            <Col xs={10} xsOffset={2} md={4} mdOffset={0} >
              <Paper zDepth={3}>
                <CardMedia
                  overlay={<CardTitle title={<center style={{ fontSize: 26 }}>Análisis personalizado</center>} subtitle={<p style={{ color: 'white' }}>Libera la carga docente, con el envío de información práctica para cada profesor.</p>} />}
                >
                  <img alt="dada" src={imgAnalysis} style={{ display: 'flex', height: '100%' }} />
                </CardMedia>
              </Paper>
            </Col>
            <Col xs={10} xsOffset={2} md={4} mdOffset={0} />
          </Row>
        </Parallax.Layer>
        <Parallax.Layer offset={2.1} speed={0} >
          <center style={{ paddingBottom: 20 }}><h1>Las mejores decisiones se toman con informacon a tiempo</h1></center>
          <div className="animated fadeInUp" style={{ margin: 20 }}>
            <Col md={10} mdOffset={1} >
              <Paper zDepth={3}>
                <Row around="md">
                  <Col md={6}>
                    <CardMedia>
                      <img alt="dada" src={imgInter} style={{ display: 'flex', height: '100%' }} />
                    </CardMedia>
                  </Col>
                  <Col md={6}>
                    <div style={{ margin: '10%' }}>
                      <center><h3>Inter operabilidad</h3></center>
                      <hr style={{ borderTop: '5px solid rgba(52, 152, 219,0.4)' }} />
                      <p>No importa que sistema de gestion utilizas, no debes cambiar tu herramienta administrativa actual. Kimche opera con cualquiera de ella</p>
                    </div>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </div>
          <div className="animated fadeInUp" style={{ margin: 20 }}>
            <Col md={10} mdOffset={1} >
              <Paper zDepth={3}>
                <Row around="md">
                  <Col md={6}>
                    <div style={{ margin: '10%' }}>
                      <center><h3>Sistema de alerta</h3></center>
                      <hr style={{ borderTop: '5px solid rgba(52, 152, 219,0.4)' }} />
                      <p>Kimche monitorea continuamente la informacion de cada alumno para anticipar casos de riesgo escolar, que generalmente son identificados al final del semestre</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationApp} style={{ display: 'flex', height: '100%' }} />
                    </CardMedia>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </div>
          <div className="animated fadeInUp" style={{ margin: 20 }}>
            <Col md={10} mdOffset={1} >
              <Paper zDepth={3}>
                <Row around="md">
                  <Col md={6}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationIntegration} style={{ display: 'flex', height: '100%' }} />
                    </CardMedia>
                  </Col>
                  <Col md={6}>
                    <div style={{ margin: '10%' }}>
                      <center><h3>Recomendación</h3></center>
                      <hr style={{ borderTop: '5px solid rgba(52, 152, 219,0.4)' }} />
                      <p>La integración de toda la información del colegio permite generar recomendaciones personalizadas por alumno, que faciliten la acción efectiva.</p>
                    </div>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </div>
          <div className="animated fadeInUp" style={{ margin: 20 }}>
            <Col md={10} mdOffset={1} >
              <Paper zDepth={3}>
                <Row around="md">
                  <Col md={6}>
                    <div style={{ margin: '10%' }}>
                      <center><h3>Seguimiento</h3></center>
                      <hr style={{ borderTop: '5px solid rgba(52, 152, 219,0.4)' }} />
                      <p>Cada alerta queda registrada para poder observar la evaluación del curso y de cada estudiante con el tiempo</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <CardMedia>
                      <img alt="dada" src={imgEducationFollow} style={{ display: 'flex', height: '100%' }} />
                    </CardMedia>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </div>
          <center><h2>Descubrenos</h2></center>
          <hr />
          <center>
            <YouTube
              videoId="c2R9TwceJS8"
              opts={{
                width: width * 0.6,
                height: width * (0.6 * 9 / 16),
              }}
            />
          </center>
          <center><h2>Instagram/BLOG</h2></center>
          <hr />
          <center><h2>Nosotros</h2></center>
          <hr />
          <center><h2>Formulario</h2></center>
          <hr />
          <center><h2>Footer</h2></center>
          <hr />
        </Parallax.Layer>
        {/* <Parallax.Layer offset={1} speed={1} style={{ backgroundColor: 'rgba(236, 240, 241,1.0)' }} /> */}
        {/* <Parallax.Layer offset={2} speed={0} style={{ backgroundColor: '#805E73' }} /> */}
        {/* <Parallax.Layer offset={3} speed={0} style={{ backgroundColor: '#87BCDE' }} /> */}
      </Parallax>
    );
  }
}
