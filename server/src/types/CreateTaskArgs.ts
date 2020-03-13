import { ArgsType, Field, Int } from "type-graphql";
import { IsString, Length, IsInt, Min } from "class-validator";

@ArgsType()
export class CreateTaskArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  listId: number;
}
