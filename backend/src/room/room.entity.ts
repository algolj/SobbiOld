import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'room' })
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
