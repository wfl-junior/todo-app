import { Resolver, Query, Mutation, Arg, Int, Args } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskArgs } from "../types/CreateTaskArgs";
import { List } from "../entities/List";
import { UpdateTaskArgs } from "../types/UpdateTaskArgs";
import { getRepository } from "typeorm";

const relations: string[] = ["list"];

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return Task.find({ order: { id: "ASC" }, relations });
  }

  @Mutation(() => Task)
  async createTask(@Args() args: CreateTaskArgs): Promise<Task> {
    const task = await Task.create(args).save();
    const list = await getRepository(List)
      .createQueryBuilder("list")
      .leftJoinAndSelect("list.tasks", "tasks")
      .orderBy("list.id", "ASC")
      .addOrderBy("tasks.id", "ASC")
      .where("list.id = :listId", { listId: task.listId })
      .getOne();

    if (!list) throw new Error("List not found");
    task.list = list;

    return task;
  }

  @Mutation(() => Task)
  async updateTask(@Args() { id, ...args }: UpdateTaskArgs): Promise<Task> {
    const task = await Task.findOne({ where: { id }, relations });
    if (!task) throw new Error("Task not found");

    Object.assign(task, args);
    return task.save();
  }

  @Mutation(() => Boolean)
  async deleteTasks(@Arg("ids", () => [Int]) ids: number[]): Promise<boolean> {
    try {
      await Task.delete(ids);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
