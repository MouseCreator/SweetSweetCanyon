
import { useNavigate } from 'react-router-dom';
import ProductForm from "../../components/products/ProductForm";
import MainLayout from "../../components/layout/Layout";

const ProductCreate = () => {
    const navigate = useNavigate();
    const handleSave = (form_output) => {
    };

    const handleCancel = () => {
        navigate('/products/')
    };
    const initialProduct = {
        id: 1,
        name: 'muffin',
        description: 'Delicious muffin',
        price: 20,
        deliveryPrice: 18,
        pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HVuracEvP5iGSPPnsF69NRv32glS3eYWbQ&s'
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
        </MainLayout>
    );
};

export default ProductCreate;