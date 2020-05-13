import React, { Component } from 'react';
import {
  Nav,
  CardDeck,
  Spinner,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
} from 'react-bootstrap';
import { api } from '../instance.js';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import Highlighter from 'react-highlight-words';

export default class SearchResults extends Component {
  state = {
    models: [],
    loading: true,
    routeModelType: 'cities',
    apiModelType: 'cities',
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchModels();
  }

  fetchModels = (modelType = '') => {
    let urlSplit = String(window.location.href).split('/');
    let searchInfo = urlSplit[urlSplit.length - 1];
    let routeModelType =
      modelType === ''
        ? searchInfo.substring(0, searchInfo.indexOf('?'))
        : modelType;
    let apiModelType = routeModelType;
    if (routeModelType === 'attractions') {
      apiModelType = 'restaurants';
    }
    let searchQuery = searchInfo
      .substring(searchInfo.indexOf('=') + 1)
      .replace(/%20/g, ' ');
    this.setState({ searchQuery, routeModelType, apiModelType });
    api
      .get(`${apiModelType}/search/`, {
        params: {
          search_query: searchQuery,
        },
      })
      .then((res) => res.data)
      .then((models) => {
        this.setState({ models, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  switchModelQuery = (routeModelType) => {
    let apiModelType = routeModelType;
    if (routeModelType === 'attractions') {
      apiModelType = 'restaurants';
    }
    const { searchQuery } = this.state;
    api
      .get(`${apiModelType}/search/`, {
        params: {
          search_query: searchQuery,
        },
      })
      .then((res) => res.data)
      .then((models) => {
        this.setState({ models, routeModelType, apiModelType, loading: false });
        window.location.href = `/search/${routeModelType}?search_query=${searchQuery}`;
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  formatNumber = (value) => {
    return value === 0 ? 'N/A' : value.toLocaleString();
  };

  formatIndex = (value) => {
    return value === 0 ? 'N/A' : value.toFixed(2);
  };

  formatPercent = (value) => {
    return value === 0 ? 'N/A' : value.toFixed(2).toString() + '%';
  };

  formatString = (value) => {
    return value === '' ? 'N/A' : value;
  };

  formatTuition = (value) => {
    return value === 0 ? 'N/A' : '$' + value.toFixed().toString() + ' / year';
  };

  formatRating = (value) => {
    return value === 0 ? 'N/A' : value.toString();
  };

  displayModels = () => {
    const models = this.state.models;
    let rows = [];
    for (let r = 0; r < Infinity; r++) {
      let children = [];
      for (let c = 0; c < 4; c++) {
        if (models.length <= c + 4 * r) {
          break;
        }
        var model = models[c + 4 * r];
        if (this.state.routeModelType === 'cities') {
          children.push(
            <Card style={{ maxWidth: '17rem' }} className="cities-card">
              <Nav.Link
                className="city-instance"
                href={'/cities/' + String(model.city_state_name)}
              >
                <Card.Img src={model.image_url} variant="top" height="200" />
                <Card.Body>
                  <Card.Title>
                    <Highlighter
                      searchWords={[this.state.searchQuery]}
                      autoEscape={true}
                      textToHighlight={model.city_name}
                    />
                    <br></br>
                    <Highlighter
                      searchWords={[this.state.searchQuery]}
                      autoEscape={true}
                      textToHighlight={model.state_name}
                    />
                  </Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <span className="font-weight-bold">Population: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={model.population.toString()}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">Safety Index: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatIndex(model.safety_index)}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">Rent Index: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatIndex(model.rent_index)}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">
                        Healthcare Index:{' '}
                      </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatIndex(
                          model.health_care_index
                        )}
                      />
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Nav.Link>
            </Card>
          );
        } else if (this.state.routeModelType === 'universities') {
          let city_name = model.city_name + ', ' + model.state_name;
          children.push(
            <Card style={{ maxWidth: '17rem' }} className="universities-card">
              <Nav.Link
                className="university-instance"
                href={'/universities/' + model.name.replace(/ /g, '_')}
              >
                <Card.Img
                  variant="top"
                  src={model.image_url}
                  style={{ height: '190px' }}
                />
                <Card.Body>
                  <Card.Title>
                    <Highlighter
                      searchWords={[this.state.searchQuery]}
                      autoEscape={true}
                      textToHighlight={model.name}
                    />
                  </Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <span className="font-weight-bold">Admission Rate: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatPercent(
                          model.admission_rate
                        )}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">
                        Graduation Rate:{' '}
                      </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatPercent(model.grad_rate)}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">Tuition: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatTuition(
                          model.cost_per_year
                        )}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">City: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={city_name}
                      />
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Nav.Link>
            </Card>
          );
        } else {
          let city_name = model.city_name + ', ' + model.state_name;
          children.push(
            <Card style={{ maxWidth: '17rem' }} className="attractions-card">
              <Nav.Link
                className="attraction-instance"
                href={
                  '/attractions/' +
                  String(model.restaurant_name + '*' + model.id)
                    .replace(/ /g, '_')
                    .toLowerCase()
                }
              >
                <Card.Img
                  variant="top"
                  src={model.image_url}
                  style={{ height: '190px' }}
                />
                <Card.Body>
                  <Card.Title>
                    <Highlighter
                      searchWords={[this.state.searchQuery]}
                      autoEscape={true}
                      textToHighlight={model.restaurant_name}
                    />
                  </Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <span className="font-weight-bold">Category: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatString(model.categories)}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">City: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={city_name}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">Rating: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatRating(model.rating)}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <span className="font-weight-bold">Price: </span>
                      <Highlighter
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={this.formatString(model.price)}
                      />
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Nav.Link>
            </Card>
          );
        }
      }
      rows.push(<br></br>);
      rows.push(<div className="row">{children}</div>);
      if (models.length < 4 * r) break;
    }
    return rows;
  };

  modelSelectionRow = () => (
    <ButtonGroup className="d-flex">
      <Button
        variant={
          this.state.routeModelType === 'cities' ? 'primary' : 'outline-primary'
        }
        id="dropdown-btn"
        className="col-md-12"
        onClick={() => this.switchModelQuery('cities')}
      >
        Cities
      </Button>
      <Button
        variant={
          this.state.routeModelType === 'universities'
            ? 'primary'
            : 'outline-primary'
        }
        id="dropdown-btn"
        className="col-md-12"
        onClick={() => this.switchModelQuery('universities')}
      >
        Universities
      </Button>
      <Button
        variant={
          this.state.routeModelType === 'attractions'
            ? 'primary'
            : 'outline-primary'
        }
        id="dropdown-btn"
        className="col-md-12"
        onClick={() => this.switchModelQuery('attractions')}
      >
        Attractions
      </Button>
    </ButtonGroup>
  );

  render() {
    return (
      <div>
        <Navigation />
        <p></p>
        <h1>Search Results for "{this.state.searchQuery}"</h1>
        {this.modelSelectionRow()}
        {this.state.loading ? (
          <Spinner
            animation="border"
            role="status"
            className="Spinner-custom"
          />
        ) : (
          <CardDeck className="justify-content-center">
            {this.displayModels()}
          </CardDeck>
        )}
        <p />
        <Footer />
      </div>
    );
  }
}
