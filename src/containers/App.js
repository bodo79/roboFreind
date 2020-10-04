import React, {Component} from 'react';
import { connect} from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './App.css'

import { setSearchField, requestRobots} from '../actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		isPendig: state.requestRobots.isPendig,
		robots: state.requestRobots.robots,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())

	}	
}

class App extends Component {
	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const  { searchField, onSearchChange, robots, isPendig }  = this.props;
		const filterRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPendig ? 
		<h1 className='tc'> LOADING... </h1> :
		(
			<div className="tc">
				<h1 className='f2'>RoboFreinds</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<CardList robots={filterRobots}/>
				</Scroll>
			</div>
		);		
	
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);//connect is higher order function