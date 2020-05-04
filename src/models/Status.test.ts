import Status from './Status';

test('Instantiate Status', async () => {
    const statusData = {
        containerId: '1',
        temperature: 1,
        alert: false,
        up: false,
        down: false,
    };
    const status = new Status(
        statusData.containerId,
        statusData.temperature,
        statusData.alert,
        statusData.up,
        statusData.down,
    );
    expect(status.containerId).toBe(statusData.containerId);
    expect(status.temperature).toBe(statusData.temperature);
    expect(status.alert).toBe(statusData.alert);
    expect(status.up).toBe(statusData.up);
    expect(status.down).toBe(statusData.down);
});
