import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import styles from './graphData.module.css'
import { Typography, Divider } from '@mui/material';

const data1 = [25, 70, 45, 60, 46, 44];
const data2 = [15, 150, 45, 80, 36, 44];

const TotalCashFlow = () => {
  const svgRef = useRef<any>();

  useEffect(() => {
    // Combine data1 and data2 into a single dataset for stacking
    const stackedData: any = data1.map((d1, i) => ({ d1, d2: data2[i] }));

    // setting up svg
    const w = 700;
    const h = 200;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible");

    // Create a stack generator
    const stack = d3.stack().keys(["d1", "d2"]);

    // Stack the data
    const stackedValues = stack(stackedData);

    // Set up scales
    const xScale: any = d3
      .scaleBand()
      .domain(stackedData.map((d: any, i: any) => i))
      .range([0, w])
      .padding(0.8);

    const yScale = d3
      .scaleLinear()
      .domain([0, h])
      .nice()
      .range([h, 0]);

    // Create color scales for each segment
    const colorScale: any = d3.scaleOrdinal().domain(["d1", "d2"]).range(["#4BB543", "#2acf14"]);

    // Create the stacked bars
    svg
      .selectAll("g")
      .data(stackedValues)
      .enter()
      .append("g")
      .attr("fill", d => colorScale(d.key))
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", (d, i: any) => xScale(i))
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("rx", 2)
      .attr("ry", 2);

    // Add x-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((_, i) => {
        const tickLabels = ["August", "September", "October", "November", "December", "January"];
        return tickLabels[i];
      })
    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);

    // // Add y-axis
    // const yAxis = d3.axisLeft(yScale);
    // svg.append("g").call(yAxis);

  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.CheckingAccountHeader}>
        <Typography variant="h6" paddingTop={'0.5rem'} paddingLeft={'1rem'} fontWeight={700}>Total cash flow</Typography>
        <div className={styles.TCF}>
          <div className={styles.In}></div><Typography>In</Typography>
          <div className={styles.Out}></div><Typography>Out</Typography>
        </div>
      </div>
      <Divider orientation='horizontal' />
      <svg ref={svgRef} style={{ margin: "50px" }}></svg>
    </div>
  );
}

export default TotalCashFlow;
