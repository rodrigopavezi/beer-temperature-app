class Status {
    private _containerId: string;
    private _temperature: number;
    private _alert: boolean;
    private _up: boolean;
    private _down: boolean;

    constructor(containerId: string, temperature: number, alert: boolean, up: boolean, down: boolean) {
        this._containerId = containerId;
        this._temperature = temperature;
        this._alert = alert;
        this._up = up;
        this._down = down;
    }

    public get containerId(): string {
        return this._containerId;
    }

    public get temperature(): number {
        return this._temperature;
    }

    public get alert(): boolean {
        return this._alert;
    }

    public get up(): boolean {
        return this._up;
    }

    public get down(): boolean {
        return this._down;
    }
}

export default Status;
