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

@ObjectType()
@Entity("lists")
export class List extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [Task])
  @OneToMany(() => Task, task => task.list, { onDelete: "CASCADE" })
  tasks: Task[];
}
