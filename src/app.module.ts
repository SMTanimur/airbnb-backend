import { ReservationsModule } from './reservations/reservations.module';
import { ListsModule } from './lists/lists.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ReservationsModule,
    ListsModule,
    CoreModule,

    UsersModule,
    DatabaseModule,
    ConfigurationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
