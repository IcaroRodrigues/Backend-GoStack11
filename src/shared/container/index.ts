import { container } from 'tsyringe'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppoitmentnsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentsRepository>('AppoitmentnsRepository', AppoitmentnsRepository);

container.registerSingleton<IUsersRepository>('AppoitmentnsRepository', UsersRepository);


