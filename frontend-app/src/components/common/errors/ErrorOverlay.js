import {OverlayBase} from "../../overlay/OverlayBase";
import "./error.css"
import "./../../../static_controls/inputs.css"
export function ErrorOverlay({error, setError}) {
    const onClose = () => {
        setError(null);
    }
    return (
        <OverlayBase onClose={onClose} isActive={error}>
            <div className={"error-frame"}>
                <div className={"error-text"}>Error</div>
                <p className={"error-tt"}>{error}</p>
                <button className={"gen-button"} onClick={onClose}>Back</button>
            </div>
        </OverlayBase>
    )
}