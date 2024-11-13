import MainLayout from "../../components/layout/Layout";
import ShopForm from "../../components/shop/form/ShopForm";
import {useNavigate} from "react-router-dom";


const ShopCreatePage = () => {

    const navigate = useNavigate();
    const handleSave = (form_output) => {
    };

    const handleCancel = () => {
        navigate('/shops/')
    };
    const initialShop = {
        name: '',
        description: '',
        address: '',
        workingHours: '',
        pictureUrl: ''
    }
    return (
        <MainLayout>
            <div className="form-around">
                <h1 className={"from-title"}>Create New Shop</h1>
                <main className={"form-contents"}>
                    <div className={"form-line"}></div>
                    <ShopForm initialShop={initialShop} onSubmit={handleSave} onCancel={handleCancel} mode={'create'} />
                </main>
            </div>
        </MainLayout>
    )
}
export default ShopCreatePage