import "./error.css"
export function GlobalError({text}) {
    return (
        <div className={"global-error"}>
            <h1 className={"global-error-text"}>{text}</h1>
        </div>
    )
}