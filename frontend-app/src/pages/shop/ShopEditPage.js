import {useNavigate, useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import ShopForm from "../../components/shop/form/ShopForm";

const ShopEditPage = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const handleSave = (form_output) => {
    };

    const handleCancel = () => {
        navigate(`/shops/${id}`)
    };
    const initialShop = {
        id: id,
        name: 'Shop 1',
        description: 'Desc',
        address: 'Sw st',
        workingHours: '9:00-11:00',
        pictureUrl: ''
    }
    return (
        <MainLayout>
            <div className="form-around">
                <h1 className={"from-title"}>Edit Shop</h1>
                <main className={"form-contents"}>
                    <div className={"form-line"}></div>
                    <ShopForm initialShop={initialShop} onSubmit={handleSave} onCancel={handleCancel} mode={'create'} />
                </main>
            </div>
        </MainLayout>
    )
}
export default ShopEditPage