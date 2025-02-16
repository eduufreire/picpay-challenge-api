import { TransferType } from "../../interfaces/transfer/Transfer";
import { DefaultTransferRepository } from "../../persistence/defaultTransferRepository";

const responseSuccessTransfer = {
    id: 1,
    userId: 1,
    idPaymentTrace: 1,
    amount: 1,
    type: TransferType.CREDIT,
    createdAt: Date.now(),
};

const responseGetTransfer = {
    id: 2,
    userId: 2,
    idPaymentTrace: 1,
    amount: 1,
    type: TransferType.DEBIT,
    createdAt: Date.now(),
};

export const mockTransferSuccessRepository: jest.Mocked<DefaultTransferRepository> = {
    save: jest.fn().mockResolvedValue(responseSuccessTransfer),
    getByPaymentTrace: jest.fn().mockResolvedValue([responseSuccessTransfer, responseGetTransfer]),
};