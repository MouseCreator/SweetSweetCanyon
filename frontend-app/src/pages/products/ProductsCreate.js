
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from "../../components/products/ProductForm";

const CashierProfileSettingsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleSave = (form_output) => {
        // Logic for saving data
    };

    const handleCancel = () => {
    };
    const initialProduct = {
        id: 1,
        name: 'muffin',
        description: 'Delicious muffin',
        price: 20,
        pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HVuracEvP5iGSPPnsF69NRv32glS3eYWbQ&s'
    }
    return (
        <div className="cashier-page">
            <h1>Create New Product</h1>
            <ProductForm mode={'create'} initialProduct={initialProduct} onSubmit={handleSave} onCancel={handleCancel}/>
        </div>
    );
};

export default CashierProfileSettingsEdit;