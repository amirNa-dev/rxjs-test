// Required packages
import React, { Component } from "react";
import { Subject } from "rxjs";

// Components
import Display from "./components/Display";
// Helpers
import getRandomArbitrary from "./helpers/generator";
// Emmitors

const observable = new Subject();

export default class App extends Component {
	constructor() {
		super();

		this.values = {
			airPressure: 0,
			temperature: 0,
			humidity: 0,
			lastTemprature: Date.now(),
			lastAirPressure: Date.now(),
			lastHumidity: Date.now(),
		};
		this.state = {
			airPressure: 0,
			temperature: 0,
			humidity: 0,
			lastSent: Date.now(),
		};

		this.funcAirPressure();
		this.funcHumidity();
		this.funcTemprature();
	}

	funcTemprature() {
		setTimeout(() => {
			observable.next({
				type: "Temprature",
				value: getRandomArbitrary(10, 50),
			});
			this.funcTemprature();
		}, getRandomArbitrary(100, 2000));
	}

	funcHumidity() {
		setTimeout(() => {
			observable.next({
				type: "Humidity",
				value: getRandomArbitrary(0, 100),
			});
			this.funcHumidity();
		}, getRandomArbitrary(100, 2000));
	}

	funcAirPressure() {
		setTimeout(() => {
			observable.next({
				type: "AirPressure",
				value: getRandomArbitrary(0.5, 1),
			});
			this.funcAirPressure();
		}, getRandomArbitrary(100, 2000));
	}

	componentDidMount() {
		observable.subscribe((data) => {
			// console.log(data);
			switch (data.type) {
				case "Temprature": {
					this.tempratureSub(data);
					break;
				}
				case "Humidity": {
					this.humiditySub(data);
					break;
				}
				case "AirPressure": {
					this.airPressureSub(data);
					break;
				}
			}
		});
	}

	tempratureSub = (data) => {
		Object.assign(this.values, {
			temperature: data.value,
			lastTemprature: Date.now(),
		});

		let diff = Date.now() - this.state.lastSent;
		if (diff >= 100) {
			this.setState({
				lastSent: Date.now(),
				temperature: this.values.temperature,
			});
		}
	};

	humiditySub = (data) => {
		Object.assign(this.values, {
			humidity: data.value,
			lastHumidity: Date.now(),
		});
		let diff = Date.now() - this.state.lastSent;
		if (diff >= 100) {
			this.setState({
				lastSent: Date.now(),
				humidity: this.values.humidity,
			});
		}
	};

	airPressureSub = (data) => {
		Object.assign(this.values, {
			airPressure: data.value,
			lastAirPressure: Date.now(),
		});
		let diff = Date.now() - this.state.lastSent;
		if (diff >= 100) {
			this.setState({
				lastSent: Date.now(),
				airPressure: this.values.airPressure,
			});
		}
	};

	render() {
		return (
			<Display
				lastSent={new Date(this.state.lastSent).toISOString()}
				lastDataDeliver={{
					temperature: this.values.lastTemprature,
					humidity: this.values.lastHumidity,
					airPressure: this.values.lastAirPressure,
				}}
				data={{
					temperature: this.state.temperature,
					humidity: this.state.humidity,
					airPressure: this.state.airPressure,
				}}
			/>
		);
	}
}
