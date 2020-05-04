import axios from 'axios';
import Truck from '../../../models/Truck';
import Container from '../../../models/Container';
import Status from '../../../models/Status';

interface TruckServiceInt {
    importContainers(containers: Array<Container>): Promise<Promise<Container>[]>;
    get(): Promise<Truck>;
    addContainer(id: string, name: string, minTemperature: number, maxTemperature: number): Promise<Container>;
    getStatus(containerId: string): Promise<Status>;
}

class TruckService implements TruckServiceInt {
    async importContainers(containers: Container[]): Promise<Promise<Container>[]> {
        try {
            return containers.map((container: Container) => {
                return this.addContainer(
                    container.id,
                    container.name,
                    container.minTemperature,
                    container.maxTemperature,
                );
            });
        } catch (e) {
            throw new Error('Cannot import containers');
        }
    }
    async addContainer(id: string, name: string, minTemperature: number, maxTemperature: number): Promise<Container> {
        try {
            const response = await axios.post('/truck/container', { id, name, minTemperature, maxTemperature });
            const container = response.data;
            return new Container(container._id, container._name, container._minTemperature, container._maxTemperature);
        } catch (e) {
            throw new Error('Cannot add container');
        }
    }

    async get(): Promise<Truck> {
        try {
            const response = await axios.get('/truck');

            const containers = response.data._containers.map((container: any) => {
                return new Container(
                    container._id,
                    container._name,
                    container._minTemperature,
                    container._maxTemperature,
                );
            });
            return new Truck(containers);
        } catch (e) {
            throw new Error('Cannot get truck');
        }
    }

    async getStatus(containerId: string): Promise<Status> {
        try {
            const response = await axios.get(`/status/${containerId}`);
            const data = response.data;
            return new Status(data._containerId, data._temperature, data._alert, data._up, data._down);
        } catch (e) {
            throw new Error('Cannot get status');
        }
    }
}

export default TruckService;
