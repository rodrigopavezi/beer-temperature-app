import express from 'express';
import TruckHandler from './api/TruckHandler';
import { LOCAL_PORT } from '../common/config/constants';
import bodyParser from 'body-parser';
import * as core from 'express-serve-static-core';
import * as http from 'http';

class Server {
    private _app: core.Express;
    private _truckHandler: TruckHandler;
    private _server: http.Server | undefined;

    constructor(app: core.Express, truckHandler: TruckHandler) {
        this._truckHandler = truckHandler;
        this._app = app;

        this.routes();
        this.start();
    }

    private routes() {
        const jsonParser = bodyParser.json();

        this._app.use(express.static('dist'));

        this._app.get('/truck', (req, res) => {
            res.json(this._truckHandler.get());
        });

        this._app.post('/truck/container', jsonParser, (req, res) => {
            this._truckHandler.addContainer(
                req.body.id,
                req.body.name,
                req.body.minTemperature,
                req.body.maxTemperature,
            );
            res.json(
                this._truckHandler
                    .get()
                    .getContainers()
                    .filter((container) => container.id === req.body.id)[0],
            );
        });

        this._app.get('/status/:containerId', async (req, res) => {
            const status = await this._truckHandler.getStatus(req.params.containerId);
            res.json(status);
        });
    }

    private start() {
        this._server = this._app.listen(LOCAL_PORT, () => {
            console.log(`App is up and running on: http://localhost:${LOCAL_PORT}`);
        });
    }

    public close() {
        this._server?.close();
    }
}

export default Server;
