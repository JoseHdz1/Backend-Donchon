import {
	Column,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('distributors')
export class Distributor {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	contactEmail: string;

	@Column({ nullable: true })
	phoneNumber: string | null;

	@Column({ nullable: true })
	website: string | null;

	@OneToMany(() => Product, (product) => product.distributor)
	products: Product[];

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt: Date | null;
}
