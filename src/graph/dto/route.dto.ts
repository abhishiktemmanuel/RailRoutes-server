import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class RouteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly stations: string[];
}
