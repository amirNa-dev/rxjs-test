import genorator from '../generator';

it('should genrate random number betwwen two number', ()=>{
  const min = 200;
  const max = 1000;
  const randomNum = genorator(min, max);

  expect(randomNum).toBeGreaterThanOrEqual(min);
  expect(randomNum).toBeLessThanOrEqual(max);
});