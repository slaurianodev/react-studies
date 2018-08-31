import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import './Table.css';
import Loading from '../common/Loading';

class List extends React.Component{
	constructor(){
		super();
		this.state = {
			loading: false,
			currencies:[],
			error: null,
		};
	}


	componentDidMount(){
		this.setState({ loading: true});

		fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
	    .then(handleResponse)
	    .then((data) => {
	    	this.setState({currencies: data.currencies, loading: false});
	    })
	    .catch((error) => {
	      this.setState({error: 'No currencies were found.'});
	    });
	}

	renderChangePercent(percent){
		if(percent >0){
			return <span className='percent-raised'>{percent}% &uarr;</span>
		}else if(percent <0){
			return <span className='percent-raised'>{percent}% &darr;</span>
		}else{
			return <span className='percent-raised'>{percent}%</span>
		}
	}
	
	render(){
		const { loading, error, currencies } = this.state;

		if(loading){
			return <div className='loading-container'><Loading /></div>
		}

		if(error){
			return <div className='error'>{this.state.error}</div>
		}
		return(
			<div className='Table-container'>
				
				<table className='Table'>
					<thead className='Table-head'>
						<tr>
							<th>Cryptocurrency</th>
							<th>Price</th>
							<th>Market Cap</th>
							<th>24H Change</th>
						</tr>
					</thead>
					<tbody className='Table-body'>
						{currencies.map((currency) =>(
							<tr key={currency.id}>
								<td>
									<span className='Table-rank'>{currency.rank}</span>
									{currency.name}
								</td>
								<td>
									<span className='Table-dollar'>$ {currency.price}</span>
								</td>
								<td>
									<span className='Table-rank'>$ {currency.marketCap}</span>
								</td>
								<td>
									{this.renderChangePercent(currency.percentChange24h)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default List;