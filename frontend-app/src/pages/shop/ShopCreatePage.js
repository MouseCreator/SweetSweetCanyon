import MainLayout from "../../components/layout/Layout";
import ShopForm from "../../components/shop/form/ShopForm";
import {useNavigate} from "react-router-dom";
import {postShop} from "../../connect/connectShops";
import {usePopup} from "../../components/common/popup/PopupContext";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";


const ShopCreatePage = () => {

    const navigate = useNavigate();
    const { invokePopup, invokePopupTimeout } = usePopup();
    const { token } = useHighLevel()
    const handleSave = (form_output) => {
        postShop(form_output, token).then(
            (resp) => {
                if (resp.success) {
                    const atomic = {value: true};
                    invokePopupTimeout('Create request sent', 'green', atomic, 500);
                    atomic.value = false
                    invokePopup('Shop created!', 'green')
                    navigate('/shops/')
                } else {
                    invokePopup(resp.error, 'red')
                }
            }
        ).catch(() => invokePopup('An error occurred during creating the shop!', 'red'))
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