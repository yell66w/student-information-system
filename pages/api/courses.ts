import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const courses = await prisma.course.findMany({});
    res.json(courses);
  } else {
    res.status(404).send("Cannot GET courses");
  }
}
