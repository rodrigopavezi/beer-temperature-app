import axios from 'axios';
import { SENSOR_SERVER_ENDPOINT } from '../../common/config/constants';

export interface SensorServiceInt {
    getTemperature(containerId: string): Promise<number>;
}

class SensorService implements SensorServiceInt {
    async getTemperature(containerId: string): Promise<number> {
        try {
            const response = await axios.get(`${SENSOR_SERVER_ENDPOINT}${containerId}`);
            return response.data.temperature;
        } catch (e) {
            throw new Error('Cannot get temperature from sensor');
        }
    }
}

export default SensorService;
