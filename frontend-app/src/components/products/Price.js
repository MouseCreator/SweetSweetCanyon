export const calculatePrice = (selectedProducts, getPrice) => {
    return selectedProducts.reduce(
        (accumulator, currentValue) => accumulator + getPrice(currentValue.product) * currentValue.amount,
        0)
}