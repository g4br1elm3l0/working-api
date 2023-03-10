import { IUserServiceRequest, IUserServiceUpdateRequest } from "../../../Interfaces/UserServices/index";

export const mockedService1 : IUserServiceRequest = {
    title: "Meu celular caiu na piscina",
    description: "Me empurraram e acabei caindo na piscina. Ele não quis ligar",
    category: "Assistência Técnica",
    location: {
        latitude: -10.8778,
        longitude: -61.9277
    }
};

export const mockedService2 : IUserServiceRequest = {
    title: "Minha tv está com uma faixa verde",
    description: "Ela liga porém tem uma faixa verde atrapalhando de ver",
    category: "Assistência Técnica",
    location: {
        latitude: -10.8778,
        longitude: -61.9277
    }
};

export const mockedUpdateService1 : IUserServiceUpdateRequest = {
    title: "Meu celular caiu na piscina atualizado",
    description: "Me empurraram e acabei caindo na piscina. Ele não quis ligar atualizado"
};