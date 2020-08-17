import React from "react";
import { shallow } from "enzyme";

import genrateRandomNum from "../../helpers/generator";
import Display from "../Display";

const dummyData = {
	lastSent: new Date(0).toISOString(),
	data: {
		temperature: genrateRandomNum(100, 300),
		humidity: genrateRandomNum(100, 300),
		airPressure: genrateRandomNum(100, 300),
	},
	lastDataDeliver: {
		temperature: Date.now(),
		humidity: Date.now(),
		airPressure: Date.now(),
	},
};

describe("Display", () => {
	let component;
	beforeEach(() => {
		component = shallow(
			<Display
				lastSent={dummyData.lastSent}
				lastDataDeliver={dummyData.lastDataDeliver}
				data={dummyData.data}
			/>
		);
	});

	it("should set last seen corectly", () => {
		const footer = component.find('[data-test-id="last-update"]');

		expect(footer.text()).toContain(dummyData.lastSent);
	});

	it("should show temp, pressure, humidity ", () => {
		const temp = component.find('[data-test-id="temp"]');
		const pressure = component.find('[data-test-id="air-pressure"]');
		const humidity = component.find('[data-test-id="humidity"]');

		expect(temp.text()).toBe(dummyData.data.temperature.toString());
		expect(pressure.text()).toBe(dummyData.data.airPressure.toString());
		expect(humidity.text()).toBe(dummyData.data.humidity.toString());
	});

	it("should show N/A when last upadted time is > 1s ", () => {
		let lastDataDeliver = {
			temperature: new Date(0).getTime(),
			humidity: new Date(0).getTime(),
			airPressure: new Date(0).getTime(),
    };
    
		component.setProps({ lastDataDeliver });
		const temp = component.find('[data-test-id="temp"]');
		const pressure = component.find('[data-test-id="air-pressure"]');
		const humidity = component.find('[data-test-id="humidity"]');

    let n = 'N/A'
    
		expect(temp.text()).toBe(n);
		expect(pressure.text()).toBe(n);
		expect(humidity.text()).toBe(n);
	});
});
