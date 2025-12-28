import { useLocation } from 'react-router-dom';
import SuccessContent from './components/SuccessContent';

export default function OrderSuccess() {
    const location = useLocation();
    //get the real order id passed from detailsform insted of fake mock id
    const orderId = location.state?.orderId;

    return <SuccessContent orderId={orderId} />;
}