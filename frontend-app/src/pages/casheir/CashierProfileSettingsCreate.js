
import { useNavigate } from 'react-router-dom';
import CashierForm from "../../components/cashier/CashierForm";
const CashierProfileSettingsEdit = () => {
    const navigate = useNavigate();
    const handleSave = (form_output) => {
        // Logic for saving data
        alert(`Saved! 
         Name: ${form_output.name}, 
         Shop: ${form_output.shop}, 
         Phone: ${form_output.phone},
         Email: ${form_output.email}`);
        navigate('/cashiers/1')
    };

    const handleCancel = () => {
        navigate('/cashiers/')
    };
    const initial = {
        name: '',
        email: '',
        phone: '',
        shop: -1,
    }
    return (
        <div className="cashier-page">
            <h1>Create New Cashier</h1>
            <CashierForm initial={ initial } mode={'create'} onSubmit={handleSave} onCancel={handleCancel}/>
        </div>
    );
};

export default CashierProfileSettingsEdit;