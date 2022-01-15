import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/errorBoundary';
 class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }


    render() {

        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        if (this.state.robots.length === 0) {
            return (
                <div className="tc">
                    <h1 className='f1' >LOADING</h1>
                </div>)
        } else {
            return (
                <div className="tc">
                    <h1 className='f1' >ROBOFRIENDS</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <errorHandler>
                        <Cardlist robots={filteredRobots} />
                        </errorHandler>
                    </Scroll>
                </div>
            );
        }
    }
}


export default App;