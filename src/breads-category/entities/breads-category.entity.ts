import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bread_categories')
export class BreadsCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: 'text', nullable: true })
	description: string | null;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt: Date | null;
}
