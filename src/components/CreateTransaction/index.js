import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './index.css'

const CreateTransaction = () => {
    const [amount, setAmount] = useState(0)
    const [transactionType, setTransactionType] = useState('DEPOSIT')
    const [userId, setUserId] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [userDetails, setUserDetails] = useState()


    useEffect(() => {
        const getUserDetails = async () => {
            const jwtToken = Cookies.get('jwt')
            const url = 'https://transactions-management-backend-u1fz.onrender.com/user/account'
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            })

            if (response.ok){
                const data = await response.json()
                setUserDetails(data)
            } else {
                setErrorMsg('User Details Not Finding')
            }
        }
        getUserDetails()
    }, [])

    

    const onSubmitTransaction = async (event) => {
        event.preventDefault()
        const url = "https://transactions-management-backend-u1fz.onrender.com/api/transactions" 
        if (amount < 1){
            setErrorMsg('Enter Your Amount')
            return
        }   
        const transactionDetails = {
            amount: parseFloat(amount),
            transaction_type: transactionType,
            user: userDetails.id
        }
        const jwtToken = Cookies.get('jwt')

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(transactionDetails)
        })

        const data = await response.json()
        
        if (response.ok){
            setAmount(0)
            setUserId('')
            setTransactionType('DEPOSIT')
            setErrorMsg('')
            setSuccessMsg(data.message)
        } else {
            setErrorMsg(data.errorMsg)
            setSuccessMsg('')
        }
    }


    return(
        <div className="create-transaction">
            <h2>Create Transaction</h2>
            <form className="form" onSubmit={onSubmitTransaction}>
            <label htmlFor="userId">User Id</label>
                <input type="text" value={userDetails !== undefined ? userDetails.id : ''} id="userId" name="userId" placeholder="Enter User Id" required/>
                
                <label htmlFor="amount">Amount</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} id="amount" name="amount" placeholder="Enter amount" required/>
                
                <label htmlFor="type">Transaction Type</label>
                <select id="type" value={transactionType} name="transaction_type" onChange={e => setTransactionType(e.target.value)}>
                    <option value="DEPOSIT">DEPOSIT</option>
                    <option value="WITHDRAWAL">WITHDRAWAL</option>
                </select>
                
                <button type="submit">Transfer</button>
            </form>
            {
                errorMsg && <p className='error-msg'>{errorMsg}</p>
            }
            {
                successMsg && <p className='success-msg'>{successMsg}</p>
            }
        </div>

    )
}

export default CreateTransaction