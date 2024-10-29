

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