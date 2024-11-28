import './transactions.css'
import './../../static_controls/inputs.css'
import {useParams} from "react-router-dom";
import {useState} from "react";
function TransactionPageBtn({number, selected, side, text, onClick}) {
    const color = selected ? 'selected' : side ? 'side' : 'defs'
    const clicked = () => {
        onClick(number);
    }
    return (
        <div onClick={clicked} className={`no-select tr-btn ${color}`}>
            <div className={"tr-btn-in"}>
                {text}
            </div>
        </div>
    )
}

function numbersWindow(windowLength, pageStr, numPages) {
    let page = parseInt(pageStr);
    let arr = []
    if (numPages < windowLength || page < 0 || page >= numPages) {
        for (let i = 0; i < numPages; i=i+1) {
            arr.push(i);
        }
        return arr
    }
    const otherLength = windowLength - 1;
    const half = Math.floor(otherLength/2)
    const halfT = Math.ceil(otherLength/2)

    const wantedAfter = halfT;
    const wantedBefore = half;

    const actuallyAfter = numPages - page - 1
    const actuallyBefore = page

    const before = wantedBefore + Math.max(0, wantedAfter-actuallyAfter)
    const after = wantedAfter + Math.max(0, wantedBefore-actuallyBefore)

    let startIndex = Math.max(0, page-before);
    let endIndex = Math.min(numPages-1, page+after);
    for (let i = startIndex; i <= endIndex; i++) {
        arr.push(i);
    }
    return arr
}
export function TransactionPageControl({page, onPageChange, numPages}) {
    const window = 5;
    const windowArr = numbersWindow(window, page, numPages);
    const [innerPage, setInnerPage] = useState("")
    const onButtonClicked = (n) => {
        if (n < 0 || n >= numPages) {
            return
        }
        onPageChange(n);
    }
    const onInputChange = (input) => {
        if (input === "") {
            setInnerPage(input)
            return
        }
        if (input !== "") {
            const n = Number.parseInt(input)
            if (n < 1) {
                return
            }
            if (n > numPages) {
                return
            }
            onPageChange(Number.parseInt(input) - 1)
            setInnerPage(input)
        }
    }
    const pageR = parseInt(page)
    return (
        <div className={"tr-buttons-pan"}>
            <TransactionPageBtn number={0} text={"⏮️"} selected={false} side={true} onClick={onButtonClicked} />
            <TransactionPageBtn number={page-1} text={"◀️"} selected={false} side={true} onClick={onButtonClicked} />
            {
                windowArr.map((i)=>(<TransactionPageBtn key={`p-${i}`} number={i} side={false} selected={i===pageR} text={`${i+1}`} onClick={onButtonClicked} />))
            }
            <TransactionPageBtn number={page+1} text={"▶️"} selected={false} side={true} onClick={onButtonClicked} />
            <TransactionPageBtn number={numPages-1} text={"⏭️"} selected={false} side={true} onClick={onButtonClicked} />
            <input className={'gen-input ml-8'}
                   type={'number'}
                   min={1}
                   max={numPages}
                   value={innerPage}
                   onChange={(e)=>onInputChange(e.target.value)} />
        </div>
    )
}
