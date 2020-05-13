import React, { Component } from 'react';
import '../Styles/Profile.css';
import AttractionData from './AttractionData';
import axios from 'axios';

class AttractionProfile extends Component {
  state = {
    attraction: null,
  };

  componentDidMount() {
    const tokenized_url = String(window.location.href).split('/');
    const attraction_name = tokenized_url[tokenized_url.length - 1]
      .replace(/_/g, '%20')
      .replace(/&/g, '%26');
    axios
      .get('https://api.collegefitfor.me/restaurants?name=' + attraction_name)
      .then((res) => {
        var attraction = res.data;
        this.setState({ attraction });
      });
  }

  render() {
    if (this.state.attraction === null) {
      return <b> Loading ... </b>;
    } else {
      return (
        <div>
          <AttractionData attr={this.state.attraction[0]} />
        </div>
      );
    }
  }
}

export default AttractionProfile;
