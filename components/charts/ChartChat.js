import React from 'react';
import { Line } from 'react-chartjs-2';
import { withTranslation } from '../../i18n'

const ChartChat = ({ data_api, loading, t }) => {
    const data = {
        datasets: [
            {
                label: "Access Support",
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#4789FF',
                pointBackgroundColor: '#fff',
                borderCapStyle: 'round',
                data: data_api.access_support
            },
            {
                label: "Access Therapy",
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#f2c80f',
                pointBackgroundColor: '#fff',
                borderCapStyle: 'round',
                data: data_api.access_therapy
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

export default withTranslation('common')(ChartChat);
