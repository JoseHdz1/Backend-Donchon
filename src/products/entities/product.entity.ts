import {
	Column,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Distributor } from '../../distributors/entities/distributor.entity';
import { ProductCategory } from '../../products-categoty/entities/products-categoty.entity';
import { UnitType } from '../../common/enums/unit-type.enum';

@Entity('products')
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => ProductCategory, (category) => category.products, {
		nullable: false,
	})
	@JoinColumn({ name: 'category_id' })
	category: ProductCategory;

	@ManyToOne(() => Distributor, (distributor) => distributor.products, {
		nullable: false,
	})
	@JoinColumn({ name: 'distributor_id' })
	distributor: Distributor;

	@Column({ type: 'enum', enum: UnitType })
	unitType: UnitType;

	@Column({ type: 'double precision' })
	purchasePrice: number;

	@Column({ type: 'double precision' })
	unitPrice: number;

	@Column()
	usageType: string;

	@Column({ type: 'double precision', nullable: true })
	salesPrice: number | null;

	@Column({ type: 'text', nullable: true })
	description: string | null;

	@Column({ type: 'date', nullable: true })
	expirationDay: Date | null;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt: Date | null;
}
