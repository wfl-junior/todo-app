import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { List } from "./List";
import { Trim } from "../utils";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  listId: number;

  @Trim()
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: false })
  completed: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => List)
  @ManyToOne(
    () => List,
    list => list.tasks,
    { onDelete: "CASCADE" }
  )
  list: List;
}
