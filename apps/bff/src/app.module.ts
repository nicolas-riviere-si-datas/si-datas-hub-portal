import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GrReferentialModule } from './modules/gr-referential/gr-referential.module';
import { TranscodificationModule } from './modules/transcodification/transcodification.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    GrReferentialModule,
    TranscodificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
