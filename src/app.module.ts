import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BreadsModule } from './breads/breads.module';
import { BreadsTypesModule } from './breads-types/breads-types.module';
import { BreadsCategoryModule } from './breads-category/breads-category.module';
import { ProductsCategotyModule } from './products-categoty/products-categoty.module';
import { ProductsModule } from './products/products.module';
import { DistributorsModule } from './distributors/distributors.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: Number(configService.getOrThrow<string>('DB_PORT')),
        database: configService.getOrThrow<string>('DB_NAME'),
        username: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    BreadsModule,
    BreadsTypesModule,
    BreadsCategoryModule,
    ProductsCategotyModule,
    ProductsModule,
    DistributorsModule,
    UsersModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
