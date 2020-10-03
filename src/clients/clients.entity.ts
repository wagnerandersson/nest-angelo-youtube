import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    name: string;

    @Column()
    phone: number;

    @Column()
    email: string;

    @Column({ name: 'created_At' })
    createdAt: Date;

    @Column({ name: 'updated_At' })
    updatedAt: Date;

    @Column({ name: 'deleted_At' })
    deletedAt: Date;
}