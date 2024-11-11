import {useState} from "react";
import ProductSimple from "./ProductSimple";
import "./simple.css"
const MOCK_PRODUCTS = [ //MOCK: from server
    {
        id: 1,
        name: 'cookie',
        price: 10,
        pictureUrl: 'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2700,h_2700,c_limit/chocolate-chip-cookie.jpg'
    },
    {
        id: 2,
        name: 'cake',
        price: 20,
        pictureUrl: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-threeByTwoMediumAt2X.jpg'
    },
    {
        id: 3,
        name: 'tasty marshmallow colors',
        price: 30,
        pictureUrl: 'https://static.toiimg.com/thumb/52762770.cms?imgsize=65333&width=800&height=800'
    },
    {
        id: 4,
        name: 'muffins',
        price: 25,
        pictureUrl: 'https://www.allrecipes.com/thmb/RdyL1EgIB0Qq_fr5HjdsAmcpMlU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228553-moist-chocolate-muffins-DDMFS-4x3-a9f73a46938547c99d921613dc167741.jpg'
    },
    {
        id: 5,
        name: 'mint candies',
        price: 10,
        pictureUrl: 'https://5.imimg.com/data5/LL/LL/GLADMIN-/mint-candy-250x250.jpg'

    },
    {
        id: 6,
        name: 'Product with no image',
        price: 10,
        pictureUrl: null
    }
]

export function ProductSimpleListing() {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    return (
        <div>
            <div className={"simple-container"}>
            {

                products.map((p) => (
                    <ProductSimple product={p} />
                ))

            }
            </div>
        </div>
    )
}