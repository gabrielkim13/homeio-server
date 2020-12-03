import { container } from 'tsyringe';

import IUsersRepository from '../models/repositories/interfaces/IUsersRepository';
import UsersRepository from '../models/repositories/UsersRepository';

import IPlacesRepository from '../models/repositories/interfaces/IPlacesRepository';
import PlacesRepository from '../models/repositories/PlacesRepository';

import IDevicesRepository from '../models/repositories/interfaces/IDevicesRepository';
import DevicesRepository from '../models/repositories/DevicesRepository';

import ILogsRepository from '../models/repositories/interfaces/ILogsRepository';
import LogsRepository from '../models/repositories/LogsRepository';

import ICryptoProvider from '../providers/interfaces/ICryptoProvider';
import CryptoProvider from '../providers/CryptoProvider';

import IHTTPClientProvider from '../providers/interfaces/IHTTPClientProvider';
import HTTPClientProvider from '../providers/HTTPClientProvider';

container.register<IUsersRepository>('UsersRepository', {
  useClass: UsersRepository,
});

container.register<IPlacesRepository>('PlacesRepository', {
  useClass: PlacesRepository,
});

container.register<IDevicesRepository>('DevicesRepository', {
  useClass: DevicesRepository,
});

container.register<ILogsRepository>('LogsRepository', {
  useClass: LogsRepository,
});

container.register<ICryptoProvider>('CryptoProvider', {
  useClass: CryptoProvider,
});

container.register<IHTTPClientProvider>('HTTPClientProvider', {
  useClass: HTTPClientProvider,
});
