import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Users from "./users.entity";
import UserServices from "./userServices.entity";

@Entity("locations")
class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @OneToOne(() => Users)
    @JoinColumn()
    user: Users

    @OneToOne(() => UserServices)
    @JoinColumn()
    service: UserServices
};

export default Location;