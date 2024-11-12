import "./shop.css"

export function ShopSimpleItem({shopInfo}) {
    const name = shopInfo.name;
    const address = shopInfo.address;
    return (
        <div className={"shop-simple-item"}>
            <h3 className={"shop-simple-title"}>{name}</h3>
            <p className={"shop-address-imp"}>{address}</p>
        </div>
    )
}