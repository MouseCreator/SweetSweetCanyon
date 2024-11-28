import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomizableGraph = ({ data, color = 'pink', numDivisions = 5 }) => {
    const labels = data.map(item => {
        const date = new Date(item.date);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getFullYear()}`;
    });

    const prices = data.map(item => item.price);


    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    const calculatedMax = Math.ceil(maxPrice / 100) * 100;
    const calculatedMin = Math.floor(minPrice / 100) * 100;

    const stepSize = Math.ceil((calculatedMax - calculatedMin) / numDivisions);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Price',
                data: prices,
                borderColor: color,
                backgroundColor: color,
                pointBorderColor: color,
                pointBackgroundColor: color,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price',
                },
                ticks: {
                    stepSize,
                },
                min: calculatedMin,
                max: calculatedMax,
            },
        },
    };

    return <Line data={chartData} options={chartOptions} />;
};

export default CustomizableGraph;