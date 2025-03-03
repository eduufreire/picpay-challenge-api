import { Container } from "inversify";
import AuthorizerService from "../business/services/authorizerService";
import NotificationService from "../business/services/notificationService";
import CreateTransferService from "../business/services/transfer/create";
import { UpdateBalance } from "../interfaces/user/UpdateBalance";
import UpdateBalanceService from "../business/services/user/updateBalance";
import GetTransferService from "../business/services/transfer/get";
import { DefaultTransferRepository } from "../persistence/defaultTransferRepository";
import PrismaTransferRepository from "../persistence/implementation/prismaTransferRepository";
import { Authorizer } from "../interfaces/Authorizer";
import { DefaultUserRepository } from "../persistence/defaultUserRepository";
import { PrismaUserRepository } from "../persistence/implementation/prismaUserRepository";
import { CreateService } from "../interfaces/CreateService";
import CreateUserService from "../business/services/user/create";
import { GetUser } from "../interfaces/user/GetUser";
import GetUserService from "../business/services/user/get";
import UserController from "../presentation/controllers/userController";
import TransferController from "../presentation/controllers/transferController";

const container: Container = new Container();

container.bind<Authorizer>("AuthorizerService").to(AuthorizerService);
container.bind("NotificationService").to(NotificationService);
container.bind<DefaultTransferRepository>("TransferRepository").to(PrismaTransferRepository);
container.bind<CreateService>("CreateTransfer").to(CreateTransferService);
container.bind<UpdateBalance>("UpdateBalance").to(UpdateBalanceService);
container.bind("GetTransfer").to(GetTransferService);
container.bind<DefaultUserRepository>("UserRepository").to(PrismaUserRepository);
container.bind<CreateService>("CreateUser").to(CreateUserService);
container.bind<GetUser>("GetUser").to(GetUserService);
container.bind(UserController).toSelf();
container.bind(TransferController).toSelf();

export { container };
