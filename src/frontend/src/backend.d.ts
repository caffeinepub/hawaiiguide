import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Beach {
    name: string;
    description: string;
}
export interface Island {
    name: string;
    description: string;
    beaches: Array<Beach>;
    topAttractions: Array<Attraction>;
    travelTips: Array<Tip>;
}
export interface Attraction {
    tip?: string;
    hours?: string;
    name: string;
    description: string;
    admission?: string;
    category?: string;
}
export interface Tip {
    title: string;
    content: string;
}
export interface backendInterface {
    getAllIslands(): Promise<Array<Island>>;
    getIslandByName(name: string): Promise<Island>;
    initializeIslands(): Promise<void>;
}
