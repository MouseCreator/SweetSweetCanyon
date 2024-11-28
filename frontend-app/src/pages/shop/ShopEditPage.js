import {useNavigate, useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import ShopForm from "../../components/shop/form/ShopForm";
import {usePopup} from "../../components/common/popup/PopupContext";
import {getShopById, updateShop} from "../../connect/connectShops";
import {useEffect, useState} from "react";
import {GlobalErrorPage} from "../../components/common/errors/GlobalErrorPage";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

const ShopEditPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const { invokePopup, invokePopupTimeout } = usePopup();
    const [globalError, setGlobalError] = useState('Pending...');
    const { token } = useHighLevel()
    const initialShop = {
        id: id,
        name: '',
        description: '',
        address: '',
        workingHours: '',
        pictureUrl: ''
    }
    const [shop, setShop] = useState(initialShop);
    useEffect(()=>{
        getShopById(id).then((r)=>{
            if (r.success) {
                setShop(r.data)
                setGlobalError(null);
            } else {
                setGlobalError(r.error)
            }
        }).catch(()=>{setGlobalError('Error! Cannot get shop from the server')})
    }, [id])
    const handleSave = (form_output) => {
        const newShop = {...form_output, id: id}
        updateShop(newShop, token).then(
            (resp) => {
                if (resp.success) {
                    const atomic = {value: true};
                    invokePopupTimeout('Update request sent', 'green', atomic, 500);
                    atomic.value = false
                    invokePopup('Shop updated!', 'green')
                    navigate('/shops/')
                } else {
                    invokePopup(resp.error, 'red')
                }
            }
        ).catch(() => invokePopup('An error occurred during updating the shop!', 'red'))
    };

    const handleCancel = () => {
        navigate(`/shops/${id}`)
    };

    if (globalError !== null) {
        return <GlobalErrorPage text={globalError}/>
    }

    return (
        <MainLayout>
            <div className="form-around">
                <h1 className={"from-title"}>Edit Shop</h1>
                <main className={"form-contents"}>
                    <div className={"form-line"}></div>
                    <ShopForm initialShop={shop} onSubmit={handleSave} onCancel={handleCancel} mode={'edit'} />
                </main>
            </div>

        </MainLayout>
    )
}
export default ShopEditPage