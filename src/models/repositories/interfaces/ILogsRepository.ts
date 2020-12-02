import Log from '../../schemas/Log';

import { CreateLogDTO } from '../dtos/LogsRepositoryDTOs';

interface ILogsRepository {
  create(data: CreateLogDTO): Promise<Log>;
  findById(id: string): Promise<Log | undefined>;
  findByDeviceId(device_id: string): Promise<Log[]>;
}

export default ILogsRepository;
