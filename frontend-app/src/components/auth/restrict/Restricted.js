import "./../auth.css"
export function Restricted() {
    return (<div className={'auth-err-message'}>
        403. Access denied
    </div>)
}