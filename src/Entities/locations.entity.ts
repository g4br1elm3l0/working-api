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

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @OneToMany(() => UserServices, (service) => service.location)
    services: UserServices[];
};

export default Location;