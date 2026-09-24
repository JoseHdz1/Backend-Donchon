import { UnitType } from '../../common/enums/unit-type.enum';

export class CreateProductDto {
	name: string;
	categoryId: number;
	distributorId: number;
	unitType: UnitType;
	purchasePrice: number;
	unitPrice: number;
	usageType: string;
	salesPrice?: number;
	description?: string;
	expirationDay?: Date;
}
