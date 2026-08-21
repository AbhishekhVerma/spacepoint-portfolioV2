import "dotenv/config";
import { prisma } from "./src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "operator@spacepoint.com";
  const password = "password123";
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "SpacePoint Operator",
      password: hashedPassword,
      portfolio: {
        create: {
          username: "operator",
          aboutText: "A multidisciplinary 3rd‑year Computer Science student focused on data workflows, automation, and software development with applied artificial intelligence.",
          missionLog: "My engineering portfolio highlights practical deployments across the aerospace and AI stack.",
          profileImage: "/img/profile.jpg",
          workshopsCount: 3,
          studentsCount: 30,
          themePrimaryColor: "#ff3333",
          themeBackgroundColor: "#0a0a0a",
        }
      }
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
