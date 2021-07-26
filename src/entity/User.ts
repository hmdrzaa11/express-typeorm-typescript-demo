import { Column, Entity, BeforeInsert } from "typeorm";
import { IsEmail, Length, IsNotEmpty, MinLength } from "class-validator";
import bcrypt from "bcryptjs";

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
  @Column({ type: "varchar", select: false })
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
  role: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  async hashPassword(rawPass: string) {
    let hash = await bcrypt.hash(rawPass, 12);
    this.password = hash;
  }

  @BeforeInsert()
  async hashBeforeInsert() {
    await this.hashPassword(this.password);
  }

  toJSON() {
    //override the "toJson" and undefined the password
    return { ...this, password: undefined, id: undefined };
  }
}
