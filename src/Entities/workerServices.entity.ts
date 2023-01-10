import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import UserServices from "./userServices.entity";
import Workers from "./workers.entity";

@Entity("workerServices")
class WorkerServices {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    acceptedAt: Date;

    @ManyToOne( () => Workers, worker => worker.id)
    worker: Workers;

    @OneToOne(() => UserServices)
    @JoinColumn()
    userService: UserServices;
};

export default WorkerServices;