import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function up() {
	await prisma.user.createMany({
		data: [
			{
				displayName: 'Alice',
				email: 'alice@icloud.com',
				password:
					'$argon2id$v=19$m=65536,t=3,p=4$5nVurVw15V+q9Xln7H/Tdw$3aDIGSdlW/umSU8Kn+6EAfNZjBxMkUEEMRCiL6ergqc',
				role: 'USER',
				token: randomUUID(),
			},
			{
				displayName: 'John',
				email: 'john@icloud.com',
				password:
					'$argon2id$v=19$m=65536,t=3,p=4$5nVurVw15V+q9Xln7H/Tdw$3aDIGSdlW/umSU8Kn+6EAfNZjBxMkUEEMRCiL6ergqc',
				role: 'ADMIN',
				token: randomUUID(),
			},
		],
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
