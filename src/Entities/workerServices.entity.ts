import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import Users from "./users.entity";
import UserServices from "./userServices.entity";


@Entity("workerServices")
class WorkerServices {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    acceptedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @ManyToOne(() => Users, user => user.id)
    user: Users;

    @OneToOne(() => UserServices)
    @JoinColumn()
    userService: UserServices;
};
export default WorkerServices;