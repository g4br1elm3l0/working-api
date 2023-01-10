import { hashSync } from "bcryptjs";
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeUpdate,
    BeforeInsert,
    DeleteDateColumn,
    OneToOne,
    JoinColumn
} from "typeorm";
import Address from "./addresses.entity";
import Location from "./locations.entity";

@Entity("users")
class Users{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 50})
    name: string;

    @Column({length: 100, unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    gender: "masculino" | "feminino";

    @Column({type: Date})
    birthday: string;

    @Column()
    profileImg: string;

    @Column({length: 11})
    telephone: number;

    @Column()
    isActive: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(() => Location)
    @JoinColumn()
    location: Location;

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }
};

export default Users