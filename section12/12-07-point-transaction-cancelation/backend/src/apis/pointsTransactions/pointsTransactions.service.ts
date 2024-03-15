import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import {
  IPointsTransactionsServiceAlreadyCanceled,
  IPointsTransactionsServiceCancel,
  IPointsTransactionsServiceCheckDuplication,
  IPointsTransactionsServiceCheckHasCancellablePoint,
  IPointsTransactionsServiceCreate,
  IPointsTransactionsServiceCreateForPayment,
  IPointsTransactionsServiceFindByImpUidAndUser,
  IPointsTransactionsServiceFindOneByImpUid,
} from './interfaces/points-transactions-service.interface';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly iamportService: IamportService,
  ) {}

  findOneByImpUid({
    impUid,
  }: IPointsTransactionsServiceFindOneByImpUid): Promise<PointTransaction> {
    return this.pointsTransactionsRepository.findOne({ where: { impUid } });
  }

  async checkDuplication({
    impUid,
  }: IPointsTransactionsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록한 결제 아이디입니다.');
  }

  async create({
    impUid,
    amount,
    user: _user,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    const pointTransaction = this.pointsTransactionsRepository.create({
      impUid,
      amount,
      user: _user,
      status,
    });
    await this.pointsTransactionsRepository.save(pointTransaction);

    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    await this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    return pointTransaction;
  }

  async createForPayment({
    impUid,
    amount,
    user,
  }: IPointsTransactionsServiceCreateForPayment): Promise<PointTransaction> {
    await this.iamportService.checkPaid({ impUid, amount });
    await this.checkDuplication({ impUid });

    return this.create({
      impUid,
      amount,
      user,
    });
  }

  findByImpUidAndUser({
    impUid,
    user,
  }: IPointsTransactionsServiceFindByImpUidAndUser): Promise<
    PointTransaction[]
  > {
    return this.pointsTransactionsRepository.find({
      where: { impUid, user: { id: user.id } },
      relations: ['user'],
    });
  }

  alreadyCanceled({
    pointTransactions,
  }: IPointsTransactionsServiceAlreadyCanceled): void {
    const canceledPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    );
    if (canceledPointTransactions.length) {
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
    }
  }

  checkHasCancellablePoint({
    pointTransactions,
  }: IPointsTransactionsServiceCheckHasCancellablePoint): void {
    const paidPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    );
    if (!paidPointTransactions.length) {
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');
    }
    if (paidPointTransactions[0].user.point < paidPointTransactions[0].amount) {
      throw new UnprocessableEntityException('포인트가 부족합니다.');
    }
  }

  async cancel({
    impUid,
    user,
  }: IPointsTransactionsServiceCancel): Promise<PointTransaction> {
    const pointTransactions = await this.findByImpUidAndUser({ impUid, user });
    this.alreadyCanceled({ pointTransactions });
    this.checkHasCancellablePoint({ pointTransactions });

    const canceledAmount = await this.iamportService.cancel({ impUid });

    return this.create({
      impUid,
      amount: -canceledAmount,
      user,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
  }
}
