import {NoProductUrl} from "../../static_controls/Images";


export function StaticProductImage({url, sizePx, alt="product"}) {
    return (
        <div>
            {
                url === '' ? (
                    <div></div>
                ) : (
                    <img src={url} alt={alt} style={{width: sizePx, height: sizePx}} />
                )
            }
        </div>
    )
}

export function MediumProductImage({url, sizePx, alt="product"}) {
    return (
        <StaticProductImage url={url} sizePx={60} alt={alt} />
    )
}

export function ProductImage({pictureUrl, name, size}) {
    return (
        <div className={"product-component-image-wrap"}>
            {
                pictureUrl == null ?
                    (<img className={`product-component-image ${size} product-image-fit`} src = {NoProductUrl()} alt={name}></img>) :
                    (<img className={`product-component-image ${size} product-image-fit`} src={ pictureUrl } alt={name} />)
            }
        </div>
    )
}