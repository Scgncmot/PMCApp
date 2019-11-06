import {Chat} from './chat';

export class Usuario{

    uid?:string 
    nombre?:string
    username?:string
    email?:string
    sports?:string[]
    location?:{
        lat:string,
        lon:string
    }
    imagen?:string

    chats?: string[];
}
