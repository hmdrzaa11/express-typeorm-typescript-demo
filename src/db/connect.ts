import { createConnection } from "typeorm";

export default function () {
  return createConnection();
}
