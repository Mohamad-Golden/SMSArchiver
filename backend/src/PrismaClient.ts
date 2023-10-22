import { PrismaClient } from "@prisma/client";

export const dbClient = new PrismaClient();

export default dbClient;
