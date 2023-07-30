import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const chartRef = useRef();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const drawChart = useCallback((data) => {
    if (!data || data.length === 0) return;
    const width =windowSize.width<500 ? 370 : windowSize.width>768 ? 700 : 400;
    const height =windowSize.width>768 ? 500 : 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    d3.select(chartRef.current).selectAll('svg').remove();
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([chartHeight, 0]);
    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - yScale(d.value))
      .attr('fill', 'blue');
    const xAxis = d3.axisBottom(xScale);
    chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);
    const yAxis = d3.axisLeft(yScale);
    chart.append('g').attr('class', 'y-axis').call(yAxis);
  }, [windowSize]);

  useEffect(() => {
    drawChart(data);
    return () => {};
  }, [data, drawChart]);

  return <div ref={chartRef}></div>;
};

export default BarChart;