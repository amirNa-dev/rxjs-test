/**
 * Function to generate random numbers between 2 specific numbers
 * @param {float} min 
 * @param {float} max 
 */
const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}
export default getRandomArbitrary; 