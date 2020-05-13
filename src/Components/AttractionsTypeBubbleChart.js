import React, { Component } from 'react';
import axios from 'axios';
import BChart from '@weknow/react-bubble-chart-d3';

class AttractionsTypeBubbleChart extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    axios.get('https://api.collegefitfor.me/restaurants/vis/').then((res) => {
      const data = res.data;
      this.setState({ data });
    });
  }

  render() {
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
  }
}

export default AttractionsTypeBubbleChart;
