import {MediumProductImage} from "../products/ProductImage";

function ProductSpec({product}) {
    return (
        <dvi>
            <MediumProductImage url={product.pictureUrl} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price} $</p>
        </dvi>
    )
}

export default ProductSpec