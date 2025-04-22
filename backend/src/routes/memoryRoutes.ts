import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// GET all memory blocks
router.get('/memory-blocks', async (req, res) => {
  try {
    const memoryBlocks = await prisma.memoryBlock.findMany();
    res.status(200).json(memoryBlocks);
  } catch (error) {
    console.error('Error fetching memory blocks:', error);
    res.status(500).json({ error: 'Failed to fetch memory blocks' });
  }
});

// POST a new memory block
router.post('/memory-blocks', async (req, res) => {
  const { size, frameNumber, processId, processName, isAllocated } = req.body;

  try {
    const newBlock = await prisma.memoryBlock.create({
      data: {
        size,
        frameNumber,
        processId,
        processName,
        isAllocated,
      },
    });
    res.status(201).json(newBlock);
  } catch (error) {
    console.error('Error creating memory block:', error);
    res.status(500).json({ error: 'Failed to create memory block' });
  }
});

// PUT to update a memory block
router.put('/memory-blocks/:id', async (req, res) => {
  const { id } = req.params;
  const { size, frameNumber, processId, processName, isAllocated } = req.body;

  try {
    const updatedBlock = await prisma.memoryBlock.update({
      where: { id }, // ❗ Prisma expects `id` to be a string (for MongoDB ObjectId)
      data: {
        size,
        frameNumber,
        processId,
        processName,
        isAllocated,
      },
    });
    res.status(200).json(updatedBlock);
  } catch (error) {
    console.error('Error updating memory block:', error);
    res.status(500).json({ error: 'Failed to update memory block' });
  }
});

// DELETE a memory block
router.delete('/memory-blocks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.memoryBlock.delete({
      where: { id }, // ❗ MongoDB ObjectId is a string, no need to parseInt
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting memory block:', error);
    res.status(500).json({ error: 'Failed to delete memory block' });
  }
});

export default router;
