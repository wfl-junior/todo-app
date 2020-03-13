import { ArgsType, Field } from "type-graphql";
import { IsString, Length } from "class-validator";

@ArgsType()
export class CreateListArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  name: string;
}
