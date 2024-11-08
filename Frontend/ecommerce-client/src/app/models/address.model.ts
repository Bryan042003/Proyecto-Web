export interface Province{
    id: number;
    name: string;
}

export interface Canton{
    id: number;
    name: string;
    id_province: number;
}

export interface District{
    id: number;
    name: string;
    id_canton: number;
}

export interface Address{
    id: number;
    id_district: number;
    postal_code: string;
    specific_address: string;
}