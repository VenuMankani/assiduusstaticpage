import React, { useEffect, useRef, useState, useContext } from 'react'
import styles from './graphData.module.css'
import * as d3 from "d3";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { FormControl, MenuItem, Select } from '@mui/material';
import { PageContext } from '../context/ContextProvider';

const monthlyData = [
  { month: 'January', data: [25, 70, 45, 60, 46, 44, 60, 32, 80, 40] },
  { month: 'February', data: [30, 65, 40, 55, 50, 42, 65, 35, 75, 38] },
  { month: 'March', data: [35, 60, 50, 58, 55, 48, 70, 38, 70, 42] },
  { month: 'April', data: [40, 55, 55, 50, 60, 52, 75, 45, 65, 48] },
  { month: 'May', data: [45, 50, 60, 45, 70, 56, 80, 50, 60, 50] },
  { month: 'June', data: [50, 45, 65, 40, 75, 60, 85, 55, 55, 52] },
  { month: 'July', data: [55, 40, 70, 35, 80, 65, 90, 60, 50, 54] },
  { month: 'August', data: [60, 35, 75, 30, 85, 70, 95, 65, 45, 56] },
  { month: 'September', data: [65, 30, 80, 28, 90, 75, 100, 70, 40, 58] },
  { month: 'October', data: [70, 25, 85, 25, 95, 80, 105, 75, 35, 60] },
  { month: 'November', data: [75, 20, 90, 22, 100, 85, 110, 80, 30, 62] },
  { month: 'December', data: [80, 15, 95, 20, 105, 90, 115, 85, 25, 64] }
];


const CheckingAccount = () => {
  const [manage, setManage] = useState(1);
  const [data, setData] = useState(monthlyData[0].data);
  const svgRef = useRef<any>();
  const contextValue = useContext(PageContext);

  const handleMonthChange = (event: any) => {
    const selectedMonth = event.target.value;
    const selectedData = monthlyData.find((item) => item.month === selectedMonth)?.data;
    if (selectedData) {
      setData(selectedData);
    }
  }

  const handleChange = (event: any) => {
    setManage(event.target.value);
  };

  useEffect(() => {

    d3.select(svgRef.current).selectAll("*").remove();

    
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
      .style("overflow", "visible")

    // setting the scaleing
    // xscales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    //yscales
    const yScale: any = d3.scaleLinear().domain([0, h]).range([h, 0]);

    //  Setup functions to draw Lines ---------------//
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(1 + data.length)
      .tickFormat((i: any) => i + 1);
    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);

    // setting up the data for the svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d: any) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "darkgreen");
  }, [data, contextValue.screenHeight, contextValue.screenWidth]);

  return (
    <div className={styles.Container}>
      <div className={styles.CheckingAccountHeader}>
        <Typography variant="h6" paddingTop={'0.5rem'} paddingLeft={'1rem'} fontWeight={700}>Checking account</Typography>
        <div className={styles.manageMonths}>
          <FormControl>
            <Select
              value={manage}
              onChange={handleChange}
            >
              <MenuItem value={1}>Manage</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <Select defaultValue='January' onChange={handleMonthChange}>
              {monthlyData.map((item) => (
                <MenuItem key={item.month} value={item.month}>{item.month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Divider orientation='horizontal' />
      <svg ref={svgRef} style={{ margin: "50px" }}></svg>
    </div>
  );
}


export default CheckingAccount
