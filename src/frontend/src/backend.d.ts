import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Car {
    id: bigint;
    model: string;
    make: string;
    year: bigint;
    description: string;
    category: string;
    priceUSD: bigint;
    horsepower: bigint;
    engine: string;
}
export interface Inquiry {
    id: bigint;
    carId: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    getCar(id: bigint): Promise<Car | null>;
    getCars(): Promise<Array<Car>>;
    getInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(name: string, email: string, message: string, carId: bigint, timestamp: bigint): Promise<bigint>;
}
