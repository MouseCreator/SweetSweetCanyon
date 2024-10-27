
import { useNavigate, useParams } from 'react-router-dom';
import CashierForm from "../../components/cashier/CashierForm";
const CashierProfileSettingsEdit = () => {
    const { id } = useParams();
    const handleSave = (form_output)=> {
        // Logic for saving data
        alert(`Saved! 
         Name: ${form_output.name}, 
         Shop: ${form_output.shop}, 
         Phone: ${form_output.phone},
         Email: ${form_output.email}`);
        navigate('/cashiers/1')
    };
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/cashiers/' + id)
    };

    const initial = {
        name: 'John',
        email: 'john@mail.com',
        phone: '+3805050505',
        shop: -1,
    } //MOCK: fetch cashier by id

    return (
        <div className="cashier-page">
            <h1>Edit Cashier's Data</h1>
            <CashierForm initial={initial} mode={'create'} onSubmit={handleSave} onCancel={handleCancel}/>
        </div>
    );
};

export default CashierProfileSettingsEdit;