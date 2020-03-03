import React from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {renderChengePercent} from '../../helper'

const Table = (props) => {
    const {currencies, history} = props;
    return (
        <div>
            <table className='Table'>
                <thead className='Table-head'>
                <tr>
                    <th>Cryptocurrencies</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>24H. change</th>
                </tr>
                </thead>
                <tbody className='Table-body'>
                    {currencies.map((currency) => (
                        <tr key={currency.rank} onClick={()=>(history.push(`/currency/${currency.id}`))}>
                            <td>
                                <span className='Table-dollar'> {currency.rank}. </span>
                                {currency.id}
                            </td>
                            <td>
                                <span className='Table-dollar'>$ </span> {currency.price}
                            </td>
                            <td>
                                <span className='Table-dollar'>$ </span> {currency.marketCap}
                            </td>
                            <td>
                                {renderChengePercent(currency.percentChange24h)}
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}
Table.propTypes={
    currencies: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
}
export default withRouter(Table)