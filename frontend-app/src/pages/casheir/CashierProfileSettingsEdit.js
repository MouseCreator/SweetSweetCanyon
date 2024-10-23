
import { useNavigate, useParams } from 'react-router-dom';
import CashierForm from "../../components/cashier/CashierForm";
const CashierProfileSettingsEdit = () => {
    const { id } = useParams();
    const handleSave = ({name, shop, phone}) => {
        // Logic for saving data
        alert(`Saved! Name: ${name}, Shop: ${shop}, Phone: ${phone}`);
    };
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/cashiers/' + id)
    };

    return (
        <div className="cashier-page">
            <h1>Edit Cashier's Data</h1>
            <CashierForm cashierId={id} mode={'create'} onSubmit={handleSave} onCancel={handleCancel}/>
        </div>
    );
};

export default CashierProfileSettingsEdit;