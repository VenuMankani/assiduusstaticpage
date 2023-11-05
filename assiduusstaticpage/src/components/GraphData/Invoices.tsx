import React, { useEffect, useRef, useState } from 'react'
import styles from './graphData.module.css'
import { Typography, Divider, Snackbar } from '@mui/material';
import * as d3 from "d3";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const invoiceData = [50, 100, 200, 150, 180, 70];

const Invoices = () => {
  const [data] = useState(invoiceData);
  const svgRef = useRef<any>();
  const inputFile = useRef<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleButtonClick = () => {
    inputFile.current.click();
  }

  const handleFileSelect = () => {
    setSnackbarOpen(true);
  }

  useEffect(() => {
    // setting up svg
    const w = 700;
    const h = 200;
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
      .tickFormat((_, i) => {
        const tickLabels = ["Older", "Jan 01-08", "Jan 09-16", "Jan 17-24", "Jan 25-31", "Future"];
        return tickLabels[i];
      })
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
  }, [data]);

  return (
    <div className={styles.Container}>
      <div className={styles.CheckingAccountHeader}>
        <Typography variant="h6" paddingTop={'0.5rem'} paddingLeft={'1rem'} fontWeight={700}>Invoices owed to you</Typography>
        <div className={styles.manageMonths}>
          <input type='file' id='file' ref={inputFile} onChange={handleFileSelect} style={{ display: 'none' }} />
          <div className={styles.invoicesButton} onClick={handleButtonClick}>
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