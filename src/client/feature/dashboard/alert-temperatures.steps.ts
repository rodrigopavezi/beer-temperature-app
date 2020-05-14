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

const feature = loadFeature('alert-temperatures.feature', { loadRelativePath: true });
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

        browser = await puppeteer.launch(
            process.env.CI
                ? { executablePath: 'google-chrome-stable', args: ['--no-sandbox'] }
                : {
                      headless: true,
                  },
        );
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

    const givenHandler = async (table: any) => {
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
    };

    const whenHandler = async () => {
        const html = await page.$eval('.app-title', (e) => e.innerHTML);
        expect(html).toBe('PragmaBrewery Temperature Monitor');
        const EXTRA_TIMEOUT_FOR_READ_MILISECONDS = 2000;
        await new Promise((r) => setTimeout(r, READ_SENSOR_INTERVAL_MILISECONDS + EXTRA_TIMEOUT_FOR_READ_MILISECONDS));
    };

    const getExpectedColor = (isAlerted: string) => {
        // red or green
        return isAlerted === 'true' ? 'rgb(255, 0, 0)' : 'rgb(0, 128, 0)';
    };

    const thenHandler = async (table: any) => {
        const backgroundColors = await page.$$eval('.beer', (beers) =>
            beers.map((beer) => window.getComputedStyle(beer, null).getPropertyValue('background-color')),
        );

        table.forEach((row: any, index: number) => {
            expect(backgroundColors[index]).toBe(getExpectedColor(row.IsAlerted));
        });
    };

    test('Driver gets no alert when temperature equal the min temperature', ({ given, when, then }) => {
        given(
            'there is the following beer container with its real time temperature equal the min temperature',
            async (table) => givenHandler(table),
        );

        when('the Driver is driving', async () => whenHandler());

        then('the Driver will not get an alert for the beer container:', async (table) => thenHandler(table));
    });

    test('Driver gets no alert when temperature equal the max temperature', ({ given, when, then }) => {
        given(
            'there is the following beer container with its real time temperature equal the max temperature',
            async (table) => givenHandler(table),
        );

        when('the Driver is driving', async () => whenHandler());

        then('the Driver will not get an alert for the beer container:', async (table) => thenHandler(table));
    });

    test('Driver gets an alert when temperature lesser than the min temperature', ({ given, when, then }) => {
        given(
            'there is the following beer container with its real time temperature lesser than the min temperature',
            async (table) => givenHandler(table),
        );

        when('the Driver is driving', async () => whenHandler());

        then('the Driver will get an alert for the beer container:', async (table) => thenHandler(table));
    });

    test('Driver gets an alert when temperature greater than the max temperature', ({ given, when, then }) => {
        given(
            'there is the following beer container with its real time temperature greater than the max temperature',
            async (table) => givenHandler(table),
        );

        when('the Driver is driving', async () => whenHandler());

        then('the Driver will get an alert for the beer container:', async (table) => thenHandler(table));
    });
});
