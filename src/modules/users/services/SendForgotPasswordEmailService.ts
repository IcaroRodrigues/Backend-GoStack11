import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepositoy from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';


// import User from '../infra/typeorm/entities/User';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotEmailPasswordService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositoy,

    @inject('MailProdiver')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {

    const user = await this.usersRepository.findByEmail(email)

    if(!user) {

      throw new AppError('User does not exists.')
    }

    await this.userTokensRepository.generate(user.id)

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido.')
  }
}

export default SendForgotEmailPasswordService;
