import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: d3.scaleOrdinal().range(d3.schemeCategory10).domain(this.props.options.map(option => option.title)),
      pillColorArray: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options.length !== nextProps.options.length) {
      var pillColorArray = nextProps.options.map(item => this.state.color(item.title));
      this.props.getBadgeColor(pillColorArray);
    }
  }

  render() {
    var dataset = this.props.options;
    var width = 250;
    var height = 250;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 50;


    var svg = d3.select(ReactFauxDOM.createElement('svg'))
      .attr('width', width)
      .attr('height', height)

    var chart = svg.append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
      .innerRadius(radius - donutWidth)             // UPDATED
      .outerRadius(radius);

    var pie = d3.pie()
      .sort(null)
      .padAngle(.03)
      .value(function (d) { return d.count; })

    chart.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => this.state.color(d.data.title));

    var chartToReact = svg.node().toReact();

    return <div className='pie'>{chartToReact}</div>
  }
}

export default Chart;