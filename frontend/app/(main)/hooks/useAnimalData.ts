import { useQuery } from "@tanstack/react-query";
import axios, {isCancel, AxiosError, AxiosPromise} from 'axios';
import { AnimalResponse } from "../interfaces/animal-data";

const API_URL = "http://localhost:8080";

const fetchData = async () => {
    const response = await axios.get<AnimalResponse>(API_URL + "/animals");
    return response;
}

export function useAnimalData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["animal-data"]
    });

    return {
        ...query,
        data: query.data?.data
    };
}