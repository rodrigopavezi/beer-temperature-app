import React, { useState, useEffect } from 'react';
import TruckService from '../truck-service';
import { READ_SENSOR_INTERVAL_MILISECONDS } from '../../../../common/config/constants';
import Beer from './Beer';
import Container from '../../../../models/Container';
import Status from '../../../../models/Status';

type Props = {
    container: Container;
};

const BeerContainer = ({ container }: Props) => {
    console.log('container', container.id);
    const truckService = new TruckService();

    const [status, setStatus] = useState(new Status(container.id, 0, false, false, false));
    const getStatus = async (containerId: string) => {
        return truckService.getStatus(containerId);
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            setStatus(await getStatus(container.id));
        }, READ_SENSOR_INTERVAL_MILISECONDS);
        return () => clearInterval(interval);
    }, []);

    return <Beer container={container} status={status} />;
};

export default BeerContainer;
