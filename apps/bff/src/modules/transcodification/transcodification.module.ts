import { Module } from '@nestjs/common';
import { TranscodificationController } from './transcodification.controller';
import { TranscodificationService } from './transcodification.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TranscodificationController],
  providers: [TranscodificationService],
})
export class TranscodificationModule {}
