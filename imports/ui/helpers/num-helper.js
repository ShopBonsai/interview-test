/**
 * Round a number to exactly a certain decimal place (ie 1.2 -> 1.20, 1.123 -> 1.12)
 * @param  {Number} num
 * @param  {Number} decimal
 * @return {String}
 */
export function roundExactly(num, decimal) {
  return Number(Math.round(num + "e" + decimal) + "e-" + decimal).toFixed(decimal);
}
