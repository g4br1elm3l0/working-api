import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UserServices from "./userServices.entity";

@Entity("categories")
class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => UserServices, userServices => userServices.category)
    services: UserServices[];    
};

export default Categories;