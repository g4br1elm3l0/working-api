import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    DeleteDateColumn
} from "typeorm";
import Categories from "./categories.entity";
import Location from "./locations.entity";
import Users from "./users.entity";

@Entity("userServices")
class UserServices{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 50})
    title: string;

    @Column({length: 300})
    description: string;

    @Column({default: false})
    femaleOnly: boolean;

    @Column({default: "pendente"})
    status: "pendente" | "aceito" | "resolvido" | "removido";

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({nullable: true})
    deletedAt: Date;

    @ManyToOne(() => Users, users => users.services)
    user: Users;

    @ManyToOne(() => Categories, categories => categories.services)
    category: Categories;

    @ManyToOne( () => Location, location => location.services)
    location: Location;
};

export default UserServices;