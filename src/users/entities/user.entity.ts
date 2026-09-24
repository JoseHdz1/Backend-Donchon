import {
	Column,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity('app_users')
export class AppUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column({ select: false })
	password: string;

	@Column()
	phoneNumber: string;

	@Column({ type: 'enum', enum: UserRole, array: true })
	roles: UserRole[];

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt: Date | null;
}
