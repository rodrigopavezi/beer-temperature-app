import express from 'express';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as moxios from 'moxios';
import puppeteer from 'puppeteer';
import { LOCAL_PORT, SENSOR_SERVER_ENDPOINT, READ_SENSOR_INTERVAL_MILISECONDS } from '../../../common/config/constants';
import TruckService from './truck-service';
import Server from '../../../server/Server';
import TruckHandler from '../../../server/api/TruckHandler';
import SensorService from '../../../server/services/SensorService';
import Truck from '../../../models/Truck';

const EXTRA_TIMEOUT_MILISECONDS = 5000;
jest.setTimeout(READ_SENSOR_INTERVAL_MILISECONDS + EXTRA_TIMEOUT_MILISECONDS);

const feature = loadFeature('view-temperatures.feature', { loadRelativePath: true });
const getNewServer = () => {
    return new Server(express(), new TruckHandler(new SensorService(), new Truck()));
};

defineFeature(feature, (test) => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    let truckService: TruckService;
    let server: Server;

    beforeEach(async () => {
        moxios.install();
        truckService = new TruckService();

        browser = await puppeteer.launch({
            headless: true,
        });
        page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400,
            },
            userAgent: '',
        });
    });

    afterEach(() => {
        moxios.uninstall();
        server.close();
        browser.close();
    });

    test('Driver sees beer container temperature ranges', ({ given, when, then }) => {
        given('the Driver is on the driver seat', async () => {
            server = getNewServer();
            await page.goto(`http://localhost:${LOCAL_PORT}/`);
            await page.waitForSelector('.app');

            const html = await page.$eval('.app-title', (e) => e.innerHTML);
            expect(html).toBe('PragmaBrewery Temperature Monitor');
        });

        when('there is a container with the following beer:', (table) => {
            table.forEach(async (row: any) => {
                await truckService.addContainer(row.id, row.BeerName, row.MinTemperature, row.MaxTemperature);
            });
        });

        then('the Driver can see the following container temperature range:', async (table) => {
            const names = await page.$$eval('.beer-name', (names) => names.map((name) => name.innerHTML));
            const minTemperatures = await page.$$eval('.beer-min-temperature', (minTemperatures) =>
                minTemperatures.map((minTemperature) => minTemperature.innerHTML),
            );
            const maxTemperatures = await page.$$eval('.beer-max-temperature', (maxTemperatures) =>
                maxTemperatures.map((maxTemperature) => maxTemperature.innerHTML),
            );

            table.forEach((row: any, index: number) => {
                expect(names[index]).toBe(row.BeerName);
                expect(minTemperatures[index]).toBe(row.MinTemperature);
                expect(maxTemperatures[index]).toBe(row.MaxTemperature);
            });
        });
    });

    test('Driver sees beer container temperatures', ({ given, when, then }) => {
        given('there is the following beer container with the real time temperature:', async (table) => {
            table.forEach(async (row: any) => {
                moxios.stubRequest(`${SENSOR_SERVER_ENDPOINT}${row.id}`, {
                    status: 200,
                    response: { id: `${row.id}`, temperature: row.Temperature },
                });
            });

            server = getNewServer();
            table.forEach(async (row: any) => {
                await truckService.addContainer(row.id, row.BeerName, row.MinTemperature, row.MaxTemperature);
            });

            await page.goto(`http://localhost:${LOCAL_PORT}/`);
            await page.waitForSelector('.app');
        });

        when('the Driver is driving', async (table) => {
            const html = await page.$eval('.app-title', (e) => e.innerHTML);
            expect(html).toBe('PragmaBrewery Temperature Monitor');
            const EXTRA_TIMEOUT_FOR_READ_MILISECONDS = 2000;
            await new Promise((r) =>
                setTimeout(r, READ_SENSOR_INTERVAL_MILISECONDS + EXTRA_TIMEOUT_FOR_READ_MILISECONDS),
            );
        });

        then('the Driver can see the following container temperature:', async (table) => {
            const temperatures = await page.$$eval('.beer-temperature', (temperatures) =>
                temperatures.map((temperature) => temperature.innerHTML),
            );

            table.forEach((row: any, index: number) => {
                expect(temperatures[index]).toBe(row.Temperature);
            });
        });
    });
});
