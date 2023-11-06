import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './graphData.module.css'
import { Typography, Divider, Snackbar, Button, IconButton } from '@mui/material';
import * as d3 from "d3";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { PageContext } from '../context/ContextProvider';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Invoices = () => {
  const svgRef = useRef<any>();
  const inputFile = useRef<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const contextValue = useContext(PageContext);
  const [data, setData] = useState([50, 100, 180, 130, 150, 70]);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [tickLabels, setTickLabels] = useState(months);

  const handleButtonClick = () => {
    const newData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 180));
    setData(newData);

    const shuffledMonths = contextValue.shuffleArray([...months]);
    //@ts-ignore
    const randomMonths = shuffledMonths.slice(0, 6);
    setTickLabels(randomMonths);
  };

  const handleButton = () => {
    inputFile.current.click();
  }

  const handleFileSelect = () => {
    setSnackbarOpen(true);
  }

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
    const xScale: any = d3.scaleBand().domain(data.map((val, i: any) => i)).range([0, w]).padding(0.8);

    //yscales
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

    // setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((_, i) => tickLabels[i])
      .ticks(data.length)
    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`)
      .attr('class', 'x-axis-labels')


    // setting up the data for the svg
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr('x', (d, i) => xScale(i))
      .attr('width', xScale.bandwidth())
      .attr('y', val => yScale(val))
      .attr('height', val => h - yScale(val))
      .attr("fill", "#4BB543")
      .attr("rx", 5)
      .attr("ry", 5);
  }, [data, tickLabels, contextValue.screenHeight, contextValue.screenWidth]);

  return (
    <div className={styles.Container}>
      <div className={styles.CheckingAccountHeader}>
        <Typography variant="h6" paddingTop={'0.5rem'} paddingLeft={'1rem'} fontWeight={700}>Invoices owed to you</Typography>
        <IconButton onClick={handleButtonClick}>
          <ShuffleIcon />
        </IconButton>
        <div className={styles.manageMonths}>
          <input type='file' id='file' ref={inputFile} onChange={handleFileSelect} style={{ display: 'none' }} />
          <div className={styles.invoicesButton} onClick={handleButton}>
            <Typography variant='body2' fontWeight={700}>New Sales Invoice</Typography>
          </div>
        </div>
      </div>
      <Divider orientation='horizontal' />
      <svg ref={svgRef} style={{ margin: "50px" }}></svg>

      <Snackbar open={snackbarOpen} autoHideDuration={1500} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          You Selected a File!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Invoices