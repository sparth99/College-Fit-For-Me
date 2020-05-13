import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import '../Styles/Home.css';
import Navigation from '../Components/Navigation';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Footer from '../Components/Footer';
import Cities from '../static_resources/cities.png';
import Universities from '../static_resources/universities.png';
import Attractions from '../static_resources/attractions.png';

class Home extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Jumbotron>
          <h1 className="text-left">Hello Students!</h1>
          <p className="text-left">
            Find the University that's the best fit for your needs and
            interests!
            <br />
            Learn about life at different Universities, their surrounding areas,
            and explore attractions near them.
          </p>
          <p className="text-left">
            <Button
              className="explore-button"
              variant="primary"
              href="/universities"
            >
              Explore
            </Button>
          </p>
        </Jumbotron>

        <CardDeck>
          <Card>
            <Nav.Link className="cities-button" href="/cities">
              <Card.Img variant="top" height="240" src={Cities} />
              <Card.Body>
                <Card.Title>Cities</Card.Title>
                <Card.Text>See the best cities for college students</Card.Text>
              </Card.Body>
            </Nav.Link>
          </Card>
          <Card>
            <Nav.Link className="universities-button" href="/universities">
              <Card.Img variant="top" height="240" src={Universities} />
              <Card.Body>
                <Card.Title>Universities</Card.Title>
                <Card.Text>Pick the University that is best for you</Card.Text>
              </Card.Body>
            </Nav.Link>
          </Card>
          <Card>
            <Nav.Link className="attractions-button" href="/attractions">
              <Card.Img variant="top" height="240" src={Attractions} />
              <Card.Body>
                <Card.Title>Attractions</Card.Title>
                <Card.Text>Explore things to do in the area</Card.Text>
              </Card.Body>
            </Nav.Link>
          </Card>
        </CardDeck>
        <p></p>
        <Footer />
      </div>
    );
  }
}

export default Home;
