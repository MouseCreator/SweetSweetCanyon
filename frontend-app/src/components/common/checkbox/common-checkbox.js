import "./common-checkbox.css"

export function CommonCheckbox({state, size, theme, onChange}) {
    return (
        <span className={"align-middle"} onClick={onChange}>
            <label className={`prod-checkbox ${theme} ${size}`}>
                <input
                    type="checkbox"
                    disabled={true}
                    checked={state}
                />
                <span className="checkmark"></span>
            </label>
        </span>
    )
}