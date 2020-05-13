import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import PieChartSlice from './PieChartSlice';
import Promises from 'es6-promise';

class GDPPieChart extends Component {
  state = {
    pieChartData: [],
    pieChartNames: [],
  };

  componentDidMount() {
    let data = [];
    let names = [];

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
              if (
                results[j]['pop'] !== null &&
                results[j]['pop'] > 50000000 &&
                results[j]['gdp'] !== null
              ) {
                data.push(results[j]['gdp']);
                names.push(results[j]['name']);
              }
            }
          })
      );
    }

    Promises.all(promises).then(() =>
      this.setState({ pieChartData: data, pieChartNames: names })
    );
  }

  componentDidUpdate() {
    if (this.state.pieChartData != 0) {
      const svg = d3.select('#pieChart');
      const dimensions = svg.node().getBoundingClientRect();
      svg.attr(
        'viewBox',
        `${-dimensions.width / 2} ${-dimensions.height / 2} ${
          dimensions.width
        } ${dimensions.height}`
      );
    }
  }

  render() {
    if (this.state.pieChartData.length == 0) {
      return <b> Loading... </b>;
    } else {
      var data = this.state.pieChartData;
      var arcs = d3.pie()(data);
      var innerRadius = 0;
      var outerRadius = 250;
      return (
        <div>
          <svg
            width="750"
            height="500"
            id="pieChart"
            style={{ paddingTop: '10px' }}
          >
            {arcs.map((obj, i) => (
              <PieChartSlice
                key={'slice' + i}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={obj.startAngle}
                endAngle={obj.endAngle}
                fillColor={d3.rgb(
                  Math.random() * (180 - 1) + 1,
                  Math.random() * (180 - 1) + 1,
                  Math.random() * (180 - 60) + 1
                )}
              />
            ))}
            {arcs.map((obj, i) => (
              <text
                key={'label' + i}
                className="slice-text"
                transform={`translate(${d3.arc().centroid({
                  innerRadius: outerRadius / 2,
                  outerRadius: outerRadius,
                  startAngle: obj.startAngle,
                  endAngle: obj.endAngle,
                })})`}
                textAnchor="middle"
                fill="white"
                style={{ fontSize: 13 }}
              >
                <tspan style={{ fontSize: 10 }}>
                  {this.state.pieChartNames[i]}
                </tspan>
              </text>
            ))}
          </svg>
        </div>
      );
    }
  }
}

export default GDPPieChart;
