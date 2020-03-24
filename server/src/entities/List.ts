import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Task } from "./Task";
import { Trim } from "../utils";

@ObjectType()
@Entity()
export class List extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Trim()
  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Task])
  @OneToMany(
    () => Task,
    task => task.list,
    { onDelete: "CASCADE" }
  )
  tasks: Task[];
}
