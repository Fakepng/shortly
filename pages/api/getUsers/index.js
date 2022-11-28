import { db } from "../../../utils/db.server";

export default async function handle(req, res) {
  const users = await db.user.findMany();

  res.json(users);
}
