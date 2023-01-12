import { IUserLogin, IUserRequest } from "../../../Interfaces/Users";

export const mockedUser : IUserRequest = {
    name: "leonardo",
    email: "leonardo@mail.com",
    password: "leo1234",
    gender: "masculino",
    birthday: "02/10/98",
    profileImg: "profileleo",
    telephone: "67999956325",
    isWorker: false
};

export const mockedUserAdm : IUserRequest = {
    name: "leonardo adm",
    email: "leonardoadm@mail.com.br",
    password: "leo1234",
    gender: "masculino",
    birthday: "04/10/98",
    profileImg: "profileleo",
    telephone: "67998756325",
    isWorker: false,
    isAdm: true
};

export const mockedUserWorker : IUserRequest = {
    name: "Leonardo 123",
    email: "leonardo.123@mail.com",
    password: "leo1234",
    gender: "masculino",
    birthday: "03/10/98",
    profileImg: "profileleo",
    telephone: "57989956325",
    isWorker: true
};

export const mockedUserLogin : IUserLogin = {
    email: "leonardo@mail.com",
    password: "leo1234"
};

export const mockedUserAdmLogin : IUserLogin = {
    email: "leonardoadm@mail.com.br",
    password: "leo1234"
};

export const mockedUserWorkerLogin : IUserLogin = {
    email: "leonardo.123@mail.com",
    password: "leo1234"
};
