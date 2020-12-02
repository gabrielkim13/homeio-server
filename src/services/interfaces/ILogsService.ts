import { CreateRequestDTO } from '../dtos/LogsServiceDTOs';

import Log from '../../models/schemas/Log';

interface ILogsService {
  create(data: CreateRequestDTO): Promise<Log>;
  findByDeviceId(device_id: string): Promise<Log[]>;
  findById(id: string): Promise<Log>;
}

export default ILogsService;
