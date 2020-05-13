import React, { Component } from 'react';
import * as d3 from 'd3';
import StateData from './StateData';
import axios from 'axios';

class UniversityStatesMap extends Component {
  state = {
    data: null,
  };

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.createData();
  }

  createData() {
    axios.get('https://api.collegefitfor.me/universities/vis/').then((res) => {
      const data = res.data;
      this.setState({ data });
    });
  }

  tooltipHtml(n, d) {
    /* function to create html content string in tooltip div. */
    return (
      '<h4>' +
      n +
      '</h4><table>' +
      '<tr><td># Universities</td><td>' +
      d.count +
      '</td></tr>' +
      '</table>'
    );
  }

  drawChart() {
    var data = this.state.data;
    for (var state in data) {
      if (state == null) {
        data[state] = 0;
      }
    }

    var stateCounts = {};
    [
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
    ].forEach(function(d) {
      var num = 0;
      if (data[d] != null) {
        num = data[d];
      }
      stateCounts[d] = {
        color: d3.interpolate('#e4d4ff', '#2e1061')(num / 20),
        count: num,
      };
    });

    /* draw states on id #statesvg */
    StateData.draw('#statesvg', stateCounts, this.tooltipHtml);

    d3.select(window.frameElement).style('height', '600px');
  }

  render() {
    if (this.state.data != null) {
      this.drawChart();
    }
    return (
      <div className="container">
        <div id="tooltip"></div>
        <svg width="960" height="600" id="statesvg"></svg>
      </div>
    );
  }
}

export default UniversityStatesMap;
