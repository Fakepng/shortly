import { db } from "../../../utils/db.server";

export default async function handle(req, res) {
  const { id } = req.body;

  const user = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) return res.send("User not found");

  await db.user.delete({
    where: {
      id,
    },
  });

  return red.send("Done deleting user");
}
