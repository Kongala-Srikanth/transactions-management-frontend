import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner';
import './index.css'

const TransactionFullDetails = (props) => {
    const [transactionDetails, setTransactionalDetails] = useState()
    const [loader, setLoader] = useState(true)
     
    useEffect(() => {
        const getTransactionDetails = async () => {
            const {match} = props
            const {params} = match
            const {id} = params
            console.log(id)
            const url =`https://transactions-management-backend-u1fz.onrender.com/api/transaction/${id}`
            const jwtToken = Cookies.get('jwt')

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            })

            if (response.ok){
                const data = await response.json()
                setTransactionalDetails(data[0])
                setLoader(false)
            }else{
                setLoader(true)
            }
            
        }
        getTransactionDetails()
    }, [])


   console.log(transactionDetails === undefined)

   return (
    <>
        {transactionDetails !== undefined ? (
            <div className="transaction-details-full-container">
                <div className="transaction-details-full">
                    <h2>Transaction Full Details</h2>
                    <div className="transaction">
                        <div className="transaction-row">
                            <span className="label">Transaction ID:</span>
                            <span className="value">{transactionDetails.transaction_id}</span>
                        </div>
                        <div className="transaction-row">
                            <span className="label">Amount:</span>
                            <span className="value">Rs: {transactionDetails.amount}</span>
                        </div>
                        <div className="transaction-row">
                            <span className="label">Transaction Type:</span>
                            <span className="value">{transactionDetails.transaction_type}</span>
                        </div>
                        <div className="transaction-row">
                            <span className="label">Status:</span>
                            <span className="value">{transactionDetails.status}</span>
                        </div>
                        <div className="transaction-row">
                            <span className="label">Timestamp:</span>
                            <span className="value">{transactionDetails.timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="error-page">
            <div className="products-loader-container">
                    <ThreeDots color="#0b69ff" height={50} width={50} />
                </div>
            </div>
        )}
    </>
);

}

export default TransactionFullDetails