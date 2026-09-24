import {
	Column,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { BreadsCategory } from '../../breads-category/entities/breads-category.entity';
import { BreadsType } from '../../breads-types/entities/breads-type.entity';

@Entity('breads')
export class Bread {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => BreadsType, { nullable: false })
	@JoinColumn({ name: 'bread_type_id' })
	breadType: BreadsType;

	@ManyToOne(() => BreadsCategory, { nullable: false })
	@JoinColumn({ name: 'category_id' })
	category: BreadsCategory;

	@Column({ type: 'integer', nullable: true })
	shelfLifeDays: number | null;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt: Date | null;
}
