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

<<<<<<< HEAD
    @Column({ type: "decimal" })
    longitude: number;

    @Column({ type: "decimal" })
=======
    @Column({ type: "decimal", precision: 6, scale: 3 })
    longitude: number;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
>>>>>>> 561f37ad240cfb5480b3f6736c0478e6dd2df1ee
    latitude: number;

    @OneToMany(() => UserServices, (service) => service.location)
    services: UserServices[];
};

export default Location;