import { FAKE_POSTS } from "@/data";
import { prisma } from "@/db/client"

const seed = async () => {
    
    await prisma.info.deleteMany();

    await prisma.info.createMany({
        data : FAKE_POSTS
    });
    console.log("database seeded ...");
};

seed()