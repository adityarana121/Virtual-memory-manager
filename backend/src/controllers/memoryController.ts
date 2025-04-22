import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMemoryBlocks = async (req: Request, res: Response) => {
  try {
    const memoryBlocks = await prisma.memoryBlock.findMany();
    res.json(memoryBlocks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memory blocks" });
  }
};

export const addMemoryBlock = async (req: Request, res: Response) => {
  try {
    const { frameNumber, used, address } = req.body;

    const existingBlock = await prisma.memoryBlock.findFirst({
      where: { address },
    });

    let pageFault = false;

    if (!existingBlock) {
      await prisma.memoryBlock.create({
        data: { frameNumber, used, address },
      });
      pageFault = true;
    }

    const memoryBlock = await prisma.memoryBlock.findMany();
    res.json({ memoryBlock, pageFault });
  } catch (error) {
    res.status(500).json({ error: "Failed to add memory block" });
  }
};

export const clearMemory = async (req: Request, res: Response) => {
  try {
    await prisma.memoryBlock.deleteMany();
    res.json({ message: "Memory cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear memory" });
  }
};
