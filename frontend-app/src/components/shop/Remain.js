import ProductSpec from "./ProductSpec";

export default function Remain({product_remain}) {
    const product = product_remain.product
    const remain = product_remain.remain

    const color = remain > 4 ? "green" : remain < 1 ? "red" : "orange"
    return (
        <div>
            <ProductSpec product={product} />
            <p style={{color: color}}>Remaining: {remain}</p>
        </div>
    )
}

