export interface ICreatePoi {
    name: string;
    description: string;
    coverId?: number;
    latitude?: number;
    longitude?: number;
    address?: string;
    typeId?: number;
    cityId?: number;
}
