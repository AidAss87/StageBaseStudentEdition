// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => new PrismaClient();

// export const prisma = globalThis.prisma || prismaClientSingleton();

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// if (process.env.NODE_ENV !== "production") {
//     globalThis.prisma = prisma
// }

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
