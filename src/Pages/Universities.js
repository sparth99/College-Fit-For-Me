import React, { Component } from 'react';
import {
  Nav,
  CardDeck,
  Spinner,
  Container,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import '../Styles/Universities.css';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UniversityFilters from '../Components/UniversityFilters';
import SearchInput from '../Components/SearchInput';

export default class Universities extends Component {
  state = {
    universities: null,
    page: 1,
    apiLink: 'https://api.collegefitfor.me/universities',
    prev_page: 1,
    loading: true,
    filtered: false,
  };

  componentDidMount() {
    this.fetchUniversities();
  }

  setter = (apiLink) => {
    let split_idx =
      String(apiLink).lastIndexOf('&') === -1
        ? String(apiLink).length
        : String(apiLink).lastIndexOf('&');
    let baseApi = String(apiLink).substring(0, split_idx);
    this.setState({ apiLink: baseApi });
    axios.get(apiLink).then((res) => {
      const universities = res.data;
      this.setState({ universities, page: 1 });
      if (
        apiLink === 'https://api.collegefitfor.me/universities' ||
        String(apiLink).substring(0, 56) ===
          'https://api.collegefitfor.me/universities/filter/?order='
      ) {
        this.setState({ filtered: false });
      } else {
        this.setState({ filtered: true });
      }
    });
  };

  fetchUniversities = () => {
    axios
      .get(this.state.apiLink, {
        params: {
          page: this.state.page,
        },
      })
      .then((res) => res.data)
      .then((universities) => {
        this.setState({ universities, loading: false });
      })
      .catch(() => {
        // attempting to go forward to a page that doesn't exist
        this.setState({ page: this.state.page - 1, loading: false });
      });
  };

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

  displayUniversities = () => {
    const { universities } = this.state;
    let rows = [];
    for (let r = 0; r < 5; r++) {
      let children = [];
      for (let c = 0; c < 4; c++) {
        if (universities.length <= c + 4 * r) {
          break;
        }
        var university = universities[c + 4 * r];
        children.push(
          <Card style={{ maxWidth: '17rem' }} className="universities-card">
            <Nav.Link
              className="university-instance"
              href={'/universities/' + university.name.replace(/ /g, '_')}
            >
              <Card.Img
                variant="top"
                src={university.image_url}
                style={{ height: '190px' }}
              />
              <Card.Body>
                <Card.Title>{university.name}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <span className="font-weight-bold">Admission Rate: </span>
                    {this.formatPercent(university.admission_rate)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">Graduation Rate: </span>
                    {this.formatPercent(university.grad_rate)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">Tuition: </span>
                    {this.formatTuition(university.cost_per_year)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="font-weight-bold">City: </span>
                    {university.city_name}, {university.state_name}
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Nav.Link>
          </Card>
        );
      }
      rows.push(<br></br>);
      rows.push(<div className="row">{children}</div>);
      if (universities.length < 4 * r) break;
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
      () => this.fetchUniversities()
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
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.prev_page + 2, this.state.prev_page);
          }}
        >
          {this.state.prev_page + 2}
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.prev_page + 3, this.state.prev_page);
          }}
        >
          {this.state.prev_page + 3}
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.prev_page + 4, this.state.prev_page);
          }}
        >
          {this.state.prev_page + 4}
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.prev_page + 5, this.state.prev_page);
          }}
        >
          {this.state.prev_page + 5}
        </Button>
      );
      buttons.push(
        <Button
          variant="outline-primary mr-1"
          onClick={(e) => {
            this.changePage(e, this.state.prev_page + 6, this.state.prev_page);
          }}
        >
          {this.state.prev_page + 6}
        </Button>
      );

      if (this.state.prev_page < 29) {
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
        <Jumbotron className="universities-jumbotron"></Jumbotron>
        <h1>Universities</h1>
        <p className="universities-header">
          Find the University that's the best fit for you.
        </p>
        <p>
          Explore information on over 5,000 Universities across the country.
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
                <SearchInput modelType="universities" />
                <br />
                <UniversityFilters setter={this.setter} />
              </div>
            </div>
            <CardDeck className="justify-content-center">
              {this.displayUniversities(this.state.universities)}
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
