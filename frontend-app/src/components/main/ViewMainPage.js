import {MainHeading} from "./MainHeading";
import "./mainpage.css"
import {TextWithImage} from "./TextWithImage";
import {MainFooter} from "./MainFooter";
export function ViewMainPage() {
    const text1 = "Nestled at the intersection of whimsy and indulgence, Sweet Sweet Canyon is more than a confectionery—it's a portal to a world where every bite feels like magic. Here, sugar dances, chocolate flows like rivers, and the air hums with the melody of freshly baked delights."
    const text2 = "Our creations are legendary, crafted with passion, precision, and ingredients so pure they’d make nature blush. From our signature caramel cascades that melt on your tongue to jewel-like bonbons that crackle with surprise, each treat is a masterpiece designed to dazzle your senses. Our fudge is as smooth as silk, our macarons are clouds of flavor, and our hand-pulled taffy? It's poetry in sugar form."
    const text3 = "Step into Sweet Sweet Canyon, where the shelves glimmer with edible treasures, the aroma wraps you in a warm hug, and every treat whispers the promise of the best confectionery experience in the world. Once you taste our magic, there’s no turning back—because Sweet Sweet Canyon isn’t just a place; it’s a feeling you’ll carry forever."
    const image1 = require("../../images/main-1.jpg");
    const image2 = require("../../images/main-2.jpg");
    const image3 = require("../../images/main-3.jpg");
    return (
        <div className={"mp-flex"}>
            <MainHeading />
            <div className={"mp-pause"} />
            <div className={"mp-fill"}>
                <TextWithImage text={text1} imageSource={image1} align={"left"} />
                <TextWithImage text={text2} imageSource={image2} align={"right"} />
                <TextWithImage text={text3} imageSource={image3} align={"left"} />
            </div>
            <MainFooter />
        </div>
    )
}