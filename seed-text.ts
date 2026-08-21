import { prisma } from './src/lib/prisma';

async function main() {
  const users = await prisma.user.findMany();
  
  if (users.length === 0) {
    console.log("No users found to attach portfolio to.");
    return;
  }

  const userId = users[0].id; // Just update the first user's portfolio since there's only one in this prototype

  await prisma.portfolio.upsert({
    where: { userId: userId },
    update: {
      aboutText: 'A multidisciplinary 3rd-year Computer Science student focused on data workflows, automation, and software development with applied artificial intelligence. Built backend systems, web applications, and AI-enabled tools through internships, projects, and winning hackathons. Strong foundation in object-oriented programming, databases, and scalable software design, with a keen interest in learning new tools and contributing to production-grade full-stack systems alongside bridging the gap between complex hardware systems and reliable software.',
      missionLog: 'My engineering portfolio highlights practical deployments across the aerospace and AI stack. I\'ve designed and validated Int8 quantized CNN architectures for real-time edge terrain classification, engineered decentralized RF mesh networks for resilient LEO satellite communications, and constructed high-gain ground station uplinks for telemetry interception in hostile urban environments. Alongside building live telemetry analytics dashboards, I also actively train the next generation of engineers through intensive STEM workshops.',
    },
    create: {
      userId: userId,
      username: 'operator',
      aboutText: 'A multidisciplinary 3rd-year Computer Science student focused on data workflows, automation, and software development with applied artificial intelligence. Built backend systems, web applications, and AI-enabled tools through internships, projects, and winning hackathons. Strong foundation in object-oriented programming, databases, and scalable software design, with a keen interest in learning new tools and contributing to production-grade full-stack systems alongside bridging the gap between complex hardware systems and reliable software.',
      missionLog: 'My engineering portfolio highlights practical deployments across the aerospace and AI stack. I\'ve designed and validated Int8 quantized CNN architectures for real-time edge terrain classification, engineered decentralized RF mesh networks for resilient LEO satellite communications, and constructed high-gain ground station uplinks for telemetry interception in hostile urban environments. Alongside building live telemetry analytics dashboards, I also actively train the next generation of engineers through intensive STEM workshops.',
    }
  });
  console.log('Database seeded with default text.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
