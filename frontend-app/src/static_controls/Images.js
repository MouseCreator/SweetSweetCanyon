
export function LogoImage() {
    const sweet = require("./../images/Sweet.jpg");
    return (
        <div className={"sweet-img-wrapper"}>
            <img src={sweet} className={"sweet-img"} alt={"Sweet Sweet Canyon"} />
        </div>
    )
}

export function NoProductUrl() {
    return require("./../images/missing-cookie.jpg");
}

export function NoShopUrl() {
    return require("./../images/missing-shop.jpg");
}