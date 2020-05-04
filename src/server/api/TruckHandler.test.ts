import Truck from '../../models/Truck';
import TruckHandler from './TruckHandler';
import Container from '../../models/Container';
import SensorService from '../services/SensorService';
import Status from '../../models/Status';
jest.mock('../services/SensorService');

describe('Test SensorService', () => {
    const containerData = {
        id: '1',
        name: 'test',
        minTemperature: 1,
        maxTemperature: 2,
    };

    beforeEach(async () => {});

    afterEach(() => {});

    test('Get empty Truck', async () => {
        const truckHandler = new TruckHandler(new SensorService(), new Truck());
        expect(truckHandler.get()).toEqual(new Truck());
    });

    test('Get Truck with a container', async () => {
        const truckHandler = new TruckHandler(new SensorService(), new Truck());
        truckHandler.addContainer(
            containerData.id,
            containerData.name,
            containerData.minTemperature,
            containerData.maxTemperature,
        );
        expect(truckHandler.get()).toEqual(
            new Truck([
                new Container(
                    containerData.id,
                    containerData.name,
                    containerData.minTemperature,
                    containerData.maxTemperature,
                ),
            ]),
        );
    });

    describe('Test get status', () => {
        let truckHandler: TruckHandler;

        const setMockImplementation = (temperature: number) => {
            // @ts-ignore
            SensorService.mockImplementation(() => {
                return {
                    getTemperature: () => temperature,
                };
            });
            truckHandler = new TruckHandler(new SensorService(), new Truck());
            truckHandler.addContainer(
                containerData.id,
                containerData.name,
                containerData.minTemperature,
                containerData.maxTemperature,
            );
        };

        describe('Test get status when temperature is equal the min temperature', () => {
            const temperature = containerData.minTemperature;
            beforeEach(async () => {
                setMockImplementation(temperature);
            });

            test('Get status', async () => {
                expect(await truckHandler.getStatus(containerData.id)).toEqual(
                    new Status(containerData.id, temperature, false, false, false),
                );
            });
        });

        describe('Test get status when temperature is lesser than the min temperature', () => {
            const temperature = containerData.minTemperature - 1;
            beforeEach(async () => {
                setMockImplementation(temperature);
            });

            test('Get status', async () => {
                expect(await truckHandler.getStatus(containerData.id)).toEqual(
                    new Status(containerData.id, temperature, true, false, true),
                );
            });
        });

        describe('Test get status when temperature is greater than the min temperature', () => {
            const temperature = containerData.minTemperature + 1;
            beforeEach(async () => {
                setMockImplementation(temperature);
            });

            test('Get status', async () => {
                expect(await truckHandler.getStatus(containerData.id)).toEqual(
                    new Status(containerData.id, temperature, false, false, false),
                );
            });
        });

        describe('Test get status when temperature is equal the max temperature', () => {
            const temperature = containerData.maxTemperature;
            beforeEach(async () => {
                setMockImplementation(temperature);
            });

            test('Get status', async () => {
                expect(await truckHandler.getStatus(containerData.id)).toEqual(
                    new Status(containerData.id, temperature, false, false, false),
                );
            });
        });

        describe('Test get status when temperature is lesser than the max temperature', () => {
            const temperature = containerData.maxTemperature - 1;
            beforeEach(async () => {
                setMockImplementation(temperature);
            });

            test('Get status', async () => {
                expect(await truckHandler.getStatus(containerData.id)).toEqual(
                    new Status(containerData.id, temperature, false, false, false),
                );
            });
        });

        describe('Test get status when temperature is greater than the max temperature', () => {
            const temperature = containerData.maxTemperature + 1;
            beforeEach(async () => {
                setMockImplementation(temperature);
            });

            test('Get status', async () => {
                expect(await truckHandler.getStatus(containerData.id)).toEqual(
                    new Status(containerData.id, temperature, true, true, false),
                );
            });
        });

        describe('Test get status when there has bot been added a container in the truck yet', () => {
            const temperature = 0;

            beforeEach(async () => {
                truckHandler = new TruckHandler(new SensorService(), new Truck());
            });

            test('Get status', async () => {
                expect(await truckHandler.getStatus(containerData.id)).toEqual(
                    new Status(containerData.id, temperature, false, false, false),
                );
            });
        });
    });
});
