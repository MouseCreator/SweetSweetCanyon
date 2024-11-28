
import { useNavigate } from 'react-router-dom';
import ProductForm from "../../components/products/ProductForm";
import MainLayout from "../../components/layout/Layout";
import {postProduct} from "../../connect/connectProducts";
import {useState} from "react";
import {ErrorOverlay} from "../../components/common/errors/ErrorOverlay";
import {usePopup} from "../../components/common/popup/PopupContext";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

const ProductCreate = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { invokePopup, invokePopupTimeout } = usePopup();

    const { token } = useHighLevel()
    const handleSave = async (form_output) => {
        let atomic = { value: true };
        invokePopupTimeout('Create request sent!', 'green', atomic, 200);
        const response = await postProduct(form_output, token);
        atomic.value = false;
        if (response.success) {
            invokePopup('Product created!', 'green');
            navigate('/products/')
        } else {
            setError(response.error);
        }
    };

    const handleCancel = () => {
        navigate('/products/')
    };
    const initialProduct = {
        name: '',
        description: '',
        price: 0,
        deliveryPrice: 0,
        pictureUrl: ''
    }
    return (
        <MainLayout>
            <div className="form-around">
                <h1 className={"from-title"}>Create New Product</h1>
                <main className={"form-contents"}>
                    <div className={"form-line"}></div>
                    <ProductForm mode={'create'} initialProduct={initialProduct} onSubmit={handleSave} onCancel={handleCancel}/>
                </main>
            </div>
            <ErrorOverlay error={error} setError={setError} />
        </MainLayout>
    );
};

export default ProductCreate;