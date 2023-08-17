// // Clear and repopulate the database.

const { PrismaClient } = require('@prisma/client');
const { faker } = require("@faker-js/faker");

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
        data: {
          name: faker.person.fullName(),
          cohort: faker.number.int({ min: 2000, max: 3000 }).toString(),
          instructor: { connect: { id: (i % 5) + 1 } },
        },
      });
    }

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();




// const db = require("../db");
// const { faker } = require("@faker-js/faker");

// async function seed() {
//   console.log("Seeding the database.");
//   try {
//     // Clear the database.
//     // await db.query("DROP TABLE IF EXISTS student, instructor;");

//     // // Recreate the tables
//     // await db.query(`
//     //   CREATE TABLE instructor (
//     //     id SERIAL PRIMARY KEY,
//     //     username TEXT UNIQUE NOT NULL,
//     //     password TEXT NOT NULL
//     //   );
//     //   CREATE TABLE student (
//     //     id SERIAL PRIMARY KEY,
//     //     name TEXT NOT NULL,
//     //     cohort TEXT NOT NULL,
//     //     instructorId INTEGER NOT NULL REFERENCES instructor(id) ON DELETE CASCADE
//     //   );
//     // `);

//     // Add 5 instructors.
//     await Promise.all(
//       [...Array(5)].map(() =>
//         db.query(
//           `INSERT INTO instructor (username, password) VALUES ($1, $2);`,
//           [faker.internet.userName(), faker.internet.password()]
//         )
//       )
//     );

//     // Add 4 students for each instructor.
//     await Promise.all(
//       [...Array(20)].map((_, i) =>
//         db.query(
//           `INSERT INTO student (name, cohort, instructorId) VALUES ($1, $2, $3);`,
//           [
//             faker.person.fullName(),
//             faker.number.int({ min: 2000, max: 3000 }),
//             (i % 5) + 1,
//           ]
//         )
//       )
//     );

//     console.log("Database is seeded.");
//   } catch (err) {
//     console.error(err);
//   }
// }

// // Seed the database if we are running this file directly.
// if (require.main === module) {
//   seed();
// }

// module.exports = seed;
