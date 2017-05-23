import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './vendor/font-awesome/css/font-awesome.min.css';
import './css/agency.min.css';
import './vendor/bootstrap/css/bootstrap.css';


export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, userData } = this.props;
    return (
      <div>
        <nav className="navbar fixed-top navbar-toggleable-md navbar-inverse" id="mainNav">
          <div className="container">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fa fa-bars" />
            </button>
            <Link to="/">
              <img className="img-fluid d-block mx-auto" src={require('./img/logo.png')} alt="" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link">¿Qué ganas?</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">¿Cómo funciona?</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contacto</a>
                </li>
                <li className="nav-item">
                  <Link to={user ? userData.admin ? '/admin/messages' : '/main' : '/login'}>
                    <a className="nav-link">Entrar</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Información que transforma</div>
              <div className="intro-heading">K I M C H E</div>
              <a href="#services" className="btn btn-xl">¡empecemos!</a>
            </div>
          </div>
        </header>

        {/* services */}
        <section id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">¿Qué gana tu colegio?</h2>
                <h3 className="section-subheading text-muted">Kimche te apoya en los siguientes ámbitos.</h3>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fa fa-circle fa-stack-2x text-primary" />
                  <i className="fa fa-exclamation-triangle fa-stack-1x fa-inverse" />
                </span>
                <h4 className="service-heading">Alerta Temprana</h4>
                <p className="text-muted">Indentifica de forma preventiva casos de riesgo escolar priorizados por SEP y PIE.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fa fa-circle fa-stack-2x text-primary" />
                  <i className="fa fa-cog fa-spin fa-stack-1x fa-inverse" />
                </span>
                <h4 className="service-heading">Movimiento</h4>
                <p className="text-muted">Enfoca tu esfuerzo en acciones pedagógicas, nosotros hacemos el análisis por ti.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fa fa-circle fa-stack-2x text-primary" />
                  <i className="fa fa-users fa-stack-1x fa-inverse" />
                </span>
                <h4 className="service-heading">Gestión Colaborativa</h4>
                <p className="text-muted">Promueve un trabajo conjunto entre los profesionales de la escuela.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">¿Cómo funciona?</h2>
                <h3 className="section-subheading text-muted">Transformamos lo complejo en simple.</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <ul className="timeline">
                  <li>
                    <div className="timeline-image">
                      <img className="rounded-circle img-fluid" src={require('./img/about/1.png')} />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>Integración</h4>
                        <h4 className="subheading">Sistemas Actuales</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">La plataforma se integra con los sistemas de gestión de las escuelas para relacionar los datos de los alumnos.</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <img className="rounded-circle img-fluid" src={require('./img/about/2.jpg')} />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>Alertas</h4>
                        <h4 className="subheading">Análisis continuo</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">Calcula periódicamente el "ÍNDICE DE RIESGO KIMCHE ®" durante el año escolar, para anticipar casos de riesgo.</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-image">
                      <img className="rounded-circle img-fluid" src={require('./img/about/3.jpg')} />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>Comunicación</h4>
                        <h4 className="subheading">Personalizada por caso</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">Los resultados del análisis son priorizados por riesgo e informados a cada profesional según corresponda.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <img className="rounded-circle img-fluid" src={require('./img/about/4.jpg')}/>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>Feedback</h4>
                        <h4 className="subheading">Mejora continua</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">Una vez que reciben el caso, los usuarios responden "¿Por qué ocurrió?" y "¿Qúe acción tomó?" para revisar los casos en el consejo técnico.</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <a href="#contact">
                        <h4 style={{ color: 'rgb(256,256,256)' }} > Sé Parte
                          <br />De
                          <br />Kimche</h4>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">¿Dónde nacimos?</h2>
                <h3 className="section-subheading text-muted">Confían en nosotros.</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-8">
                <a href="#">
                  <img className="img-fluid d-block mx-auto" src={require('./img/logos/designmodo.jpg')} />
                </a>
              </div>
              <div className="col-md-4 col-sm-8">
                <a href="#">
                  <img className="img-fluid d-block mx-auto" src={require('./img/logos/themeforest.jpg')} />
                </a>
              </div>
              <div className="col-md-4 col-sm-8">
                <a href="#">
                  <img className="img-fluid d-block mx-auto" src={require('./img/logos/envato.jpg')} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Desafío kimche - impacto en 3 meses</h2>
                <h3 className="section-subheading" style={{ color: 'rgb(256,256,256)' }}>En Kimche estamos seguros que la información transforma la educación.<br/>
                  Por eso te invitamos a participar del #DesfíoKimche para que en 3 meses mejores tus indicadores de gestión escolar.</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form id="contactForm" name="sentMessage" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" id="name" type="text" placeholder="Tu nombre *" required data-validation-required-message="Por favor ingresa tu nombre."/>
                        <p className="help-block text-danger"/>
                      </div>
                      <div className="form-group">
                        <input className="form-control" id="email" type="email" placeholder="Tu Email *" required data-validation-required-message="Por favor ingresa tu email."/>
                        <p className="help-block text-danger"/>
                      </div>
                      <div className="form-group">
                        <input className="form-control" id="phone" type="tel" placeholder="Tu Celular *" required data-validation-required-message="Por fabor ingresa tu número de celular."/>
                        <p className="help-block text-danger"/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea className="form-control" id="message" placeholder="Tu Mensaje *" required data-validation-required-message="Por favor ingresa un mensaje." defaultValue={""}/>
                        <p className="help-block text-danger"/>
                      </div>
                    </div>
                    <div className="clearfix"/>
                    <div className="col-lg-12 text-center">
                      <div id="success"/>
                      <button className="btn btn-xl" type="submit">Enviar Mensaje</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
