import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import UserServices from "./userServices.entity";

@Entity("locations")
class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "decimal" })
    longitude: number;

    @Column({ type: "decimal" })
    latitude: number;

    @OneToMany(() => UserServices, (service) => service.location)
    services: UserServices[];
};

export default Location;