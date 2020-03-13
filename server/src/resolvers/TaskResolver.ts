import { Resolver, Query, Mutation, Arg, Int, Args } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskArgs } from "../types/CreateTaskArgs";
import { validateOrReject } from "class-validator";
import { List } from "../entities/List";
import { UpdateTaskArgs } from "../types/UpdateTaskArgs";

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return await Task.find({ order: { id: "ASC" }, relations: ["list"] });
  }

  @Mutation(() => Task)
  async createTask(@Args() args: CreateTaskArgs): Promise<Task> {
    await validateOrReject(args);

    const task = await Task.create(args).save();
    const list = await List.findOne({
      where: { id: task.listId },
      relations: ["tasks"]
    });
    if (!list) throw new Error("List not found");
    task.list = list;

    return task;
  }

  @Mutation(() => Task)
  async updateTask(@Args() { id, ...args }: UpdateTaskArgs): Promise<Task> {
    await validateOrReject({ id, ...args });

    await Task.update({ id }, args);

    const task = await Task.findOne({ where: { id }, relations: ["list"] });
    if (!task) throw new Error("Task not found");

    return task;
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
