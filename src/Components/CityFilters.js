import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Dropdown, ButtonToolbar } from 'react-bootstrap';

class CityFilters extends React.Component {
  state = {
    cities: null,
    state_filter: 'Select State',
    time_filter: 'Select Time Zone',
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

  time_selcted = (time_zone) => {
    return time_zone !== 'Select Time Zone' && time_zone !== 'All';
  };

  sort_selected = (sort) => {
    return sort !== 'Sort By' && sort !== 'All';
  };

  time_zone_value = (time_zone) => {
    if (time_zone === 'Central Time') {
      return 'America/Chicago';
    } else if (time_zone === 'Mountain Time') {
      // Missing Boise
      return 'America/Denver';
    } else if (time_zone === 'Mountain Time w/o DST') {
      return 'America/Phoenix';
    } else if (time_zone === 'Pacific Time') {
      return 'America/Los_Angeles';
    } else if (time_zone === 'Alaska Time') {
      return 'America/Anchorage';
    } else if (time_zone === 'Hawaii-Aleutian Time') {
      return 'Pacific/Honolulu';
    } else {
      // Missing Detroit, Indianapolis and Louisville
      return 'America/New_York';
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
            {this.state.time_filter}
          </Dropdown.Toggle>
          <Dropdown.Menu className="ourdropdown" id="dropdown-options">
            {[
              'All',
              'Eastern Time',
              'Central Time',
              'Mountain Time',
              'Mountain Time w/o DST',
              'Pacific Time',
              'Alaska Time',
              'Hawaii-Aleutian Time',
            ].map((value) => {
              return (
                <Dropdown.Item
                  key={value}
                  onClick={() => {
                    this.setState({ time_filter: value });
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
              'Population',
              'Crime Index',
              'Pollution Index',
              'Rent Index',
              'Restaurant Price Index',
              'Traffic Index',
              'Safety Index',
              'Health Care Index',
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
              this.time_selcted(this.state.time_filter) &&
              this.sort_selected(this.state.sort)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/cities/filter/?state_name=` +
                    this.state.state_filter +
                    '&time_zone=' +
                    this.time_zone_value(this.state.time_filter) +
                    '&order=' +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*asc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?state_name=` +
                        this.state.state_filter +
                        '&time_zone=' +
                        this.time_zone_value(this.state.time_filter) +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?state_name=` +
                        this.state.state_filter +
                        '&time_zone=' +
                        this.time_zone_value(this.state.time_filter) +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*asc&page=1'
                    );
                  }
                });
            } else if (
              this.state_selected(this.state.state_filter) &&
              this.time_selcted(this.state.time_filter)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/cities/filter/?state_name=` +
                    this.state.state_filter +
                    '&time_zone=' +
                    this.time_zone_value(this.state.time_filter) +
                    '&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  this.props.setter(
                    `https://api.collegefitfor.me/cities/filter/?state_name=` +
                      this.state.state_filter +
                      '&time_zone=' +
                      this.time_zone_value(this.state.time_filter) +
                      '&page=1'
                  );
                });
            } else if (
              this.state_selected(this.state.state_filter) &&
              this.sort_selected(this.state.sort)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/cities/filter/?state_name=` +
                    this.state.state_filter +
                    '&order=' +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*asc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?state_name=` +
                        this.state.state_filter +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?state_name=` +
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
                  `https://api.collegefitfor.me/cities/filter/?state_name=` +
                    this.state.state_filter +
                    '&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  this.props.setter(
                    `https://api.collegefitfor.me/cities/filter/?state_name=` +
                      this.state.state_filter +
                      '&page=1'
                  );
                });
            } else if (
              this.time_selcted(this.state.time_filter) &&
              this.sort_selected(this.state.sort)
            ) {
              axios
                .get(
                  `https://api.collegefitfor.me/cities/filter/?time_zone=` +
                    this.time_zone_value(this.state.time_filter) +
                    '&order=' +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*asc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?time_zone=` +
                        this.time_zone_value(this.state.time_filter) +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?time_zone=` +
                        this.time_zone_value(this.state.time_filter) +
                        '&order=' +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*asc&page=1'
                    );
                  }
                });
            } else if (this.time_selcted(this.state.time_filter)) {
              axios
                .get(
                  `https://api.collegefitfor.me/cities/filter/?time_zone=` +
                    this.time_zone_value(this.state.time_filter) +
                    '&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  this.props.setter(
                    `https://api.collegefitfor.me/cities/filter/?time_zone=` +
                      this.time_zone_value(this.state.time_filter) +
                      '&page=1'
                  );
                });
            } else if (this.sort_selected(this.state.sort)) {
              axios
                .get(
                  `https://api.collegefitfor.me/cities/filter/?order=` +
                    this.state.sort.toLowerCase().replace(/ /g, '_') +
                    '*asc&page=1'
                )
                .then((res) => {
                  const attractions = res.data;
                  this.setState({ attractions });
                  if (this.state.order === 'Descending') {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?order=` +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*dsc&page=1'
                    );
                  } else {
                    this.props.setter(
                      `https://api.collegefitfor.me/cities/filter/?order=` +
                        this.state.sort.toLowerCase().replace(/ /g, '_') +
                        '*asc&page=1'
                    );
                  }
                });
            } else {
              axios.get(`https://api.collegefitfor.me/cities`).then((res) => {
                const attractions = res.data;
                this.setState({ attractions });
                this.props.setter(`https://api.collegefitfor.me/cities`);
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

export default CityFilters;
