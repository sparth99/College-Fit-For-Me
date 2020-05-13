import React, { Component } from 'react';
import '../Styles/Profile.css';
import UniversityData from './UniversityData';
import axios from 'axios';

class UniversityProfile extends Component {
  state = {
    university: null,
  };

  componentDidMount() {
    const tokenized_url = String(window.location.href).split('/');
    const university_name = tokenized_url[tokenized_url.length - 1]
      .replace(/_/g, '%20')
      .replace(/&/g, '%26');
    axios
      .get('https://api.collegefitfor.me/universities?name=' + university_name)
      .then((res) => {
        var university = res.data;
        this.setState({ university });
      });
  }

  render() {
    if (this.state.university === null) {
      return <b> Loading ... </b>;
    } else {
      return (
        <div>
          <UniversityData univ={this.state.university[0]} />
        </div>
      );
    }
  }
}

export default UniversityProfile;
