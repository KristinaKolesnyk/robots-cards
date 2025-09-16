import './App.css';
import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import Starfield from '../components/Starfield';

class App extends Component {
    constructor() {
        super();
        this.state = { robots: [], searchfield: '' };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(r => r.json())
            .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (e) => this.setState({ searchfield: e.target.value });

    render() {
        const { robots, searchfield } = this.state;
        const filtered = robots.filter(r =>
            r.name.toLowerCase().includes(searchfield.toLowerCase())
        );

        if (!robots.length) {
            return (
                <div className="loading tc">
                    <h1 className="app-title">Launching…</h1>
                </div>
            );
        }

        return (
            <div className="app-shell tc">
                <Starfield />
                <h1 className="app-title">ROBOFRIENDS</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <CardList robots={filtered} />
                </Scroll>
            </div>
        );
    }
}

export default App;
