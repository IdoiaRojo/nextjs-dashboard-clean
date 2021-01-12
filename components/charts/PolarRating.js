import { Polar } from 'react-chartjs-2';

const PolarRating = ({ data_api, loading, t }) => {
  const data = {
    datasets: [{
      data: [
        data_api.android,
        data_api.ios,
        data_api.web
      ],
      backgroundColor: [
        'rgb(251 194 28 / 70%)',
        'rgb(75 192 192 / 70%)',
        'rgb(249 99 132 / 70%)',
      ],
      hoverBackgroundColor: [
        'rgb(251 194 28 / 90%)',
        'rgb(75 192 192 / 90%)',
        'rgb(249 99 132 / 90%)',
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Android',
      'Ios',
      'Web',
    ]
  };

  return (
    <div>
      <Polar data={data} />
    </div>
  );
}

export default PolarRating;
