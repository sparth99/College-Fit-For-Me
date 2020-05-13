import React, { Component } from 'react';
import {
  Nav,
  CardDeck,
  Spinner,
  Button,
  Jumbotron,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import axios from 'axios';
import '../Styles/Cities.css';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import CityFilters from '../Components/CityFilters';
import SearchInput from '../Components/SearchInput';

export default class Cities extends Component {
  state = {
    cities: null,
    page: 1,
    apiLink: 'https://api.collegefitfor.me/cities',
    loading: true,
    filtered: false,
  };

  componentDidMount() {
    this.fetchCities();
  }

  setter = (apiLink) => {
    let split_idx =
      String(apiLink).lastIndexOf('&') === -1
        ? String(apiLink).length
        : String(apiLink).lastIndexOf('&');
    let baseApi = String(apiLink).substring(0, split_idx);
    this.setState({ apiLink: baseApi });
    axios.get(apiLink).then((res) => {
      const cities = res.data;
      this.setState({ cities, page: 1 });
      if (
        apiLink === 'https://api.collegefitfor.me/cities' ||
        String(apiLink).substring(0, 50) ===
          'https://api.collegefitfor.me/cities/filter/?order='
      ) {
        this.setState({ filtered: false });
      } else {
        this.setState({ filtered: true });
      }
    });
  };

  fetchCities = () => {
    axios
      .get(this.state.apiLink, {
        params: {
          page: this.state.page,
        },
      })
      .then((res) => res.data)
      .then((cities) => {
        this.setState({ cities, loading: false });
      })
      .catch(() => {
        // attempting to go forward to a page that doesn't exist
        this.setState({ page: this.state.page - 1, loading: false });
      });
  };

  formatNumber = (value) => {
    return value === 0 ? 'N/A' : value.toLocaleString();
  };

  formatIndex = (value) => {
    return value === 0 ? 'N/A' : value.toFixed(2);
  };

  displayCities = () => {
    const { cities } = this.state;
    let rows = [];
    for (let r = 0; r < 5; r++) {
      let children = [];
      for (let c = 0; c < 4; c++) {
        if (cities.length <= c + 4 * r) {
          break;
        }
        var city = cities[c + 4 * r];
        children.push(
          <Card style={{ maxWidth: '17rem' }} className="cities-card">
            <Nav.Link
              className="city-instance"
              href={'/cities/' + String(city.city_state_name)}
            >
              <Card.Img
                variant="top"
                src={city.image_url}
                style={{ height: '190px' }}
              />
              <Card.Body>
                <Card.Title>
                  {city.city_name}
                  <br></br>
                  {city.state_name}
                </Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <span className="font-weight-bold">Population: </span>
                    {this.formatNumber(city.population)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">Safety Index: </span>
                    {this.formatIndex(city.safety_index)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">Rent Index: </span>
                    {this.formatIndex(city.rent_index)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">Healthcare Index: </span>
                    {this.formatIndex(city.health_care_index)}
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Nav.Link>
          </Card>
        );
      }
      rows.push(<br></br>);
      rows.push(<div className="row">{children}</div>);
      if (cities.length < 4 * r) break;
    }
    return rows;
  };

  changePage = (page) => {
    this.setState(
      {
        page: page,
        loading: true,
      },
      () => this.fetchCities()
    );
  };

  displayButtons = (filtered) => {
    let buttons = [];
    if (filtered) {
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(this.state.page > 1 ? this.state.page - 1 : 1);
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
            this.changePage(this.state.page + 1);
          }}
        >
          &gt;&gt;
        </Button>
      );
    } else {
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(1);
          }}
        >
          &lt;&lt;
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(1);
          }}
        >
          1
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(2);
          }}
        >
          2
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(3);
          }}
        >
          3
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(4);
          }}
        >
          4
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(5);
          }}
        >
          5
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(5);
          }}
        >
          &gt;&gt;
        </Button>
      );
    }
    return buttons;
  };

  render() {
    return (
      <div>
        <Navigation />
        <Jumbotron className="cities-jumbotron"></Jumbotron>
        <h1>Cities</h1>
        <p className="cities-header">
          City matters a lot when deciding a University to attend.
        </p>
        <p>
          Whether you're a West Coast or East Coast person, prefer a big or
          small city, or looking for a city that has great access to nature,
          there's a city for you!
        </p>
        {this.state.loading ? (
          <Spinner
            animation="border"
            role="status"
            className="Spinner-custom"
          />
        ) : (
          <>
            <p />
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <SearchInput modelType="cities" />
                <br />
                <CityFilters setter={this.setter} />
              </div>
            </div>

            <CardDeck className="justify-content-center">
              {this.displayCities()}
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
