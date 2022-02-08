import { PrismaClient, Prisma } from "@prisma/client";
import { STUD_NO } from "../pages/api/student";
const prisma = new PrismaClient();

const studentData: Prisma.StudentCreateInput[] = [
  {
    first_name: "Tom",
    last_name: "Holland",
  },
  {
    first_name: "Andrew",
    last_name: "Garfield",
  },
  {
    first_name: "Tobby",
    last_name: "Maguire",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const s of studentData) {
    const student = await prisma.student.create({
      data: s,
    });
    //TEMPORARY
    const student_no = (student.student_no += STUD_NO);
    await prisma.student.update({
      data: {
        student_no,
      },
      where: {
        id: student.id,
      },
    });
    console.log(`Created student with student no: ${student.student_no}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
