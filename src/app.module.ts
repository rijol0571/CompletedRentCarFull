import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ModelModule } from './model/model.module';
import { CarModule } from './car/car.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [FileModule, UserModule, CompanyModule, ModelModule, CarModule, TransactionModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
