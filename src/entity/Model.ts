import { v4 as uuid } from "uuid";
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  BeforeInsert,
  Column,
} from "typeorm";

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "uuid" })
  uuid: string;

  @BeforeInsert()
  assignUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, id: undefined }; //remove id from any instance
  }
}
