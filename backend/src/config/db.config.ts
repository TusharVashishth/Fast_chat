import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";

const globalClient = new PrismaClient();

export const prismaClient = globalClient.$extends(
  fieldEncryptionExtension({
    encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
  })
);
