import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("locations")
class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;
};

export default Location;