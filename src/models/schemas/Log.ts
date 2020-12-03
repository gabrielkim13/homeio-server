import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('logs')
class Log {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  device_id: string;

  @Column()
  value: Record<string, unknown>;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default Log;
