import React from 'react';
import { Line } from 'react-chartjs-2';
import { withTranslation } from '../i18n';

import LoadingSpin from '@/components/shared/LoadingSpin'

const Chart = ({ data_api, loading, t }) => {
    //console.log(this.props);
    //const { data_api, loading } = this.props;
    //console.log(props);
    //const journey_name = t('d_journey');
    //console.log(data_api);
    const data = {
        //labels: [1602712800000, 1602799200000, 1602885600000, 1602972000000, 1603058400000, 1603144800000,1603231200000],
        datasets: [
            {
                label: t('d_journey'),
                fill: false,
                //lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#FF8D8D',
                // borderCapStyle: 'butt',
                // borderDash: [],
                // borderDashOffset: 0.0,
                // borderJoinStyle: 'miter',
                // pointBorderColor: 'rgba(75,192,192,1)',
                // pointBackgroundColor: '#fff',
                // pointBorderWidth: 1,
                // pointHoverRadius: 5,
                // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                // pointHoverBorderWidth: 2,
                // pointRadius: 1,
                // pointHitRadius: 10,
                // pointStyle: 'line',
                data: data_api.journeys
            },
            {
                label: t('d_qa'),
                fill: false,
                //lineTension: 0.9,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#24499F',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                // pointStyle: 'line',
                data: data_api.qa
            },
            {
                label: t('d_videocall'),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#4789FF',
                // pointStyle: 'line',
                data: data_api.videocalls
            },
            {
                label: t('d_therapy'),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#4789FF',
                // pointStyle: 'line',
                data: data_api.therapy
            }
        ]

    }
    const options = {
        maintainAspectRatio: false,
        //showLines: false ,
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
            lineWidth: 1,
            labels: {
                //fontColor: 'rgb(255, 99, 132)',
                //useLineStyle: true,
                usePointStyle: true
            }
        }
    }
    /*const data = {
        datasets: [
            {
                label: t('d_journey'),
                fill: false,
                borderColor: '#FF8D8D',
                //pointStyle: 'line',
                data: data_api.journeys
            },
            {
                label: t('d_qa'),
                fill: false,
                borderColor: '#24499F',
                //pointStyle: 'line',
                data: data_api.qa
            },
            {
                label: t('d_therapy'),
                fill: false,
                borderColor: '#4789FF',
                //pointStyle: 'line',
                data: data_api.therapy
            }
        ]
    };*/
    //const options = {
    // scales: {
    //     xAxes: [{
    //         type: 'linear',
    //         position: 'bottom'
    //     }]
    // }
    //};
    return (
        <div className="chart-container">
            <Line
                data={data}
                // width={900}
                // height={400}
                options={options}
            />
            {!loading &&
                <LoadingSpin />
            }
        </div>
    );
}

export default withTranslation('common')(Chart);
