import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
	username: string;
	email: string;
	password: string;
	phoneNumber: string;
	roles: UserRole[];
}
