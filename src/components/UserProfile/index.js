import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './index.css'

const UserProfile = () => {

    const [userDetails, setUserDetails] = useState()
    const [errorMsg, setErrorMsg] = useState('')
    const history = useHistory()

    const onLogoutBtn = () => {
        Cookies.remove('jwt')
        history.push('/login')
    }
    

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



     return(
        <>

        {
            userDetails !== undefined ? 
            <div className='user-profile-container'>
            <div className="user-profile">
                <div className="user-header">
                    <div className="user-logo">{userDetails.username[0]}</div>
                    <h2 className="username">{userDetails.username.toUpperCase()}</h2>
                </div>
                <div className="user-details">
                    <div className="user-detail">
                        <span className="label">User ID:</span>
                        <span className="value">{userDetails.id.slice(0,15)}*******</span>
                    </div>
                    <div className="user-detail">
                        <span className="label">Email:</span>
                        <span className="value">{userDetails.email}</span>
                    </div>
                    <div className="user-detail">
                        <span className="label">Balance:</span>
                        <span className="value">₹{userDetails.balance}</span>
                    </div>
                </div>
                <button className="logout-button" onClick={onLogoutBtn}>Logout</button>
            </div>
            </div> : 
            <div className="error-page">
            <div className="products-loader-container">
                    <ThreeDots color="#0b69ff" height={50} width={50} />
                </div>
            </div>
        }
        </>
     )
}

export default UserProfile