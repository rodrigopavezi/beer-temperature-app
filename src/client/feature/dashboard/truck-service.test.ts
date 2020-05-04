import TruckService from './truck-service';
import Container from '../../../models/Container';
import { beerContainers } from '../../../common/beer-containers-datasource';
import moxios from 'moxios';
import Status from '../../../models/Status';
import Truck from '../../../models/Truck';

describe('Test TruckService', () => {
    let truckService: TruckService;
    beforeEach(async () => {
        moxios.install();
        truckService = new TruckService();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Import Containers', async () => {
        const mockData = {
            id: '1',
            name: 'test',
            minTemperature: 5,
            maxTemperature: 8,
        };
        moxios.stubRequest('/truck/container', {
            status: 200,
            response: {
                _id: mockData.id,
                _name: mockData.name,
                _minTemperature: mockData.minTemperature,
                _maxTemperature: mockData.maxTemperature,
            },
        });

        const actualContainers = await Promise.all(
            await truckService.importContainers((beerContainers.slice(0, 1) as unknown) as Array<Container>),
        );
        expect(actualContainers).toEqual([
            new Container(mockData.id, mockData.name, mockData.minTemperature, mockData.maxTemperature),
        ]);
    });

    test('Import Containers throw error', async () => {
        moxios.stubRequest('/truck/container', {
            status: 500,
            response: {},
        });

        expect(
            Promise.all(
                await truckService.importContainers((beerContainers.slice(0, 1) as unknown) as Array<Container>),
            ),
        ).rejects.toThrowError('Cannot add container');
    });

    test('Get truck', async () => {
        const mockData = {
            id: '1',
            name: 'test',
            minTemperature: 5,
            maxTemperature: 8,
        };
        moxios.stubRequest('/truck', {
            status: 200,
            response: {
                _containers: [
                    {
                        _id: mockData.id,
                        _name: mockData.name,
                        _minTemperature: mockData.minTemperature,
                        _maxTemperature: mockData.maxTemperature,
                    },
                ],
            },
        });

        const actualTruck = await truckService.get();
        expect(actualTruck).toEqual(
            new Truck([new Container(mockData.id, mockData.name, mockData.minTemperature, mockData.maxTemperature)]),
        );
    });

    test('Get truck throw error', async () => {
        moxios.stubRequest('/truck', {
            status: 500,
            response: {},
        });

        await expect(truckService.get()).rejects.toThrowError('Cannot get truck');
    });

    test('Get Status', async () => {
        const mockData = {
            id: '1',
            temperature: 9,
        };
        moxios.stubRequest(`/status/${mockData.id}`, {
            status: 200,
            response: {
                _containerId: mockData.id,
                _temperature: mockData.temperature,
                _alert: false,
                _up: false,
                _down: false,
            },
        });

        const actualStatus = await truckService.getStatus(mockData.id);
        expect(actualStatus).toEqual(new Status(mockData.id, mockData.temperature, false, false, false));
    });

    test('Get Status throw an error', async () => {
        const mockData = {
            id: '1',
            temperature: 9,
        };
        moxios.stubRequest(`/status/${mockData.id}`, {
            status: 500,
            response: {},
        });
        await expect(truckService.getStatus(mockData.id)).rejects.toThrowError('Cannot get status');
    });
});
