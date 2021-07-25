import { Column, Entity } from "typeorm";
import { IsEmail, Length, IsNotEmpty, MinLength } from "class-validator";
import Model from "./Model";

@Entity("users")
export class User extends Model {
  @IsNotEmpty()
  @Length(4, 50, { message: "name must be between 4-50 characters" })
  @Column({ type: "varchar", length: 50 })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ type: "varchar", length: 200, unique: true })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: "password must be at least 8 characters long" })
  @Column({ type: "varchar" })
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
  role: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;
}
