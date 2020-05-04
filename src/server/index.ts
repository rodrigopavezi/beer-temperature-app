import express from 'express';
import TruckHandler from './api/TruckHandler';
import SensorService from './services/SensorService';
import Truck from '../models/Truck';
import Server from './Server';

new Server(express(), new TruckHandler(new SensorService(), new Truck()));
