import React, { Component } from 'react';
import { Nav, Container, Row, Col, Table } from 'react-bootstrap';
import '../Styles/Profile.css';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';

class AttractionData extends Component {
  getUniversities() {
    const universities = this.props.attr.universities;

    return universities.map((attr) => {
      return (
        <h4>
          <Nav.Link href={'/universities/' + attr.replace(/ /g, '_')}>
            {attr}
          </Nav.Link>
        </h4>
      );
    });
  }

  formatNumber = (value) => {
    return value === 0 ? 'N/A' : value.toLocaleString();
  };

  formatList = (value) => {
    return value === '' ? 'N/A' : value.replace(/,/g, ', ');
  };

  formatRating = (value) => {
    return value === 0 ? 'N/A' : value;
  };

  formatString = (value) => {
    return value === '' ? 'N/A' : value;
  };

  render() {
    const city = this.props.attr.city_state_name;
    return (
      <div className="Background">
        <Navigation />
        <Container className="Content__Container">
          <Row className="Cards">
            <h1>{this.props.attr.restaurant_name}</h1>
            <Row className="w-100">
              <img
                src={this.props.attr.image_url}
                alt="restaurant"
                className="university_image"
              />
            </Row>
            <Row className="w-100">
              <iframe
                src={this.props.attr.youtube_link.replace('watch?v=', 'embed/')}
                className="university_video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </Row>
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
                          {this.props.attr.city_name},{' '}
                          {this.props.attr.state_name}
                        </Nav.Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>{this.formatString(this.props.attr.price)}</td>
                    </tr>
                    <tr>
                      <td>Rating</td>
                      <td>{this.formatRating(this.props.attr.rating)}</td>
                    </tr>
                    <tr>
                      <td>Review Count</td>
                      <td>{this.formatNumber(this.props.attr.review_count)}</td>
                    </tr>
                    <tr>
                      <td>Transactions</td>
                      <td>{this.formatList(this.props.attr.transactions)}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>{this.formatString(this.props.attr.categories)}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{this.formatString(this.props.attr.address)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>Universities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.attr.universities.map((attr, i) => (
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
            </Row>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default AttractionData;
