export const calculatePrice = (selectedProducts) => {
    return selectedProducts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.product.price * currentValue.amount,
        0)
}