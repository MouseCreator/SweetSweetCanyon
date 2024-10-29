import Remain from "./Remain";

function RemainingProducts({shopId}) {

    const remaining = [
        {
            product:  {
                id: 4,
                name: 'muffins',
                description: 'tasty',
                price: 25,
                pictureUrl: 'https://www.allrecipes.com/thmb/RdyL1EgIB0Qq_fr5HjdsAmcpMlU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228553-moist-chocolate-muffins-DDMFS-4x3-a9f73a46938547c99d921613dc167741.jpg'
            },
            remain: 2,
        },
        {
            product:   {
                id: 2,
                name: 'cake',
                description: 'looks good',
                price: 20,
                pictureUrl: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-threeByTwoMediumAt2X.jpg'
            },
            remain: 0,
        },
    ] // MOCK: get remaining products by shop

    return (
        <div>
            {
                remaining.map((rm) => (
                    <Remain product_remain={rm} />
                ))
            }
        </div>
    )
}

export default RemainingProducts