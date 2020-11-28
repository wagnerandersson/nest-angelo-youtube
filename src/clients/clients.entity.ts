import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({
    name: 'password',
  })
  @HideField()
  pass: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_At' })
  deletedAt: Date;
}
