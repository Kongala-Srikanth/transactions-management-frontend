import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import './index.css';
import { FaArrowCircleRight } from "react-icons/fa";

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionDetails: undefined,
            userId: '',
            errorMsg: '',
            status: ''
        };
    }

    componentDidMount() {
        this.getUserDetails();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.userId !== this.state.userId && this.state.userId) {
            this.getTransactionDetails();
        }
    }

    getUserDetails = async () => {
        const jwtToken = Cookies.get('jwt');
        const url = 'https://transactions-management-backend-u1fz.onrender.com/user/account';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            this.setState({ userId: data.id });
        } else {
            this.setState({ errorMsg: 'Something went wrong' });
        }
    };

    getTransactionDetails = async () => {
        const { userId } = this.state;
        const url = `https://transactions-management-backend-u1fz.onrender.com/api/transactions/${userId}`;
        const jwtToken = Cookies.get('jwt');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            this.setState({ transactionDetails: data.transactions });
        } else {
            this.setState({ errorMsg: 'Failed to load transactions' });
        }
    };

    onUpdateStatus = async (transactionId) => {
        const { status } = this.state;
        const url = `https://transactions-management-backend-u1fz.onrender.com/api/transactions/${transactionId}`;
        const jwtToken = Cookies.get('jwt');
        const statusUpdated = { status };

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(statusUpdated)
        });
        this.setState({status: status}, this.getTransactionDetails)
    };

    render() {
        const { transactionDetails, errorMsg, status } = this.state;

        return (
            <>
                {transactionDetails !== undefined ? (
                    <>
                        <div className="transaction-container-lg">
                            <h2 className="transaction-heading">Transaction History</h2>
                            <div className="transaction-list">
                                <table className="transaction-table">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Transaction ID</th>
                                            <th className="table-header">User ID</th>
                                            <th className="table-header">Transaction Type</th>
                                            <th className="table-header">Amount</th>
                                            <th className="table-header">Status</th>
                                            <th className="table-header">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionDetails.map(each => (
                                            <tr key={each.transaction_id}>
                                                <td className="table-data">{each.transaction_id}</td>
                                                <td className="table-data">{each.user}</td>
                                                <td className="table-data">{each.transaction_type}</td>
                                                <td className="table-data">₹{each.amount}</td>
                                                <td className="table-data">
                                                    {
                                                        each.status.toUpperCase() === 'PENDING' ? <select
                                                        value={each.status}
                                                        onChange={e => {
                                                            this.setState({ status: e.target.value }, () => {
                                                                this.onUpdateStatus(each.transaction_id);
                                                            });
                                                        }}
                                                        className="status-selection-lg"
                                                    >
                                                        <option value="PENDING">Pending</option>
                                                        <option value="FAILED">Failed</option>
                                                        <option value="COMPLETED">Completed</option>
                                                    </select> : <select
                                                        value={each.status}
                                                        className="status-selection-lg"
                                                    >
                                                        <option value="PENDING" disabled>Pending</option>
                                                        <option value="FAILED" disabled>Failed</option>
                                                        <option value="COMPLETED" disabled>Completed</option>
                                                    </select>
                                                    }
                                                    
                                                </td>
                                                <td className="table-data time-date-container">{each.timestamp}
                                                    <Link to={`/transaction/details/${each.transaction_id}`} className="link">
                                                        <button className="hide-btn">
                                                            <FaArrowCircleRight className="arrow-icon" />
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="transaction-container-sm">
                            <h2 className="transaction-heading">Transaction History</h2>
                            <ul className="transaction-container-data-sm">
                                {transactionDetails.map(each => (
                                    <li className="each-row-data-sm" key={each.transaction_id}>
                                        <div className="each-row-sm">
                                            <p className="heading-names">Transaction Type: </p>
                                            <p className="value-names">{each.transaction_type}</p>
                                        </div>
                                        <div className="each-row-sm">
                                            <p className="heading-names">Amount: </p>
                                            <p className="value-names">₹{each.amount}</p>
                                        </div>
                                        <div className="each-row-sm">
                                            <p className="heading-names">Status: </p>
                                            {
                                                each.status.toUpperCase() === 'PENDING' ? <select
                                                value={each.status}
                                                onChange={e => {
                                                    this.setState({ status: e.target.value }, () => {
                                                        this.onUpdateStatus(each.transaction_id);
                                                    });
                                                }}
                                                className="status-selection"
                                            >
                                                <option value="PENDING">Pending</option>
                                                <option value="FAILED">Failed</option>
                                                <option value="COMPLETED">Completed</option>
                                            </select> : <select
                                                value={each.status}
                                                className="status-selection"
                                            >
                                                <option value="PENDING" disabled>Pending</option>
                                                <option value="FAILED" disabled>Failed</option>
                                                <option value="COMPLETED" disabled>Completed</option>
                                            </select>
                                            }
                                            
                                        </div>
                                        <div className="each-row-sm">
                                            <p className="heading-names">Timestamp: </p>
                                            <p className="value-names">{each.timestamp}</p>
                                        </div>
                                        <Link to={`/transaction/details/${each.transaction_id}`} className="link">
                                            <button className="hide-btn">
                                                <FaArrowCircleRight className="arrow-icon" />
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
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
}

export default TransactionHistory;
