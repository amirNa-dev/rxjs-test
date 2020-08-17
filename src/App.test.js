import React from "react";
import { shallow } from "enzyme";

import App from "./App";

describe("<App />", () => {
	test("sould update airPressure, temperature, humidity after 2 second", async (done) => {
		let component = shallow(<App />);

		const now = component.state("lastSent");
		const airPressure = component.state("airPressure");
		const humidity = component.state("humidity");
		const temperature = component.state("temperature");

    setTimeout(()=>{
      const twoSecondLater = component.state("lastSent");
      const twoSecondLaterairPressure = component.state("airPressure");
      const twoSecondLaterhumidity = component.state("humidity");
		  const twoSecondLatertemperature = component.state("temperature");

      expect(twoSecondLater - now).not.toBe(0)
      expect(twoSecondLaterairPressure - airPressure).not.toBe(0)
      expect(twoSecondLaterhumidity - humidity).not.toBe(0)
      expect(twoSecondLatertemperature - temperature).not.toBe(0)

      done();

    }, 4000)
	});
});
