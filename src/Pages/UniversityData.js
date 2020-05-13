import React, { Component } from 'react';
import { Nav, Container, Row, Col, Table } from 'react-bootstrap';
import '../Styles/Profile.css';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';

class UniversityData extends Component {
  getAttractions() {
    const attractions = this.props.univ.restaurants;

    return attractions.map((attr) => {
      return (
        <h4>
          <Nav.Link
            href={'/attractions/' + attr.replace(/ /g, '_').toLowerCase()}
          >
            {attr.substring(0, attr.lastIndexOf('*'))}
          </Nav.Link>
        </h4>
      );
    });
  }

  formatNumber = (value) => {
    return value === 0 ? 'N/A' : value.toLocaleString();
  };

  formatPercent = (value) => {
    return value === 0 ? 'N/A' : value.toFixed(2).toString() + '%';
  };

  formatTuition = (value) => {
    return value === 0 ? 'N/A' : '$' + value.toFixed().toString() + ' / year';
  };

  formatScore = (value) => {
    return value === 0 ? 'N/A' : value;
  };

  render() {
    const city = this.props.univ.city_state_name;
    return (
      <div className="Background">
        <Navigation />
        <Container className="Content__Container">
          <Row className="Cards">
            <h1>{this.props.univ.name}</h1>
            <Row className="w-100">
              <img
                src={this.props.univ.image_url}
                alt="university"
                className="university_image"
              />
            </Row>
            <Row className="w-100">
              <iframe
                src={this.props.univ.youtube_link.replace('watch?v=', 'embed/')}
                className="university_video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </Row>
            <h5>{this.props.univ.wiki_text}</h5>
            <Row className="w-100">
              <Col md={6}>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>City</td>
                      <td>
                        <Nav.Link href={'/cities/' + city}>
                          {this.props.univ.city_name},{' '}
                          {this.props.univ.state_name}
                        </Nav.Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Number of Undergrads</td>
                      <td>
                        {this.formatNumber(this.props.univ.num_undergrads)}
                      </td>
                    </tr>
                    <tr>
                      <td>Admission Rate</td>
                      <td>
                        {this.formatPercent(this.props.univ.admission_rate)}
                      </td>
                    </tr>
                    <tr>
                      <td>Tuition</td>
                      <td>
                        {this.formatTuition(this.props.univ.cost_per_year)}
                      </td>
                    </tr>
                    <tr>
                      <td>Graduation Rate</td>
                      <td>{this.formatPercent(this.props.univ.grad_rate)}</td>
                    </tr>
                    <tr>
                      <td>Retention Rate</td>
                      <td>
                        {this.formatPercent(this.props.univ.retention_rate)}
                      </td>
                    </tr>
                    <tr>
                      <td>Percent Men</td>
                      <td>{this.formatPercent(this.props.univ.percent_men)}</td>
                    </tr>
                    <tr>
                      <td>Percent Women</td>
                      <td>
                        {this.formatPercent(this.props.univ.percent_women)}
                      </td>
                    </tr>
                    <tr>
                      <td>Average SAT</td>
                      <td>{this.formatScore(this.props.univ.avg_sat_score)}</td>
                    </tr>
                    <tr>
                      <td>Average ACT</td>
                      <td>{this.formatScore(this.props.univ.avg_act_score)}</td>
                    </tr>
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
                    {this.props.univ.restaurants.map((attr, i) => (
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

export default UniversityData;
