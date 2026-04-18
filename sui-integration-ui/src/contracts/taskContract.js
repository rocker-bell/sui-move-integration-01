import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, NEW_PACKAGE_ID } from '../config/sui';

/**
 * CREATE TASK
 */
export function createTaskTx(description) {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::task::create_task`,
    arguments: [
      tx.pure.string(description), // ✅ FIX
    ],
  });

  return tx;
}

export function createTaskwalrusTx(descriptionBytes) {
  const tx = new Transaction();

  tx.moveCall({
    target: `${NEW_PACKAGE_ID}::task_walrus::create_task`,
    arguments: [
      tx.pure.vector("u8", descriptionBytes),
    ],
  });

  return tx;
}

/**
 * COMPLETE TASK
 */
export function completeTaskTx(taskId) {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::task::complete_task`,
    arguments: [
      tx.object(taskId),
    ],
  });

  return tx;
}