import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Dropdown, ButtonToolbar } from 'react-bootstrap';

class AttractionFilters extends React.Component {
  state = {
    attractions: null,
    state_filter: 'Select State',
    price_filter: 'Select Price',
    sort: 'Sort By',
    order: 'Order',
    apiLink: '',
  };

  constructor(props) {
    super(props);
  }

  state_selected = (state_name) => {
    return state_name !== 'Select State' && state_name !== 'All';
  };

  price_selected = (price) => {
    return price !== 'Select Price' && price !== 'All';
  };

  sort_selected = (sort) => {
    return sort !== 'Sort By' && sort !== 'All';
  };

  render() {
    return (
      <ButtonToolbar className="CitiesFilter">
        <Dropdown className="m-1" id="dropdown-btn">
          <Dropdown.Toggle variant="success" id="dropdown-basic" variant="dark">
            {this.state.state_filter}
          </Dropdown.Toggle>
          <Dropdown.Menu className="ourdropdown" id="dropdown-options">
            {[
              'All',
              'Alabama',
              'Alaska',
              'Arizona',
              'Arkansas',
              'California',
              'Colorado',
              'Connecticut',
              'Delaware',
              'Florida',
              'Georgia',
              'Hawaii',
              'Idaho',
              'Illinois',
              'Indiana',
              'Iowa',
              'Kansas',
              'Kentucky',
              'Louisiana',
              'Maine',
              'Maryland',
              'Massachusetts',
              'Michigan',
              'Minnesota',
              'Mississippi',
              'Missouri',
              'Montana',
              'Nebraska',
              'Nevada',
              'New Hampshire',
              'New Jersey',
              'New Mexico',
              'New York',
              'North Carolina',
              'North Dakota',
              'Ohio',
              'Oklahoma',
              'Oregon',
              'Pennsylvania',
              'Rhode Island',
              'South Carolina',
              'South Dakota',
              'Tennessee',
              'Texas',
              'Utah',
              'Vermont',
              'Virginia',
              'Washington',
              'West Virginia',
              'Wisconsin',
              'Wyoming',
            ].map((value) => {
              return (
                <Dropdown.Item
                  key={value}
                  onClick={() => {
                    this.setState({ state_filter: value });
                  }}
                >
                  {value}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="m-1" id="dropdown-btn">
          <Dropdown.Toggle variant="success" id="dropdown-basic" variant="dark">
            {this.state.price_filter}
          </Dropdown.Toggle>
          <Dropdown.Menu className="ourdropdown" id="dropdown-options">
            {['All', '$', '$$', '$$$', '$$$$'].map((value) => {
              return (
                <Dropdown.Item
                  key={value}
                  onClick={() => {
                    this.setState({ price_filter: value });
                  }}
                >
                  {value}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="m-1" id="dropdown-btn">
          <Dropdown.Toggle variant="success" id="dropdown-basic" variant="dark">
            {this.state.sort}
          </Dropdown.Toggle>
          <Dropdown.Menu className="ourdropdown" id="dropdown-options">
            {['All', 'Rating', 'Review Count'].map((value) => {
              return (
                <Dropdown.Item
                  key={value}
                  onClick={() => {
                    this.setState({ sort: value });
                  }}
                >
                  {value}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="m-1" id="dropdown-btn">
          <Dropdown.Toggle variant="success" id="dropdown-basic" variant="dark">
            {this.state.order}
          </Dropdown.Toggle>
          <Dropdown.Menu className="ourdropdown" id="dropdown-options">
            {['Ascending', 'Descending'].map((value) => {
              return (
                <Dropdown.Item
                  key={value}
                  onClick={() => {
                    this.setState({ order: value });
                  }}
                >
                  {value}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Button
          className="m-1"
          id="go-btn"
          variant="outline-primary"
          onClick={() => {
            if (
              this.state_selected(this.state.state_filter) &&
              this.price_selected(this.state.price_filter) &&
              this.sort_selected(this.state.sort)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                    this.state.state_filter +
                    '&price=' +
                    this.state.price_filter +
                    '&order=' +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*dsc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                        this.state.state_filter +
                        '&price=' +
                        this.state.price_filter +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                        this.state.state_filter +
                        '&price=' +
                        this.state.price_filter +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*asc&page=1'
                    );
                  }
                });
            } else if (
              this.state_selected(this.state.state_filter) &&
              this.price_selected(this.state.price_filter)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                    this.state.state_filter +
                    '&price=' +
                    this.state.price_filter +
                    '&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  this.props.setter(
                    `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                      this.state.state_filter +
                      '&price=' +
                      this.state.price_filter +
                      '&page=1'
                  );
                });
            } else if (
              this.state_selected(this.state.state_filter) &&
              this.sort_selected(this.state.sort)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                    this.state.state_filter +
                    '&order=' +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*dsc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                        this.state.state_filter +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                        this.state.state_filter +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*asc&page=1'
                    );
                  }
                });
            } else if (this.state_selected(this.state.state_filter)) {
              axios
                .get(
                  `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                    this.state.state_filter +
                    '&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  this.props.setter(
                    `https://api.collegefitfor.me/restaurants/filter/?state_name=` +
                      this.state.state_filter +
                      '&page=1'
                  );
                });
            } else if (
              this.price_selected(this.state.price_filter) &&
              this.sort_selected(this.state.sort)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/restaurants/filter/?price=` +
                    this.state.price_filter +
                    '&order=' +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*dsc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?price=` +
                        this.state.price_filter +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?price=` +
                        this.state.price_filter +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*asc&page=1'
                    );
                  }
                });
            } else if (this.price_selected(this.state.price_filter)) {
              axios
                .get(
                  `https://api.collegefitfor.me/restaurants/filter/?price=` +
                    this.state.price_filter +
                    '&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  this.props.setter(
                    `https://api.collegefitfor.me/restaurants/filter/?price=` +
                      this.state.price_filter +
                      '&page=1'
                  );
                });
            } else if (this.sort_selected(this.state.sort)) {
              axios
                .get(
                  `https://api.collegefitfor.me/restaurants/filter/?order=` +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*dsc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?order=` +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/restaurants/filter/?order=` +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*asc&page=1'
                    );
                  }
                });
            } else {
              axios
                .get(`https://api.collegefitfor.me/restaurants`)
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  this.props.setter(`https://api.collegefitfor.me/restaurants`);
                });
            }
          }}
        >
          Go
        </Button>
      </ButtonToolbar>
    );
  }
}

export default AttractionFilters;
