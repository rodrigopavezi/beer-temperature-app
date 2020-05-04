import SensorService from './SensorService';
import * as moxios from 'moxios';
import { SENSOR_SERVER_ENDPOINT } from '../../common/config/constants';

describe('Test SensorService', () => {
    beforeEach(async () => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Get Temperature from Sensor', async () => {
        const data = {
            id: '1',
            temperature: 5,
        };

        moxios.stubRequest(`${SENSOR_SERVER_ENDPOINT}${data.id}`, {
            status: 200,
            response: { id: `${data.id}`, temperature: data.temperature },
        });
        const sensorService = new SensorService();
        const temperature = await sensorService.getTemperature(data.id);
        expect(temperature).toBe(data.temperature);
    });

    test('Get Error if service cannot get temperature from Sensor', async () => {
        const error = new Error('Error: Request failed with status code 500');

        const data = {
            id: '1',
            temperature: 5,
        };

        moxios.stubRequest(`${SENSOR_SERVER_ENDPOINT}${data.id}`, {
            status: 500,
            response: { error },
        });
        const sensorService = new SensorService();
        try {
            await sensorService.getTemperature(data.id);
        } catch (e) {
            expect(e.message).toMatch('Cannot get temperature from sensor');
        }
    });
});
