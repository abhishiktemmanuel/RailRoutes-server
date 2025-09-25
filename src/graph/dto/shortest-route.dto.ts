import { IsString, IsNotEmpty } from 'class-validator';

export class ShortestRouteDto {
  @IsString()
  @IsNotEmpty()
  readonly start: string;

  @IsString()
  @IsNotEmpty()
  readonly end: string;
}
