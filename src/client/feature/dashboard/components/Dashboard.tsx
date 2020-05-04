import React from 'react';
import { Box } from 'grommet';
import BeerContainer from './BeerContainer';
import Container from '../../../../models/Container';

type Props = {
    containers: Container[];
};
const Dashboard = ({ containers }: Props) => {
    return (
        <Box direction="row">
            {containers.map((container: Container) => {
                return <BeerContainer container={container} />;
            })}
        </Box>
    );
};

export default Dashboard;
