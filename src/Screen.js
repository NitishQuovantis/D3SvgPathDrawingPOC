import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import * as d3 from 'd3-shape';

export default class Screen extends Component {
  constructor(props) {
    super(props);

    this.declarePath();
  }

  declarePath = () => {
    this.path = 'M50 50l100 0 0 100 -100 0 0 -100';

    this.straightLineLength = this.props.width - 200;
    this.curveDiameter = 140;

    const data = this.getDiscretPointForRightSemicircle(50, 200, 50);
    this.curvedPath = d3.line().curve(d3.curveBasis)(data);

    const part1 = this.getPath(100, 200, this.straightLineLength, 70);
    const part2 = this.getOddPath(100, 340, this.straightLineLength, 70);
    const part3 = this.getPath(100, 480, this.straightLineLength, 70);
    this.fullPath = `${part1} ${part2} ${part3}`;

    console.log('full path is', this.fullPath);

    // this.path = `${p1} ${this.curvedPath} ${p2}`;
    this.outer = this.getOddPath(50, 40, this.straightLineLength, 70); // outer
    this.leader = this.getOddPath(50, 50, this.straightLineLength, 60); // leader
    this.inner = this.getOddPath(50, 60, this.straightLineLength, 50); // inner
  };

  getPath = (x, y, length, radius) => {
    const data = this.getDiscretPointForRightSemicircle(radius, x + length, y);
    this.curvedPath = d3.line().curve(d3.curveBasis)(data);

    const p1 = `M${x},${y} L${x + length},${y}`;
    const p2 = `M${x + length},${y + 2 * radius} L${x} ${y + 2 * radius}`;

    const path = `${p1} ${this.curvedPath}`;
    return path;
  };

  getOddPath = (x, y, length, radius) => {
    const data = this.getDiscretPointForLeftSemicircle(radius, x, y);
    this.curvedPath = d3.line().curve(d3.curveBasis)(data);

    const p1 = `M${x},${y} L${x + length},${y}`;
    const p2 = `M${x},${y} L${x + length} ${y}`;

    const path = `${this.curvedPath} ${p2} `;
    return path;
  };

  getDiscretPointForRightSemicircle(radius, x, y) {
    const x1 = x + 20;
    const y1 = y;
    const x2 = x + 20;
    const y2 = y + 2 * radius;
    const x45 = Math.round(radius * Math.cos(Math.PI / 4)) + x;
    const y45 = radius - Math.round(radius * Math.sin(Math.PI / 4)) + y;
    const xn45 = Math.round(radius * Math.cos(-Math.PI / 4)) + x;
    const yn45 = radius - Math.round(radius * Math.sin(-Math.PI / 4)) + y;

    const point = [
      [x, y],
      [x1, y1],
      [x45, y45],
      [x + radius, y + radius],
      [xn45, yn45],
      [x2, y2],
      [x, y + 2 * radius],
    ];

    return point;
  }

  getDiscretPointForLeftSemicircle(radius, x, y) {
    const x1 = x - 20;
    const y1 = y;
    const x2 = x - 20;
    const y2 = y + 2 * radius;
    const x45 = x + Math.round(radius * Math.cos((3 * Math.PI) / 4));
    const y45 = radius - Math.round(radius * Math.sin(Math.PI / 4)) + y;
    const xn45 = x - Math.round(radius * Math.cos(-Math.PI / 4));
    const yn45 = radius - Math.round(radius * Math.sin((-3 * Math.PI) / 4)) + y;

    const point = [
      [x, y],
      [x1, y1],
      [x45, y45],
      [x - radius, y + radius],
      [xn45, yn45],
      [x2, y2],
      [x, y + 2 * radius],
    ];

    return point;
  }

  render() {
    return (
      <>
        <Text>Hello</Text>
        <Svg
          style={{
            width: this.props.width,
            height: this.props.height,
          }}>
          <Path d={this.outer} stroke="red" strokeWidth={1} fill="none" />
          <Path d={this.leader} stroke="red" strokeWidth={1} fill="none" />
          <Path d={this.inner} stroke="red" strokeWidth={1} fill="none" />
          <Path d={this.fullPath} stroke="red" strokeWidth={1} fill="none" />
        </Svg>
      </>
    );
  }
}
