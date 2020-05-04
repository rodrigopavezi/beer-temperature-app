import Truck from './Truck';
import Container from './Container';

const containerData = {
    id: '1',
    name: 'test',
    minTemperature: 1,
    maxTemperature: 2,
};
const container = new Container(
    containerData.id,
    containerData.name,
    containerData.minTemperature,
    containerData.maxTemperature,
);

test('Add container to Truck', async () => {
    const truck = new Truck();
    truck.addContainer(container);

    expect(truck.getContainers()).toContain(container);
});

test('Remove container from Truck', async () => {
    const truck = new Truck([container]);
    truck.removeContainer(container);

    expect(truck.getContainers()).not.toContain(container);
});

test('Set containers into Truck', async () => {
    const truck = new Truck();
    truck.setContainers([container]);

    expect(truck.getContainers()).toContain(container);
});

test('Get containers from Truck', async () => {
    const truck = new Truck([container]);
    const containers = truck.getContainers();

    expect(containers).toEqual([container]);
});

test('Try removing inexistent container from Truck', async () => {
    const truck = new Truck([container]);
    truck.removeContainer(
        new Container(containerData.id, containerData.name, containerData.minTemperature, containerData.maxTemperature),
    );

    expect(truck.getContainers()).toContain(container);
});
