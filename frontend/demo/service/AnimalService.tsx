import { Demo } from '@/types';

export const AnimalService = {
   

    getAnimalsJSON() {
        return fetch('/demo/data/animals.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Animal[]);
    }

};
