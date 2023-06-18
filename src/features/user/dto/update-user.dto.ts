export class UpdateUserDto {
  public readonly name?: {
    firstName?: string;
    lastName?: string;
  };
  public readonly email?: string;
}
