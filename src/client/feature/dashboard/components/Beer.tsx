import React from 'react';
import { Box, Text } from 'grommet';
import Container from '../../../../models/Container';
import Status from '../../../../models/Status';

type Props = {
    status: Status;
    container: Container;
};

const Beer = ({ container, status }: Props) => {
    console.log('here', container, status);
    return (
        <Box
            className="beer"
            background={{ color: status.alert ? 'red' : 'green' }}
            border
            pad="medium"
            align="center"
            justify="center"
            gap="small"
        >
            <Box>
                <Text className="beer-name">{container.name}</Text>
            </Box>
            <Box direction="row" gap="small">
                <Text className="beer-min-temperature">{container.minTemperature}°C</Text>
                <Text>-</Text>
                <Text className="beer-max-temperature">{container.maxTemperature}°C</Text>
            </Box>
            <Box border pad="xsmall">
                <Text size="large" className="beer-temperature">
                    {status.temperature}°C
                </Text>
            </Box>
        </Box>
    );
};

export default Beer;
