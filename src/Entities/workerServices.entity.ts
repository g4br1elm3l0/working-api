import { 
    Column, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import Workers from "./workers.entity";

@Entity("workerServices")
class WorkerServices {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    acceptedAt: Date;

    @ManyToOne( () => Workers, worker => worker.id)
    worker: Workers;
};

export default WorkerServices;