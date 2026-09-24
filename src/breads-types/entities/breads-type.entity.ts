import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bread_types')
export class BreadsType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: 'double precision' })
	unitPrice: number;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt: Date | null;
}
