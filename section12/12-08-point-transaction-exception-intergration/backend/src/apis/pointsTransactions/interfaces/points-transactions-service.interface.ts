import { IAuthUser } from 'src/commons/interfaces/context';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from '../entities/pointTransaction.entity';

export interface IPointsTransactionsServiceFindOneByImpUid {
  impUid: string;
}

export interface IPointsTransactionsServiceCheckDuplication {
  impUid: string;
}

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
  status?: POINT_TRANSACTION_STATUS_ENUM;
}

export interface IPointsTransactionsServiceCreateForPayment {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceFindByImpUidAndUser {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceCancel {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceAlreadyCanceled {
  pointTransactions: PointTransaction[];
}

export interface IPointsTransactionsServiceCheckHasCancellablePoint {
  pointTransactions: PointTransaction[];
}
