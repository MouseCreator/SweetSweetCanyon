
import { useNavigate, useParams } from 'react-router-dom';
import CashierForm from "../../components/cashier/CashierForm";
const CashierProfileSettingsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleSave = (form_output) => {
        // Logic for saving data
        alert(`Saved! 
         Name: ${form_output.name}, 
         Shop: ${form_output.shop}, 
         Phone: ${form_output.phone},
         Email: ${form_output.email}`);
        navigate('/cashiers/' + id)
    };

    const handleCancel = () => {
        navigate('/cashiers/' + id)
    };

    return (
        <div className="cashier-page">
            <h1>Create New Cashier</h1>
            <CashierForm cashierId={id} mode={'create'} onSubmit={handleSave} onCancel={handleCancel}/>
        </div>
    );
};

export default CashierProfileSettingsEdit;