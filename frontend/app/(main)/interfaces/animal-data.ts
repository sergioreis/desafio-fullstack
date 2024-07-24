export interface AnimalData {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    idade?: number;
    category: string;
    status: string;
    birthDate: string;
}

export interface AnimalResponse {
    data: AnimalData[];
}