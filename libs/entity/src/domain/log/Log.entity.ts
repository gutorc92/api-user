import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'log' })
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column('jsonb', { nullable: false })
  body: string;

  @Column()
  time: Date;
}
