import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakerUserRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserervice from './AuthenticateUserService';
import CreateUserService from '../services/CreateUserService'

describe('AuthenticateUser', () => {

  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()


    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )

    const authenticateUser = new AuthenticateUserervice(
      fakeUserRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });
})
