export default function toFixedNumber(value: number, fixed: number = 2) {
  fixed = Math.pow(10, fixed);
  return Math.floor(value * fixed) / fixed;
}
