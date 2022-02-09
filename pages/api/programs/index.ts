import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const collegeId = req.query.collegeId;
    let filters = {};
    if (collegeId) {
      filters = { ...filters, where: { collegeId: Number(collegeId) } };
    }
    const programs = await prisma.program.findMany({
      include: {
        college: true,
      },
      ...filters,
      orderBy: [{ id: "asc" }],
    });
    res.json(programs);
  } else {
    res.status(404).send("Cannot GET programs");
  }
}
