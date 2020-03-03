import React from 'react';
import {API_URL} from '../../config'
import {handleResponse} from '../../helper'
import Loading from './loading'
import {withRouter} from 'react-router-dom'

import './Search.css'

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            searchQuery: "",
            loading: false,
            searchResult: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
    }

handleChange(event){
    const searchQuery = event.target.value;
    this.setState({
        searchQuery: searchQuery,
        loading: true
    })
    if(!searchQuery){
        this.setState({
            loading: false
        })
        return ""
    }
    // this.setState({loading : true })
    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
    .then(handleResponse)
    .then((result)=>{
        this.setState({
            loading: false,
            searchResult: result
        })
    })
}
renderSearchResults(){
    const {loading, searchResult, searchQuery} = this.state;
    if(!searchQuery) {
        return ""
    } 
    if(searchResult.length>0){
        return (
            <div className="Search-result-container">
                {searchResult.map((result)=>(
                    <div className="Search-result" key={result.id} onClick={() => this.handleRedirect(result.id)}>
                        {result.name} ({result.symbol})
                    </div>
                ))}
            </div>
        )
    }
    if(!loading){
        return(
            <div className="Search-result-container">
                <div className="Search-no-result">
                    No results found
                </div>
            </div>
        )
    }
}
handleRedirect(currencyId){
    this.setState({
        searchQuery: '',
        searchResult: []
    })
    this.props.history.push(`/currency/${currencyId}`)
}
render(){
    const {loading, searchQuery} = this.state
        return(
            <div className="Search">
                <span className="Search-icon"/>
                <input className="Search-input" placeholder="Currency name"  onChange={this.handleChange} value={searchQuery}></input>
                {loading && <div className="Search-loading">
                    <Loading width='12px' height='12px'/>
                </div>}
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search)