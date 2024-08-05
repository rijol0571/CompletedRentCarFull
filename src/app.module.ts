import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ModelModule } from './model/model.module';
import { CarModule } from './car/car.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CarImageModule } from './car_image/car_image.module';
import { CarFindexModule } from './car_findex/car_findex.module';
import { ColoursModule } from './colours/colours.module';
import { ContactsModule } from './contacts/contacts.module';
import { CustomersModule } from './customers/customers.module';
import { FindexModule } from './findex/findex.module';
import { PaymentsModule } from './payments/payments.module';
import { RentalsModule } from './rentals/rentals.module';
import { EmailVerificationModule } from './email_verification/email_verification.module';
import { TokenManagementModule } from './token_management/token_management.module';


@Module({
  imports: [FileModule, UserModule, CompanyModule, ModelModule, CarModule, TransactionModule, AuthModule, BrandModule, CarImageModule, CarFindexModule, ColoursModule, ContactsModule, CustomersModule, FindexModule, PaymentsModule, RentalsModule, EmailVerificationModule, TokenManagementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
