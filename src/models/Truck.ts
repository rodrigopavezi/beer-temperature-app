import Container, { ContainerInt } from './Container';

export interface TruckInt {
    getContainers(): Array<Container>;
    setContainers(containers: Array<Container>): void;
    addContainer(container: Container): void;
    removeContainer(container: Container): Container;
}

class Truck implements TruckInt {
    private _containers: Container[];

    constructor();
    constructor(containers: Array<Container>);
    constructor(containers?: any) {
        this._containers = containers?.length ? containers : [];
    }

    setContainers(containers: Array<Container>): void {
        this._containers = containers;
    }

    getContainers(): Container[] {
        return this._containers;
    }
    addContainer(container: Container): void {
        this._containers.push(container);
    }
    removeContainer(container: Container): Container {
        const index = this._containers.indexOf(container, 0);
        if (index > -1) {
            this._containers.splice(index, 1);
        }
        return container;
    }
}

export default Truck;
