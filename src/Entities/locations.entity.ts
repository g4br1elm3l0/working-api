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

    @Column({ type: "decimal", precision: 6, scale: 3 })
    longitude: number;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    latitude: number;

    @OneToMany(() => UserServices, (service) => service.location)
    services: UserServices[];
};

export default Location;