
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from "../../components/products/ProductForm";
import MainLayout from "../../components/layout/Layout";
import {useEffect, useState} from "react";
import {ErrorOverlay} from "../../components/common/errors/ErrorOverlay";
import {usePopup} from "../../components/common/popup/PopupContext";
import {getProductById, updateProduct} from "../../connect/connectProducts";
import {GlobalError} from "../../components/common/errors/GlobalError";
import {GlobalErrorPage} from "../../components/common/errors/GlobalErrorPage";

const ProductCreate = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [globalError, setGlobalError] = useState("Pending...");
    const {id} = useParams();
    const { invokePopup, invokePopupTimeout } = usePopup();
    const [initialProduct, setInitialProduct] = useState(null);
    const handleSave = async (form_output) => {
        let atomic = { value: true };
        invokePopupTimeout('Edit request sent!', 'green', atomic, 200);
        const updatedProduct = {...form_output, id: id}
        const response = await updateProduct(updatedProduct);
        atomic.value = false;
        if (response.success) {
            invokePopup('Product updated!', 'green');
            navigate('/products/')
        } else {
            setError(response.error);
        }
    };

    useEffect(()=>{
         getProductById(id).then(
             (product) => {
                 if (product.success) {
                     setInitialProduct(product.data);
                     setGlobalError(null);
                 } else {
                     setGlobalError('Cannot get product from server');
                 }
             }
        ).catch(e => setGlobalError("Page error"));

    },[id])


    const handleCancel = () => {
        navigate(`/products/` + id)
    };
    if (globalError !== null) {
        return <GlobalErrorPage text={globalError}/>
    }
    return (
        <MainLayout>
            <div className="form-around">
                <h1 className={"from-title"}>Edit Product</h1>
                <main className={"form-contents"}>
                    <div className={"form-line"}></div>
                    <ProductForm mode={'edit'} initialProduct={initialProduct} onSubmit={handleSave} onCancel={handleCancel}/>
                </main>
            </div>
            <ErrorOverlay error={error} setError={setError} />
        </MainLayout>
    );
};

export default ProductCreate;