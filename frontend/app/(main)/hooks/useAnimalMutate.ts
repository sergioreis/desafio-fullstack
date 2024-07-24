import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, {isCancel, AxiosError, AxiosPromise} from 'axios';
import { AnimalData, AnimalResponse } from "../interfaces/animal-data";

const API_URL = "http://localhost:8080";

const postData = async (data: AnimalData) => {
    console.log(data);
    return await axios.post(API_URL + "/animals",data);
}

export function useAnimalMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries();
        }    
    });

    return mutate;
}