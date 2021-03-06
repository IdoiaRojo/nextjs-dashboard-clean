import { Line } from 'react-chartjs-2';
import { withTranslation } from '../../i18n';
import LoadingSpin from '@/components/shared/LoadingSpin';

const ChartContentView = ({ data_api, loading, t }) => {
    const data = {
        datasets: [
            {
                label: "Sign in",
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#4789FF',
                pointBackgroundColor: '#fff',
                borderCapStyle: 'round',
                data: data_api.sign_in
            },
            {
                label: "App open",
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#FF8D8D',
                pointBackgroundColor: '#fff',
                borderCapStyle: 'round',
                data: data_api.app_open
            },
            {
                label: "App session",
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#24499F',
                pointBackgroundColor: '#fff',
                borderCapStyle: 'square',
                data: data_api.app_session,
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
        <div className="chart-container">
            <Line
                data={data}
                options={options}
            />
            {loading &&
                <LoadingSpin />
            }
        </div>
    );
}

export default withTranslation('common')(ChartContentView);
