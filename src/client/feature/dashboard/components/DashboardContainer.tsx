import React, { useEffect, useState } from 'react';
import TruckService from '../truck-service';
import Dashboard from './Dashboard';
import { beerContainers } from '../../../../common/beer-containers-datasource';
import Container from '../../../../models/Container';

const DashboardContainer = () => {
    const truckService = new TruckService();
    const [containers, setContainers] = useState([] as Container[]);

    const loadTruck = async () => {
        const containers = await truckService.importContainers((beerContainers as unknown) as Array<Container>);
        setContainers(await Promise.all(containers));
    };
    useEffect(() => {
        loadTruck();
    }, []);

    return <Dashboard containers={containers} />;
};

export default DashboardContainer;
