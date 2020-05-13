import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import axios from 'axios';
import Promises from 'es6-promise';

class CountriesPopulationBarGraph extends Component {
  state = {
    country_populations: [],
  };

  componentDidMount() {
    var data = [];
    let promises = [];

    for (let i = 0; i < 25; i++) {
      let offset = i * 10;
      promises.push(
        axios
          .get('https://api.pathogerm.com/countries/?offset=' + offset)
          .then((res) => {
            const data2 = res.data;
            const results = data2.results;

            for (let j = 0; j < 10; j++) {
              if (results[j]['pop'] !== null && results[j]['pop'] > 50000000) {
                var dict = {};
                dict[results[j]['name']] = results[j]['pop'];
                data.push(dict);
              }
            }
          })
      );
    }

    Promises.all(promises).then(() =>
      this.setState({ country_populations: data })
    );
  }

  render() {
    if (this.state.country_populations === 0) {
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

      var data = this.state.country_populations;
      var x = 'Countries with Population Over 50 Million';
      var y = 'Population';

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

export default CountriesPopulationBarGraph;
