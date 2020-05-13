import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Dropdown, ButtonToolbar } from 'react-bootstrap';

class UniversityFilters extends React.Component {
  state = {
    universities: null,
    state_filter: 'Select State',
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

  sort_selected = (sort) => {
    return sort != 'Sort By' && sort != 'All';
  };

  sort_feature = (feature) => {
    if (feature === 'Number of Undergrads') {
      return 'num_undergrads';
    } else if (feature === 'Admission Rate') {
      return 'admission_rate';
    } else if (feature === 'Tuition') {
      return 'cost_per_year';
    } else if (feature === 'Retention Rate') {
      return 'retention_rate';
    } else if (feature === 'Percent Men') {
      return 'percent_men';
    } else if (feature === 'Percent Women') {
      return 'percent_women';
    } else if (feature === 'Graduation Rate') {
      return 'grad_rate';
    } else if (feature === 'SAT') {
      return 'avg_sat_score';
    } else if (feature === 'ACT') {
      return 'avg_act_score';
    }
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
            {this.state.sort}
          </Dropdown.Toggle>
          <Dropdown.Menu className="ourdropdown" id="dropdown-options">
            {[
              'All',
              'Number of Undergrads',
              'Admission Rate',
              'Tuition',
              'Retention Rate',
              'Percent Men',
              'Percent Women',
              'Graduation Rate',
              'SAT',
              'ACT',
            ].map((value) => {
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
              this.sort_selected(this.state.sort)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/universities/filter/?state_name=` +
                    this.state.state_filter +
                    '&order=' +
                    this.sort_feature(this.state.sort) +
                    '*asc&page=1'
                )
                .then((res) => {
                  const universities = res.data;
                  this.setState({ universities });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/universities/filter/?state_name=` +
                        this.state.state_filter +
                        '&order=' +
                        this.sort_feature(this.state.sort) +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/universities/filter/?state_name=` +
                        this.state.state_filter +
                        '&order=' +
                        this.sort_feature(this.state.sort) +
                        '*asc&page=1'
                    );
                  }
                });
            } else if (this.state_selected(this.state.state_filter)) {
              axios
                .get(
                  `https://api.collegefitfor.me/universities/filter/?state_name=` +
                    this.state.state_filter +
                    '&page=1'
                )
                .then((res) => {
                  const universities = res.data;
                  this.setState({ universities });
                  this.props.setter(
                    `https://api.collegefitfor.me/universities/filter/?state_name=` +
                      this.state.state_filter +
                      '&page=1'
                  );
                });
            } else if (this.sort_selected(this.state.sort)) {
              axios
                .get(
                  `https://api.collegefitfor.me/universities/filter/?order=` +
                    this.sort_feature(this.state.sort) +
                    '*asc&page=1'
                )
                .then((res) => {
                  const universities = res.data;
                  this.setState({ universities });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/universities/filter/?order=` +
                        this.sort_feature(this.state.sort) +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/universities/filter/?order=` +
                        this.sort_feature(this.state.sort) +
                        '*asc&page=1'
                    );
                  }
                });
            } else {
              axios
                .get(`https://api.collegefitfor.me/universities`)
                .then((res) => {
                  const universities = res.data;
                  this.setState({ universities });
                  this.props.setter(
                    `https://api.collegefitfor.me/universities`
                  );
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

export default UniversityFilters;
