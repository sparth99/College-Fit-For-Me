import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import axios from 'axios';

class CityStateBarGraph extends Component {
  state = {
    city_state_counts: [],
  };

  componentDidMount() {
    let data = [];
    let state_names = [
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
    ];
    axios.get('https://api.collegefitfor.me/cities/vis/').then((res) => {
      const states = res.data;
      for (let state in state_names) {
        state = state_names[state];
        let dict = {};
        dict[state] = states[state];
        if (dict[state] != null) {
          data.push(dict);
        }
      }
      data.sort(function(a, b) {
        var keyA = Object.keys(a)[0];
        var keyB = Object.keys(b)[0];

        if (keyA > keyB) {
          return 1;
        }
        if (keyB > keyA) {
          return -1;
        }
        return 0;
      });
      this.setState({ city_state_counts: data });
    });
  }

  render() {
    if (this.state.city_state_counts.length == 0) {
      return <b> Loading... </b>;
    } else {
      let width = 1200;
      let height = 600;

      const el = new Element('div');
      const svg = d3
        .select(el)
        .append('svg')
        .attr('id', 'chart')
        .attr('width', width)
        .attr('height', height);

      const margin = {
        top: 60,
        bottom: 100,
        left: 80,
        right: 40,
      };

      const chart = svg
        .append('g')
        .classed('display', true)
        .attr('transform', `translate(${margin.left},${margin.top})`);

      width = width - margin.left - margin.right;
      height = height - margin.top - margin.bottom;

      var data = this.state.city_state_counts;
      var x = 'States';
      var y = 'Number of Major Cities';

      // creating scales
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => Object.keys(d)[0]))
        .range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => Object.values(d)[0])])
        .range([height, 0]);
      const colorScale = d3.scaleSequential(d3.interpolateBlues);

      chart
        .selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', (d) => xScale(Object.keys(d)[0]) + xScale.bandwidth() / 2)
        .attr('dx', 0)
        .attr('y', (d) => yScale(Object.values(d)[0]))
        .attr('dy', -6);

      const xAxis = d3.axisBottom().scale(xScale);
      chart
        .append('g')
        .classed('x axis', true)
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      const yAxis = d3
        .axisLeft()
        .ticks(5)
        .scale(yScale);

      chart
        .append('g')
        .classed('y axis', true)
        .attr('transform', 'translate(0,0)')
        .call(yAxis);

      chart
        .select('.x.axis')
        .append('text')
        .attr('x', width / 2)
        .attr('y', 60)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text(x);

      chart
        .select('.y.axis')
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('transform', `translate(-50, ${height / 2}) rotate(-90)`)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text(y);

      const yGridlines = d3
        .axisLeft()
        .scale(yScale)
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat('');

      chart
        .append('g')
        .call(yGridlines)
        .classed('gridline', true);

      chart
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', (d) => xScale(Object.keys(d)[0]))
        .attr('y', (d) => yScale(Object.values(d)[0]))
        .attr('height', (d) => height - yScale(Object.values(d)[0]))
        .attr('width', (d) => xScale.bandwidth() - 2)
        .style('fill', (d, i) => colorScale(0.8));

      return el.toReact();
    }
  }
}

export default CityStateBarGraph;
