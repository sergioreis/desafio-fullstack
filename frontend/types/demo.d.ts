/* FullCalendar Types */
import { EventApi, EventInput } from '@fullcalendar/core';



export type LayoutType = 'list' | 'grid';
export type SortOrderType = 1 | 0 | -1;


declare namespace Demo {
    

    interface Message {
        text: string;
        ownerId: number;
        createdAt: number;
    }

    //AnimalService
    type Animal = {
        id?: string;
        name: string;
        description: string;
        imageUrl?: string;
        idade?: number;
        category?: string;
        status?: '';
        birthDate?: '';
    };

    
}
