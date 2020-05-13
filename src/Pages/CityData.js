import React, { Component } from 'react';
import { Nav, Container, Row, Col, Table } from 'react-bootstrap';
import '../Styles/Profile.css';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';

class CityData extends Component {
  getModels = (model) => {
    var models = [];
    if (model === 'universities') {
      models = this.props.city.universities;
    } else {
      models = this.props.city.restaurants;
    }

    return models.map((attr) => {
      if (model === 'universities') {
        return (
          <h4>
            <Nav.Link href={'/universities/' + attr.replace(/ /g, '_')}>
              {attr}
            </Nav.Link>
          </h4>
        );
      } else {
        return (
          <h4>
            <Nav.Link
              href={'/attractions/' + attr.replace(/ /g, '_').toLowerCase()}
            >
              {attr.substring(0, attr.lastIndexOf('*'))}
            </Nav.Link>
          </h4>
        );
      }
    });
  };

  formatNumber = (value) => {
    return value === 0 ? 'N/A' : value.toLocaleString();
  };

  formatIndex = (value) => {
    return value === 0 ? 'N/A' : value.toFixed(2);
  };

  render() {
    return (
      <div className="Background">
        <Navigation />
        <Container className="Content__Container">
          <Row className="Cards">
            <h1>{this.props.city.city_name}</h1>
            <Row className="w-100">
              <img
                src={this.props.city.image_url}
                alt="city"
                className="university_image"
              />
            </Row>
            <Row className="w-100">
              <iframe
                src={this.props.city.youtube_link.replace('watch?v=', 'embed/')}
                className="university_video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </Row>
            <h5>{this.props.city.wiki_text}</h5>
            <Row className="w-100">
              <Col>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Population</td>
                      <td>{this.formatNumber(this.props.city.population)}</td>
                    </tr>
                    <tr>
                      <td>Crime Index</td>
                      <td>{this.formatIndex(this.props.city.crime_index)}</td>
                    </tr>
                    <tr>
                      <td>Pollution Index</td>
                      <td>
                        {this.formatIndex(this.props.city.pollution_index)}
                      </td>
                    </tr>
                    <tr>
                      <td>Rent Index</td>
                      <td>{this.formatIndex(this.props.city.rent_index)}</td>
                    </tr>
                    <tr>
                      <td>Restaurant Price Index</td>
                      <td>
                        {this.formatIndex(
                          this.props.city.restaurant_price_index
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Traffic Index</td>
                      <td>{this.formatIndex(this.props.city.traffic_index)}</td>
                    </tr>
                    <tr>
                      <td>Safety Index</td>
                      <td>{this.formatIndex(this.props.city.safety_index)}</td>
                    </tr>
                    <tr>
                      <td>Health Care Index</td>
                      <td>
                        {this.formatIndex(this.props.city.health_care_index)}
                      </td>
                    </tr>
                    <tr>
                      <td>Time Zone</td>
                      <td>{this.props.city.time_zone.replace(/_/g, ' ')}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="w-100">
              <Col md={6}>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>Universities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.city.universities.map((attr, i) => (
                      <tr key={attr}>
                        <td>
                          <Nav.Link
                            href={'/universities/' + attr.replace(/ /g, '_')}
                          >
                            {attr}
                          </Nav.Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>Attractions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.city.restaurants.map((attr, j) => (
                      <tr key={attr}>
                        <td>
                          <Nav.Link
                            href={
                              '/attractions/' +
                              attr.replace(/ /g, '_').toLowerCase()
                            }
                          >
                            {attr.substring(0, attr.lastIndexOf('*'))}
                          </Nav.Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default CityData;
