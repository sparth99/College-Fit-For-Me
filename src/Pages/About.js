import React, { Component } from 'react';
import '../Styles/About.css';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import Gitlab from '../Components/Gitlab';
import { Container, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import AWS from '../static_resources/aws_tool.png';
import GitLab from '../static_resources/gitlab_tool.png';
import Postman from '../static_resources/postman_tool.png';
import ReactLogo from '../static_resources/react_tool.png';
import SQLAlcLogo from '../static_resources/sqlalchemy_tool.png';
import SeleniumLogo from '../static_resources/selenium_tool.png';
import PosticoLogo from '../static_resources/postico_tool.png';
import PostgreSQLLogo from '../static_resources/postgresql_tool.png';
import FlaskLogo from '../static_resources/flask_tool.png';
import MochaLogo from '../static_resources/mocha_tool.png';
import PythonLogo from '../static_resources/python_tool.png';

const styles = {
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    margin: '2vh 0vw',
  },
  contentWrapper: {
    margin: '2vh 0vw',
  },
  dataRow: {
    margin: '2vh 5vw',
  },
  dataLinkCol: {
    margin: '1vh 0vw',
  },
  linkRow: {
    margin: '1vh 10vw',
  },
  about: {
    width: '75%',
    margin: '1vh auto',
    fontSize: 20,
    textAlign: 'left',
  },
  tools: {
    width: '75%',
    margin: '1vh auto',
    fontSize: 20,
  },
};

class About extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Navigation />
        <Container style={styles.body}>
          <Col style={styles.contentWrapper}>
            <h1 className="about-header">About Us</h1>
            <div style={styles.about}>
              <h3>
                We are a group of developers passionate about helping students!
              </h3>
              <p>
                College Fit For Me is a website made with the purpose of helping
                prospective college students find their ideal college. Site
                visitors will find their top colleges by filtering for desired
                college attributes. Visitors can also see scope out cities and
                attractions in the surrounding areas of colleges.
              </p>
            </div>
          </Col>
          <Gitlab />
          <Col style={styles.contentWrapper}>
            <h2>Data Sources/API</h2>
            <Row style={styles.dataRow}>
              <Col>
                <h3>University Data</h3>
                <div style={styles.dataLinkCol}>
                  <h3>
                    <a
                      href="https://collegescorecard.ed.gov/data/documentation/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      College Score Card
                    </a>
                  </h3>
                </div>
              </Col>
              <Col>
                <h3>Attraction Data</h3>
                <div style={styles.dataLinkCol}>
                  <h3>
                    <a
                      href="https://www.yelp.com/developers/documentation/v3/business_search"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Yelp
                    </a>
                  </h3>
                </div>
              </Col>
              <Col>
                <h3>City Data</h3>
                <div style={styles.dataLinkCol}>
                  <h3>
                    <a
                      href="https://www.numbeo.com/common/api.jsp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Numbeo
                    </a>
                  </h3>
                  <h3>
                    <a
                      href="https://developers.teleport.org/api"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Teleport
                    </a>
                  </h3>
                </div>
              </Col>
            </Row>
          </Col>
          <Col style={styles.contentWrapper}>
            <h2>Tools</h2>
            <Row>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={AWS} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>Amazon Web Services</Card.Title>
                    <Card.Text>Used for Hosting the website</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={GitLab} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>GitLab</Card.Title>
                    <Card.Text>Stores code repository for Website</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={Postman} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>Postman</Card.Title>
                    <Card.Text>Used to design and document API</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={ReactLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>React</Card.Title>
                    <Card.Text>Frontend framework for website</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={SQLAlcLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>SQLAlchemy</Card.Title>
                    <Card.Text>Used to query the database</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={SeleniumLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>Selenium</Card.Title>
                    <Card.Text>
                      Performs acceptance tests for GUI elements
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={PosticoLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>Postico</Card.Title>
                    <Card.Text>SQL editor for database</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={PostgreSQLLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>PostgreSQL</Card.Title>
                    <Card.Text>Database management system used</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={FlaskLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>Flask</Card.Title>
                    <Card.Text>Used to create API and backend server</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={MochaLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>Mocha</Card.Title>
                    <Card.Text>
                      Unit testing framework for Javascript code
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="card-padding">
                <Card className="card h-100 mb-4">
                  <Card.Img src={PythonLogo} variant="top" height="150" />
                  <Card.Body>
                    <Card.Title>Python</Card.Title>
                    <Card.Text>
                      Programming language for building server
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col style={styles.contentWrapper}>
            <h2>Links</h2>
            <Row style={styles.linkRow}>
              <Col>
                <h3>
                  <a
                    href="https://gitlab.com/parth.shah2/web-project"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gitlab Repo
                  </a>
                </h3>
              </Col>
              <Col>
                <h3>
                  <a
                    href="https://documenter.getpostman.com/view/10443615/SzKWtGrv?version=latest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Postman API
                  </a>
                </h3>
              </Col>
            </Row>
          </Col>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default About;
