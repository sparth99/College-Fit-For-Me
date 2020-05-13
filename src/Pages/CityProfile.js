import React, { Component } from 'react';
import '../Styles/Profile.css';
import CityData from './CityData';
import axios from 'axios';

class CityProfile extends Component {
  state = {
    city: null,
  };

  componentDidMount() {
    const tokenized_url = String(window.location.href).split('/');
    const city_name = tokenized_url[tokenized_url.length - 1];
    axios
      .get('https://api.collegefitfor.me/cities?name=' + city_name)
      .then((res) => {
        var city = res.data;
        this.setState({ city });
      });
  }

  render() {
    if (this.state.city === null) {
      return <b> Loading ... </b>;
    } else {
      return (
        <div>
          <CityData city={this.state.city[0]} />
        </div>
      );
    }
  }
}

export default CityProfile;
