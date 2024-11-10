
const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
export const formatDate = (date) => {
    return `${
        padL(date.getDate()+1)}.${
        padL(date.getMonth())}.${
        date.getFullYear()} ${
        padL(date.getHours())}:${
        padL(date.getMinutes())}:${
        padL(date.getSeconds())}`
}

export const formatPrice = (price) => {
    return `${price.toFixed(2)} $`;
}