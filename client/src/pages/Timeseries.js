import * as d3 from "d3";
import { useEffect, useState, useCallback, useRef } from "react";
import { fetchDatas } from "../store/chartSlice";
import { useDispatch, useSelector } from "react-redux";

const TimeSeriesChart = (props) => {
  const { width, height } = props;
  const chartRef = useRef();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const dta = useSelector((state) => state.chart.values);

  const getURLData = useCallback(async () => {
    let op = [];
    for (var item of dta) {
      op.push({
        date: d3.timeParse("%Y-%m-%d")(item.date),
        value: parseFloat(item.value),
      });
    }
    setData(op);
  },[dta]);

  const drawChart = useCallback(() => {
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };
    d3.select(chartRef.current).selectAll("svg").remove();
    const svg = d3
      .select("#time_series")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);

    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.value;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
    const line = d3
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.value);
      });

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [data, height, width]);

  useEffect(() => {
    dispatch(fetchDatas());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      getURLData();
    }
  }, [data, drawChart,getURLData]); 

  return (
    <div style={{ paddingTop: "6rem" }}>
      <h4> Time Series</h4>
      <div id="time_series" ref={chartRef} />
    </div>
  );
};

export default TimeSeriesChart;