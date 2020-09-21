import React from 'react';
import { API_URL } from '../../config'
import { handleResponse, renderChengePercent } from '../../helper'
import Loading from '../common/loading'
import { Link } from 'react-router-dom'

import './Detail.css'

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            currency: {},
            error: null
        }
    }
    componentDidMount() {
        const currencyId = this.props.match.params.id;
        this.fetchCurrency(currencyId)
    }
    fetchCurrency(currencyId) {
        this.setState({ loading: true })
        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then((currency) => {
                this.setState({
                    loading: false,
                    currency: currency
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error.errorMessage
                })
            })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const newCurrencyId = nextProps.match.params.id
            this.fetchCurrency(newCurrencyId)
        }
    }
    render() {
        const { loading, currency, error } = this.state;
        if (loading) {
            return (<div className="loading-container"><Loading /></div>)
        } else if (error) {
            return (<div className="error">{error}</div>)
        } else {
            const { id, name, marketCap, price, rank, percentChange24h, symbol, totalSupply, volume24h } = currency;
            return (
                <div className="Detail">
                    <h1 className="Detail-heading">{name}: ({symbol})</h1>
                    <div className="Detail-container">
                        <div className="Detail-item">
                            rank <span className="Detail-value"> <span className="Detail-dollar">{rank}</span> {id}</span>
                        </div>
                        <div className="Detail-item">
                            price <span className="Detail-value"><span className="Detail-dollar">$</span> {price}</span>
                        </div>
                        <div className="Detail-item">
                            24h change <span className="Detail-value"> {renderChengePercent(percentChange24h)}</span>
                        </div>
                        <div className="Detail-item">
                            <span className="Detail-title">Market Cap</span><span className="Detail-dollar">$</span> {marketCap}
                        </div>
                        <div className="Detail-item">
                            <span className="Detail-title"> Volume 24h</span><span className="Detail-dollar">$</span> {volume24h}
                        </div>
                        <div className="Detail-item">
                            <span className="Detail-title">  Total Supply</span><span className="Detail-dollar">$</span>{totalSupply}
                        </div>
                    </div>
                    <div className="NotFound">
                        <Link className="NotFound-link" to="/">go to home page</Link>
                    </div>
                </div>
            )
        }
    }
}

export default Detail