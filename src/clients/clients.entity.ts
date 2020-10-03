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

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

    @Column()
    deletedAt: number;
}