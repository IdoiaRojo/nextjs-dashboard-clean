import React from 'react';
import { Line } from 'react-chartjs-2';
import { withTranslation } from '../../i18n'

const ChartVideo = ({ data_api, loading, t }) => {
    const data = {
        datasets: [
            {
                label: "Videocall validated",
                fill: false,
                backgroundColor: 'rgb(30,125,131,0.4)',
                borderColor: '#4789FF',
                pointBackgroundColor: '#fff',
                borderCapStyle: 'round',
                data: data_api.videocall_validated
            }
        ]

    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
        },
        legend: {
            display: true,
            //lineWidth: 1,
            labels: {
                usePointStyle: true
            }
        }
    }
    return (
        <div id="chart">
            <Line
                data={data}
                options={options}
            />
        </div>
    );
}

export default withTranslation('dashboard')(ChartVideo);
