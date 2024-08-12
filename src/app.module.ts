import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { FileModule } from './Files/file.module';
import { UserModule } from './Users/user.module';
import { CompanyModule } from './Companies/company.module';
import { ModelModule } from './Modeles/model.module';
import { CarModule } from './Cars/car.module';
import { TransactionModule } from './Transactions/transaction.module';
import { AuthModule } from './Authjon/auth.module';
import { BrandModule } from './Brands/brand.module';
import { CarImageModule } from './CarImage/car_image.module';
import { CarFindexModule } from './CarFindex/car_findex.module';
import { ColoursModule } from './Colors/colours.module';
import { ContactsModule } from './Contakts/contacts.module';
import { CustomersModule } from './Custamers/customers.module';
import { FindexModule } from './Findexes/findex.module';
import { PaymentsModule } from './Payment/payments.module';
import { RentalsModule } from './Rental/rentals.module';
import { EmailVerificationModule } from './EmailVerification/email_verification.module';
import { TokenManagementModule } from './TokenManagement/token_management.module';



@Module({
  imports:[ CacheModule.register(),FileModule, UserModule, CompanyModule, ModelModule, CarModule, TransactionModule, AuthModule, BrandModule, CarImageModule, CarFindexModule, ColoursModule, ContactsModule, CustomersModule, FindexModule, PaymentsModule, RentalsModule, EmailVerificationModule, TokenManagementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
