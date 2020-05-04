import Container from './Container';

test('Instantiate Container', async () => {
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
    expect(container.id).toBe(containerData.id);
    expect(container.name).toBe(containerData.name);
    expect(container.minTemperature).toBe(containerData.minTemperature);
    expect(container.maxTemperature).toBe(containerData.maxTemperature);
});
