import React from 'react';
import { API_URL } from '../../config'
import { handleResponse } from '../../helper'
import Loading from '../common/loading'
import Table from './Table';
import Pagination from './pagination'

import './table.css'

class List extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            page: 1,
            totalPages: 0
        }
    }
    componentDidMount() {
        this.fetchCurrencies()
    }
    fetchCurrencies() {
        const { page } = this.state
        this.setState({ loading: true })

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=10`)
            .then(handleResponse)
            .then((data) => {
                const { totalPages, currencies } = data;
                this.setState({
                    currencies: currencies,
                    loading: false,
                    totalPages: totalPages
                })
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false
                })
            });
    }

    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
        this.setState({ page: nextPage }, () => this.fetchCurrencies())
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;
        if (loading) { return <div className="loading-container"><Loading /></div> }
        if (error) {
            return (<div className='error'>
                {error}
            </div>)
        }
        return <div className='Table-container'>
            <Table currencies={currencies} />
            <Pagination handlePaginationClick={this.handlePaginationClick} page={page} totalPages={totalPages} />
        </div>
    }
}

export default List;