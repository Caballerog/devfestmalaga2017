import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16, unique: true })
  name: string;
}