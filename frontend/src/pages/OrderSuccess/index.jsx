import { useLocation } from 'react-router-dom';
import SuccessContent from './components/SuccessContent';

export default function OrderSuccess() {
    const location = useLocation();
    const orderId = location.state?.orderId || "9fc96c9a-9c35-4cbd-a050-3480995766a2";

    return <SuccessContent orderId={orderId} />;
}
