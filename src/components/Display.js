// Packages
import React from 'react';
// Style
import './../styles/Display.css';
// Component
export default function Display(props) {
    const tempratureTimeDiff = Date.now() - props.lastDataDeliver.temperature;
    const airPressureTimeDiff = Date.now() - props.lastDataDeliver.airPressure;
    const humidityTimeDiff = Date.now() - props.lastDataDeliver.humidity;
    return (
        <React.Fragment>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Temprature</th>
                            <th>Air Pressure</th>
                            <th>Humidity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-test-id="temp">{tempratureTimeDiff > 1000 ? `N/A` : props.data.temperature}</td>
                            <td data-test-id="air-pressure">{airPressureTimeDiff > 1000 ? 'N/A' : props.data.airPressure}</td>
                            <td data-test-id="humidity">{humidityTimeDiff > 1000 ? 'N/A' : props.data.humidity}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <footer data-test-id="last-update">

                <h3 >Last Update:</h3>      {props.lastSent}
            </footer>
        </React.Fragment>
    )
}