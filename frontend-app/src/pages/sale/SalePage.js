import ProductSelector from "../../components/products/ProductSelector";

function SalePage() {
    const confirmAction = (selectedProducts) => {

    }
    return (
        <ProductSelector confirmAction={confirmAction} />
    )
}
export default SalePage