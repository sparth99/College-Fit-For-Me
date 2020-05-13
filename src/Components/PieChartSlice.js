import React, { PureComponent } from 'react';
import * as d3 from 'd3';

class PieChartSlice extends PureComponent {
  render() {
    var {
      fillColor,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
    } = this.props;
    var arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle);

    return (
      <g>
        <path d={arc()} fill={fillColor} />
      </g>
    );
  }
}

export default PieChartSlice;
