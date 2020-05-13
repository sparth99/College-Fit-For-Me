import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class SearchInput extends Component {
  state = {
    searchQuery: '',
  };

  // On enter (key code 13), change href to point to search results page
  handleKeyPress = (target) => {
    if (target.charCode === 13) {
      this.handleSearch(target);
    }
  };

  // On search button pressed, change href to point to search results page
  handleSearch = (target) => {
    target.preventDefault();
    let { modelType } = this.props;
    if (!modelType) {
      const urlSplit = String(window.location.href).split('/');
      const routeType = urlSplit[3];
      if (routeType === 'home') {
        modelType = 'cities';
      } else if (routeType === 'search') {
        const typeAndParams = urlSplit[4];
        modelType = typeAndParams.substring(0, typeAndParams.indexOf('?'));
      } else {
        modelType = routeType;
      }
    }
    const { searchQuery } = this.state;
    window.location.href = `/search/${modelType}?search_query=${searchQuery}`;
  };

  // On key press, update the state of the searchQuery
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <Form inline>
        <Form.Control
          className="mr-sm-2"
          placeholder="Search"
          type="text"
          onChange={this.handleChange}
          onKeyPress={(key) => {
            this.handleKeyPress(key);
          }}
          value={this.state.searchQuery}
        />
        <Button variant="primary" onClick={this.handleSearch}>
          Search
        </Button>
      </Form>
    );
  }
}
