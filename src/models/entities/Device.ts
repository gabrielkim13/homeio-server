import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Place from './Place';

export enum DeviceTypes {
  LightBulb,
  LightSensor,
}

@Entity('devices')
class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ip: string;

  @Column('numeric')
  type: DeviceTypes;

  @ManyToOne(() => Place)
  @JoinColumn({ name: 'place_id', referencedColumnName: 'id' })
  place: Place;

  @Column()
  place_id: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default Device;
