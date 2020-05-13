import React, { Component } from 'react';
import {
  Nav,
  CardDeck,
  Spinner,
  ListGroup,
  ListGroupItem,
  Container,
} from 'react-bootstrap';
import '../Styles/Attractions.css';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AttractionFilters from '../Components/AttractionFilters';
import SearchInput from '../Components/SearchInput';

export default class Attractions extends Component {
  state = {
    attractions: null,
    page: 1,
    prev_page: 1,
    apiLink: 'https://api.collegefitfor.me/restaurants',
    loading: true,
    filtered: false,
  };

  componentDidMount() {
    this.fetchAttractions();
  }

  setter = (apiLink) => {
    let split_idx =
      String(apiLink).lastIndexOf('&') === -1
        ? String(apiLink).length
        : String(apiLink).lastIndexOf('&');
    let baseApi = String(apiLink).substring(0, split_idx);
    this.setState({ apiLink: baseApi });
    axios.get(apiLink).then((res) => {
      const attractions = res.data;
      this.setState({ attractions, page: 1 });
      if (
        apiLink === 'https://api.collegefitfor.me/restaurants' ||
        String(apiLink).substring(0, 55) ===
          'https://api.collegefitfor.me/restaurants/filter/?order='
      ) {
        this.setState({ filtered: false });
      } else {
        this.setState({ filtered: true });
      }
    });
  };

  fetchAttractions = () => {
    axios
      .get(this.state.apiLink, {
        params: {
          page: this.state.page,
        },
      })
      .then((res) => res.data)
      .then((attractions) => {
        this.setState({ attractions, loading: false });
      })
      .catch(() => {
        // attempting to go forward to a page that doesn't exist
        this.setState({ page: this.state.page - 1, loading: false });
      });
  };

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

  displayAttractions = () => {
    const { attractions } = this.state;
    let rows = [];
    for (let r = 0; r < 5; r++) {
      let children = [];
      for (let c = 0; c < 4; c++) {
        if (attractions.length <= c + 4 * r) {
          break;
        }
        var attraction = attractions[c + 4 * r];
        children.push(
          <Card style={{ maxWidth: '17rem' }} className="attractions-card">
            <Nav.Link
              className="attraction-instance"
              href={
                '/attractions/' +
                String(attraction.restaurant_name + '*' + attraction.id)
                  .replace(/ /g, '_')
                  .toLowerCase()
              }
            >
              <Card.Img
                variant="top"
                src={attraction.image_url}
                style={{ height: '190px' }}
              />
              <Card.Body>
                <Card.Title>{attraction.restaurant_name}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <span className="font-weight-bold">Category: </span>
                    {this.formatString(attraction.categories)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">City: </span>
                    {attraction.city_name}, {attraction.state_name}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">Rating: </span>
                    {this.formatRating(attraction.rating)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">Price: </span>
                    {this.formatString(attraction.price)}
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Nav.Link>
          </Card>
        );
      }
      rows.push(<br></br>);
      rows.push(<div className="row">{children}</div>);
      if (attractions.length < 4 * r) break;
    }
    return rows;
  };

  changePage = (event, page, prev_page) => {
    event.preventDefault();

    this.setState(
      {
        page: page,
        prev_page: prev_page,
        loading: true,
      },
      () => this.fetchAttractions()
    );
  };

  displayButtons = (filtered) => {
    let buttons = [];

    if (filtered) {
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(
              e,
              this.state.page > 1 ? this.state.page - 1 : 1,
              this.state.page > 1 ? this.state.page - 1 : 1
            );
          }}
        >
          &lt;&lt;
        </Button>
      );
      buttons.push(
        <Button variant="outline-primary mr-1">{this.state.page}</Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.page + 1, this.state.page + 1);
          }}
        >
          &gt;&gt;
        </Button>
      );
    } else {
      if (this.state.prev_page > 7) {
        buttons.push(
          <Button
            variant="outline-primary mr-1"
            onClick={(e) => {
              this.changePage(
                e,
                this.state.prev_page - 7,
                this.state.prev_page - 7
              );
            }}
          >
            &lt;&lt;
          </Button>
        );
      }

      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.prev_page, this.state.prev_page);
          }}
        >
          {this.state.prev_page}
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.prev_page + 1, this.state.prev_page);
          }}
        >
          {this.state.prev_page + 1}
        </Button>
      );

      if (this.state.prev_page < 99) {
        buttons.push(
          <Button
            variant="outline-primary mr-1"
            onClick={(e) => {
              this.changePage(
                e,
                this.state.prev_page + 2,
                this.state.prev_page
              );
            }}
          >
            {this.state.prev_page + 2}
          </Button>
        );
        buttons.push(
          <Button
            variant="outline-primary mr-1"
            onClick={(e) => {
              this.changePage(
                e,
                this.state.prev_page + 3,
                this.state.prev_page
              );
            }}
          >
            {this.state.prev_page + 3}
          </Button>
        );
        buttons.push(
          <Button
            variant="outline-primary mr-1"
            onClick={(e) => {
              this.changePage(
                e,
                this.state.prev_page + 4,
                this.state.prev_page
              );
            }}
          >
            {this.state.prev_page + 4}
          </Button>
        );
        buttons.push(
          <Button
            variant="outline-primary mr-1"
            onClick={(e) => {
              this.changePage(
                e,
                this.state.prev_page + 5,
                this.state.prev_page
              );
            }}
          >
            {this.state.prev_page + 5}
          </Button>
        );
        buttons.push(
          <Button
            variant="outline-primary mr-1"
            onClick={(e) => {
              this.changePage(
                e,
                this.state.prev_page + 6,
                this.state.prev_page
              );
            }}
          >
            {this.state.prev_page + 6}
          </Button>
        );
        buttons.push(
          <Button
            variant="outline-primary mr-1"
            onClick={(e) => {
              this.changePage(
                e,
                this.state.prev_page + 7,
                this.state.prev_page + 7
              );
            }}
          >
            &gt;&gt;
          </Button>
        );
      }
    }

    return buttons;
  };

  render() {
    return (
      <div>
        <Navigation />
        <Jumbotron className="attractions-jumbotron"></Jumbotron>
        <h1>Attractions</h1>
        <p className="attractions-header">
          Find the best things to do in your college town!
        </p>
        <p>
          Whether you're interested in fine dinning, museums, or parks, there's
          always something for you to do!
        </p>
        {this.state.loading ? (
          <Spinner
            animation="border"
            role="status"
            className="Spinner-custom"
          />
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <SearchInput modelType="attractions" />
                <br />
                <AttractionFilters setter={this.setter} />
              </div>
            </div>
            <CardDeck className="justify-content-center">
              {this.displayAttractions(this.state.attractions)}
            </CardDeck>
            <p />
            {this.displayButtons(this.state.filtered)}
          </>
        )}
        <p />
        <Footer />
      </div>
    );
  }
}
