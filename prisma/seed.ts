import { PrismaClient, Prisma } from "@prisma/client";
import { STUD_NO } from "../pages/api/student";
const prisma = new PrismaClient();

const collegeData: Prisma.CollegeCreateInput[] = [
  {
    name: "College of Arts and Sciences",
    acronym: "CAS",
    programs: {
      create: [
        {
          name: "Bachelor of Science in Information Technology",
          acronym: "BSIT",
          courses: {
            create: [
              {
                name: "IT Fundamentals",
                code: "IT_206",
              },
              {
                name: "Database Management System",
                code: "IT_146",
              },
              {
                name: "Web Development",
                code: "IT_484",
              },
              {
                name: "Data Structures",
                code: "IT_187",
              },
              {
                name: "Systems Analysis and Design",
                code: "IT_385",
              },
            ],
          },
        },
        {
          name: "Bachelor of Science in Social Work",
          acronym: "BSSW",
        },
        {
          name: "Bachelor of Arts in Communication",
          acronym: "ABCOM",
        },
        {
          name: "Bachelor of Arts in Political Science",
          acronym: "AB POSCI",
        },
      ],
    },
    students: {
      create: [
        {
          first_name: "Tom",
          last_name: "Holland",
        },
      ],
    },
  },
  {
    name: "College of Education",
    acronym: "COFED",
    programs: {
      create: [
        {
          name: "Bachelor of Science in Elementary Education",
          acronym: "BEED",
        },
        {
          name: "Bachelor of Science in Secondary Education",
          acronym: "BSED",
          courses: {
            create: [
              { name: "Principles of Teaching", code: "BSED_160" },
              { name: "Facilitating Learning", code: "BSED_490" },
              { name: "Assessment of Student Learning", code: "BSED_457" },
              { name: "Social Dimensions of Education", code: "BSED_130" },
            ],
          },
        },
        {
          name: "Bachelor of Science in Special Education",
          acronym: "BSPED",
        },
      ],
    },
    students: {
      create: [
        {
          first_name: "Andrew",
          last_name: "Garfield",
        },
      ],
    },
  },
  {
    name: "College of Management and Entrepreneurship",
    acronym: "CME",
    programs: {
      create: [
        {
          name: "Bachelor of Science in Tourism Management",
          acronym: "BSTM",
          courses: {
            create: [
              { name: "Total Quality Management", code: "BSTM_453" },
              {
                name: "Food and Beverage Service Procedures",
                code: "BSTM_163",
              },
              { name: "Tourism Planning and Development", code: "BSTM_294" },
            ],
          },
        },
        {
          name: "Bachelor of Science in Hospitality Management",
          acronym: "BSHM",
        },
        {
          name: "Bachelor of Science in Entrepreneurship",
          acronym: "BSEntrep",
        },
      ],
    },
    students: {
      create: [
        {
          first_name: "Tobby",
          last_name: "Maguire",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const c of collegeData) {
    const college = await prisma.college.create({
      data: c,
      include: {
        students: true,
      },
    });
    console.log(`Created college with college id: ${college.id}`);
  }

  await prisma.student.updateMany({
    data: {
      student_no: {
        increment: STUD_NO,
      },
    },
  });

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
