const { PrismaClient } = require("@prisma/client");
const  { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function seed() {
    console.log("Seeding the database.");
    try {
        // Seed instructors
        for (let i = 0; i < 5; i++) {
            await prisma.instructor.create({
                data: {
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                },
            });
        }

        // Seed students
        for (let i = 0; i < 20; i++) {
            await prisma.student.create({
                data:  {
                    name: faker.person.fullName(),
                    cohort: faker.number.int({ min: 2000, max: 3000}).toString(),
                    instructor: { connect: {id: (i % 5) + 1 } },
                },
            });
        }

        console.log("Database is seeded.");
    } catch (err) {
        console.log(err);
    } finally {
        await prisma.$disconnect();
    }
}

seed();