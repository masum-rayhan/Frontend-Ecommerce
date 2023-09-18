import { useLocation } from "react-router-dom";

 const Payment = () => {
    const {
        state: { apiResult, userInput },
    } = useLocation();
    
  return (
    <div>payment-component</div>
  )
}

export default Payment
