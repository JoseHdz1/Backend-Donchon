import {
	Column,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('locations')
export class Location {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	type: string;

	@Column({ nullable: true })
	address: string | null;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt: Date | null;
}
