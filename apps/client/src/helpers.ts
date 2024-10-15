import {
  TransactionResult,
  TransactionResultType,
  TransactionError
} from '@/types';

export function newTransactionResult<T>(
  data: T,
  type: TransactionResultType,
  status: boolean,
  error: TransactionError | null = null
): TransactionResult<T> {
  return {
    data,
    type,
    status,
    error
  };
}
