import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 8 })
    zipCode: string;

    @Column()
    district: string;

    @Column()
    number: number;

    @Column({ nullable: true })
    reference: string;

    @Column()
    city: string;

    @Column({ length: 2 })
    state: string;
};

export default Address;