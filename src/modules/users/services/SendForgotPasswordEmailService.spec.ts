import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let SendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()


    SendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    )
  })

  it('should be able to recover the password using the email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      password: '123456'
    })

    await SendForgotPasswordEmail.execute({
      email: 'JohnDoe@example.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {

    await expect(SendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should generate a forgot password token', async () => {

    const generatedToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      password: '123456'
    })

    await SendForgotPasswordEmail.execute({
      email: 'JohnDoe@example.com'
    });

    expect(generatedToken).toHaveBeenCalledWith(user.id);
  })
})
