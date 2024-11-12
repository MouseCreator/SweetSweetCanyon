import {NoShopUrl} from "../../../static_controls/images.js";
import '../shop.css'
export function ShopImage({pictureUrl, name, size}) {
    return (
        <div className={"shop-component-image-wrap"}>
            {
                pictureUrl == null || pictureUrl === '' ?
                    (<img className={`shop-component-image ${size} shop-image-fit`} src = {NoShopUrl()} alt={name}></img>) :
                    (<img className={`shop-component-image ${size} shop-image-fit`} src={ pictureUrl } alt={name} />)
            }
        </div>
    )
}