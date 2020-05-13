import React, { Component } from 'react';
import axios from 'axios';
import BChart from '@weknow/react-bubble-chart-d3';
import Promises from 'es6-promise';

class CountriesIncomeBubbleChart extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    var country_incomes = [
      { label: 'Low', value: 0 },
      { label: 'Middle', value: 0 },
      { label: 'High', value: 0 },
    ];
    let promises = [];

    for (let i = 0; i < 25; i++) {
      let offset = i * 10;
      promises.push(
        axios
          .get('https://api.pathogerm.com/countries/?offset=' + offset)
          .then((res) => {
            const data = res.data;
            const results = data.results;

            for (let j = 0; j < 10; j++) {
              if (results[j]['incomelevel'] === 'Low') {
                country_incomes[0]['value'] += 1;
              } else if (results[j]['incomelevel'] === 'Middle') {
                country_incomes[1]['value'] += 1;
              } else if (results[j]['incomelevel'] === 'High') {
                country_incomes[2]['value'] += 1;
              }
            }
          })
      );
    }

    Promises.all(promises).then(() => this.setState({ data: country_incomes }));
  }

  render() {
    if (this.state.data.length > 0) {
      return (
        <BChart
          graph={{
            zoom: 0.8,
            offsetX: 0.04,
            offsetY: 0.05,
          }}
          width={1100}
          height={800}
          padding={0} // optional value, number that set the padding between bubbles
          showLegend={true} // optional value, pass false to disable the legend.
          legendPercentage={15} // number that represent the % of with that legend going to use.
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 16,
            color: '#fff',
            weight: 'bold',
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          bubbleClickFunc={this.bubbleClick}
          legendClickFun={this.legendClick}
          data={this.state.data}
        />
      );
    } else {
      return <b> Loading... </b>;
    }
  }
}

export default CountriesIncomeBubbleChart;
