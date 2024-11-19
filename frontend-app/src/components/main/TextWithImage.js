import "./mainpage.css"
export function TextWithImage({imageSource, text, align}) {

    return (
        <div className={`mp-content ${align}`}>
            <div className={"mp-side-text"}>
                {text}
            </div>
            <div className={"mp-side-img"}>
                <div className={"image-container"}>
                    <img alt={"Our products"} src={imageSource} />
                </div>
            </div>
        </div>
    )
}