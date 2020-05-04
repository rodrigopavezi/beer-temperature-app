import React from 'react';
import { Grommet, grommet, Heading } from 'grommet';
import DashboardContainer from './feature/dashboard/components/DashboardContainer';

const App = () => {
    return (
        <Grommet theme={grommet} className="app">
            <Heading className="app-title">PragmaBrewery Temperature Monitor</Heading>
            <DashboardContainer />
        </Grommet>
    );
};

export default App;
