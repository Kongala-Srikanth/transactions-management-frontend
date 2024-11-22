import {Link} from 'react-router-dom'

import './index.css'


const Home = () => {
    return(
        <div className="home-container">
        <header className="navbar">
            <h1>Online Transactions</h1>
        </header>
        <main className="home-content">
            <h2>Welcome to Your Account</h2>
            <div className="button-group">
                <Link to='/transaction'><button className="action-button">Money Transfer</button></Link>
                <Link to='/transactions'><button className="action-button">Transaction History</button></Link>
                <Link to='/profile'><button className="action-button">Profile</button></Link>
            </div>
        </main>
    </div>
    )
}

export default Home