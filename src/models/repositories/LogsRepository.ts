import { getMongoRepository, MongoRepository } from 'typeorm';

import ILogsRepository from './interfaces/ILogsRepository';

import Log from '../schemas/Log';

import { CreateLogDTO } from './dtos/LogsRepositoryDTOs';

class LogsRepository implements ILogsRepository {
  private ormRepository: MongoRepository<Log>;

  constructor() {
    this.ormRepository = getMongoRepository(Log, 'mongo');
  }

  async create({ value, device_id }: CreateLogDTO): Promise<Log> {
    const log = this.ormRepository.create({
      value,
      device_id,
    });

    await this.ormRepository.save(log);

    return log;
  }

  async findById(id: string): Promise<Log | undefined> {
    const log = await this.ormRepository.findOne(id);

    return log;
  }

  async findByDeviceId(device_id: string): Promise<Log[]> {
    const log = await this.ormRepository.find({ device_id });

    return log;
  }
}

export default LogsRepository;
