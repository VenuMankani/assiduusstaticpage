import { useContext, useEffect, useRef, useState } from 'react';
import * as d3 from "d3";
import styles from './graphData.module.css'
import { Typography, Divider, IconButton } from '@mui/material';
import { PageContext } from '../context/ContextProvider';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const initdata1 = [25, 70, 45, 60, 46, 44];
const initdata2 = [15, 100, 45, 80, 36, 44];

const TotalCashFlow = () => {
  const svgRef = useRef<any>();
  const contextValue = useContext(PageContext);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [tickLabels, setTickLabels] = useState(months);
  const [data1, setData1] = useState(initdata1);
  const [data2, setData2] = useState(initdata2);
  const [showRandomData, setShowRandomData] = useState(false);

  const randomizeData = () => {
    // Generate random data for data1 and data2
    const randomData1 = Array.from({ length: 6 }, () => Math.floor(Math.random() * 130));
    const randomData2 = Array.from({ length: 6 }, () => Math.floor(Math.random() * 130));

    setData1(randomData1);
    setData2(randomData2);
    setShowRandomData(!showRandomData);

    const shuffledMonths = contextValue.shuffleArray([...months]);
    //@ts-ignore
    const randomMonths = shuffledMonths.slice(0, 6);
    setTickLabels(randomMonths);
  };

  useEffect(() => {

    d3.select(svgRef.current).selectAll("*").remove();

    // Combine data1 and data2 into a single dataset for stacking
    const stackedData: any = data1.map((d1, i) => ({ d1, d2: data2[i] }));

    // setting up svg
    let w = 700;
    let h = 200;
    if (contextValue.screenHeight < 1000 && contextValue.screenWidth < 1600) {
      w = 450;
      h = 150;
    }

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
      .tickFormat((_, i) => tickLabels[i])
    // .ticks(data.length)
    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);

  }, [contextValue.screenHeight, contextValue.screenWidth, showRandomData]);

  return (
    <div className={styles.Container}>
      <div className={styles.CheckingAccountHeader}>
        <Typography variant="h6" paddingTop={'0.5rem'} paddingLeft={'1rem'} fontWeight={700}>Total cash flow</Typography>
        <IconButton onClick={randomizeData}>
          <ShuffleIcon />
        </IconButton>
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

