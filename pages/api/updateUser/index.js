import { db } from "../../../utils/db.server";

export default async function handle(req, res) {
  let { id, role } = req.body;

  const user = await db.user.findFirst({
    where: {
      id,
    },
  });
  if (!role) role = user.role;

  if (!user) return res.send("User not found");

  await db.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });

  return red.send("Done updating");
}
