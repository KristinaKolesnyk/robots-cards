import './App.css';
import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import RobotPassport from '../components/RobotPassport';
import robotsData from '../data/robots.json';
import Starfield from '../components/Starfield';


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: robotsData,
            searchfield: '',
            crewIds: new Set(),
            activeRobot: null
        };
    }

    onSearchChange = (e) => this.setState({searchfield: e.target.value});

    openPassport = (user) => this.setState({activeRobot: user});
    closePassport = () => this.setState({activeRobot: null});

    toggleCrew = (user) => {
        this.setState(prev => {
            const next = new Set(prev.crewIds);
            if (next.has(user.id)) next.delete(user.id); else next.add(user.id);
            return {crewIds: next};
        });
    };

    render() {
        const {robots, searchfield, crewIds, activeRobot} = this.state;
        const filtered = robots.filter(r =>
            r.name.toLowerCase().includes(searchfield.toLowerCase())
        );

        if (!robots.length) {
            return (
                <div className="loading tc">
                    <h1 className="app-title">Calibrating warp drive…</h1>
                </div>
            );
        }

        return (
            <div className="app-shell tc">
                <Starfield />
                <h1 className="app-title">ROBOFRIENDS</h1>
                <p className="subtitle">Galactic Catalog of Friendly Robots</p>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    {filtered.length ? (
                        <CardList
                            robots={filtered}
                            onView={this.openPassport}
                            onToggleCrew={this.toggleCrew}
                            crewIds={crewIds}
                        />
                    ) : (
                        <p className="empty-state">
                            We scanned 12 parsecs and found nothing. Try another sector.
                        </p>
                    )}
                </Scroll>

                {activeRobot && (
                    <RobotPassport
                        user={activeRobot}
                        inCrew={crewIds.has(activeRobot.id)}
                        onToggleCrew={this.toggleCrew}
                        onClose={this.closePassport}
                    />
                )}
            </div>
        );
    }
}

export default App;
