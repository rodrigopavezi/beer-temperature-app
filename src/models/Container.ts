export interface ContainerInt {
    id: string;
    name: string;
    minTemperature: number;
    maxTemperature: number;
}

class Container implements ContainerInt {
    private _id: string;
    private _name: string;
    private _minTemperature: number;
    private _maxTemperature: number;

    constructor(id: string, name: string, minTemperature: number, maxTemperature: number) {
        this._id = id;
        this._name = name;
        this._minTemperature = minTemperature;
        this._maxTemperature = maxTemperature;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get minTemperature(): number {
        return this._minTemperature;
    }

    public get maxTemperature(): number {
        return this._maxTemperature;
    }
}

export default Container;
