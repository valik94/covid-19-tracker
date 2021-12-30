import React, {useState, useEffect} from 'react';
import {Line} from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend:{
        dsplay:false,
    },
    elements: {
        point: {
            radius:0,
        },
    },
    maintainAspectRatio: false,
    tooltips:{
        mode: "index",
        intersect: false,
        callbacks:{
        label: function (tooltipItem, data){
            return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
}


function LineGraph() {
    const [data, setData] = useState({})
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120


const buildChartData = (data, casesType = 'cases') =>{
    const chartData =[];
    let lastDataPoint;

    for (let date in data.cases){
        if (lastDataPoint){ //if we reached last data point
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint=data[casesType][date];
    }
    return chartData;
}

    useEffect(() =>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then ((response) => response.json())
        .then((data) => {
            //console.log(data);
            const chartData = buildChartData(data, 'cases');
            console.log(chartData)
            setData(chartData);
        })
    }, [])

    
    return (
        <div>
            <h1>I'm a graph</h1>
           <Line 
           options ={}
           data ={{
               datasets: [{
                   backgroundColor: "rgba(204,16,42, 0.5)",
                   borderColor: "#CC1034",
                   data: data
               },
            ],
           }}
           
           /> 
        </div>
    )
}

export default LineGraph
