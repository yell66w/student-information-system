-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "student_no" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_no_key" ON "Student"("student_no");
