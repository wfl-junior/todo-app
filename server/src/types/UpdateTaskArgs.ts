import { ArgsType, Field, Int } from "type-graphql";
import { IsInt, IsBoolean, Min } from "class-validator";
import { CreateTaskArgs } from "./CreateTaskArgs";

@ArgsType()
export class UpdateTaskArgs extends CreateTaskArgs {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field()
  @IsBoolean()
  completed: boolean;
}
