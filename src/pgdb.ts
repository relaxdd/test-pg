import pgp from "pg-promise";
import { SYSTEM_MESSAGES } from "./defines";
import { PGCL } from ".";

const pgdb = pgp({
  error(err: any) {
    console.log(err);
    process.exit(0);
  },
  connect() {
    console.log("[postgres]: " + SYSTEM_MESSAGES.SUCCESS_CONNECT);
  },
})(PGCL);

export default pgdb;
