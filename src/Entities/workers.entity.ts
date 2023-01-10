import { getRounds, hashSync} from "bcryptjs";
import { 
    BeforeInsert, 
    BeforeUpdate, 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    JoinColumn, 
    OneToMany, 
    OneToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import Address from "./addresses.entity";
import Location from "./locations.entity";
import WorkerServices from "./workerServices.entity";

@Entity("workers")
class Workers {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: "date" })
    birthday: string;

    @Column()
    gender: "feminino" | "masculino";

    @Column()
    profileImg: string;

    @Column({ length: 11 })
    telephone: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @OneToOne( () => Address )
    @JoinColumn()
    address: Address;

    @OneToOne( () => Location )
    @JoinColumn()
    location: Location;

    @OneToMany( () => WorkerServices, workerService => workerService.worker )
    services: WorkerServices[];

    @BeforeUpdate()
    @BeforeInsert() 
    hashpassword() {
        const isEncrypted = getRounds(this.password);
        if( !isEncrypted ) {
            this.password = hashSync(this.password, 10);
        };
    };
};

export default Workers;