import React, { useState, useEffect } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/errorBoundary';

function App() {


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => setRobots(users))
    }, [])

    const [robots, setRobots] = useState([]); 
    const [searchfield, setSearchfield] = useState('');

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }
      
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    if (robots.length === 0) {
        return (
            <div className="tc">
                <h1 className='f1' >LOADING</h1>
            </div>)
    } else {
        return (
            <div className="tc">
                <h1 className='f1' >ROBOFRIENDS</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <errorHandler>
                        <Cardlist robots={filteredRobots} />
                    </errorHandler>
                </Scroll>
            </div>
        );
    }
}






export default App;