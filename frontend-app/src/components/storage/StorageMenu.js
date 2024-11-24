import "./../../static_controls/inputs.css"
export function StorageMenu({shop, onSubmit, onBack}) {
    return (
        <div className={"flex items-center flex-col justify-between h-full p-2"}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"store-title"}>{shop.name}</h1>
                <p>Manage shop.</p>
            </div>
            <div className={"store-buttons"}>
                <button className={"gen-button pink"} onClick={onSubmit}>Submit</button>
                <button className={"gen-button"} onClick={onBack}>Back</button>
            </div>
        </div>
    )
}