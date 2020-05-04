import { beerContainers } from '../../common/beer-containers-datasource';
import SensorService, { SensorServiceInt } from '../services/SensorService';
import Truck, { TruckInt } from '../../models/Truck';
import Container from '../../models/Container';
import Status from '../../models/Status';

interface TruckHandlerInt {
    get(): TruckInt;
    addContainer(id: string, beerName: string, minTemperature: number, maxTemperature: number): void;
    getStatus(containerId: string): Promise<Status>;
}

class TruckHandler implements TruckHandlerInt {
    private _sensorService: SensorServiceInt;
    private _truck: TruckInt;

    constructor(sensorService: SensorService, truck: Truck) {
        this._sensorService = sensorService;
        this._truck = truck;
    }

    /**
     * Add containers to the truck
     * @param beerName
     * @param minTemperature
     * @param maxTemperature
     */
    addContainer(id: string, beerName: string, minTemperature: number, maxTemperature: number): void {
        this._truck.addContainer(new Container(id, beerName, minTemperature, maxTemperature));
    }

    /**
     *  Get the truck data
     * @param id
     */
    get(): TruckInt {
        return this._truck;
    }

    /**
     * Get the status of all containers
     */
    async getStatus(containerId: string): Promise<Status> {
        const containers = this._truck.getContainers();
        let temperature = 0;
        let alert = false;
        let down = false;
        let up = false;

        if (containers.length > 0) {
            const container = this._truck.getContainers().filter((container) => container.id === containerId)[0];
            temperature = await this._sensorService.getTemperature(container.id);

            if (temperature < container.minTemperature) {
                alert = true;
                down = true;
            }

            if (temperature > container.maxTemperature) {
                alert = true;
                up = true;
            }

            return new Status(container.id, temperature, alert, up, down);
        } else {
            return new Status(containerId, temperature, alert, up, down);
        }
    }
}

export default TruckHandler;
