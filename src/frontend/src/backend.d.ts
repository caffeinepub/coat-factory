import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface backendInterface {
    getCoatByCategory(category: string): Promise<Array<Product>>;
    getCoatById(id: bigint): Promise<Product>;
    listCoats(): Promise<Array<Product>>;
    submitContactForm(name: string, email: string, message: string, timestamp: bigint): Promise<bigint>;
}
