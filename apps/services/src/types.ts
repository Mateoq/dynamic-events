export enum TransactionResultType {
  SUCCESS = 'TRAN_SUCCESS',
  EMAIL_USED = 'TRAN_EMAIL_USED',
  WRONG_ID = 'TRAN_WRONG_ID',
  WRONG_USER = 'TRAN_WRONG_USER',
  ERROR = 'TRAN_ERROR',
  UNKNOWN_ERROR = 'TRAN_UNKNOWN_ERROR'
}

export interface TransactionError {
  message: string;
}

export type TransactionResult<T> = {
  status: boolean;
  type: TransactionResultType;
  data: T;
  error: TransactionError | null;
};
