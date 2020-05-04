import express from 'express';
import TruckHandler from './api/TruckHandler';
import SensorService from './services/SensorService';
import Truck from '../models/Truck';
import Server from './Server';
import Container from '../models/Container';
import { LOCAL_PORT } from '../common/config/constants';

// @ts-ignore
const spy = jest.spyOn(console, 'log').mockImplementation();

const httpServer = { close: jest.fn() };

const app = {
    get: jest.fn(),
    post: jest.fn(),
    use: jest.fn(),
    listen: jest.fn(() => httpServer),
    close: jest.fn(),
};
jest.mock('express', () => {
    const mockedExpress = () => app;
    Object.defineProperty(mockedExpress, 'static', { value: jest.fn() });
    return mockedExpress;
});
jest.mock('./api/TruckHandler');
jest.mock('../models/Truck');

describe('Test Server', () => {
    let truckHandler: TruckHandler;
    let truck: Truck;
    let server: Server;

    let req = {
        body: { id: '1', name: 'test', minTemperature: 5, maxTemperature: 7 },
    };

    let res = {
        json: jest.fn(),
    };

    beforeAll(() => {
        // @ts-ignore
        TruckHandler.mockClear();
        // @ts-ignore
        Truck.mockClear();
        truck = new Truck();

        truckHandler = new TruckHandler(new SensorService(), truck);
        server = new Server(express(), truckHandler);
    });
    test('Test server is up and running', async () => {
        // @ts-ignore
        app.listen.mock.calls[0][1]();
        expect(app.listen).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(`App is up and running on: http://localhost:${LOCAL_PORT}`);
    });

    test('Test server can be closed', async () => {
        server.close();
        expect(httpServer.close).toHaveBeenCalled();
    });

    test('Test routes use static dist', async () => {
        expect(app.use).toHaveBeenCalledWith(express.static('dist'));
    });

    test('Test routes get truck', async () => {
        app.get.mock.calls[0][1](req, res);

        expect(app.get).toHaveBeenNthCalledWith(1, '/truck', expect.any(Function));

        expect(res.json).toHaveBeenCalled();

        expect(truckHandler.get).toHaveBeenCalled();
    });

    test('Test routes post container into truck', async () => {
        truck.getContainers = () => [req.body as Container];
        truckHandler.get = () => truck;
        app.post.mock.calls[0][2](req, res);
        expect(app.post).toHaveBeenNthCalledWith(1, '/truck/container', expect.any(Function), expect.any(Function));

        expect(truckHandler.addContainer).toHaveBeenCalledWith(
            req.body.id,
            req.body.name,
            req.body.minTemperature,
            req.body.maxTemperature,
        );

        expect(res.json).toHaveBeenCalled();
    });

    test('Test routes get Status', async () => {
        const reqForStatus = { params: { containerId: '1' } };
        await app.get.mock.calls[1][1](reqForStatus, res);

        expect(app.get).toHaveBeenNthCalledWith(2, '/status/:containerId', expect.any(Function));

        expect(truckHandler.getStatus).toHaveBeenCalled();

        expect(res.json).toHaveBeenCalled();
    });
});
