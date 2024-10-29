import RemainingProducts from "../../components/shop/RemainingProducts";
import {useParams} from "react-router-dom";

export default function RemainingPage() {
    const { id } = useParams();
    return (
        <RemainingProducts shopId={id} />
    )
}