import { Module } from '@nestjs/common';
import { GrReferentialController } from './gr-referential.controller';
import { GrReferentialService } from './gr-referential.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GrReferentialController],
  providers: [GrReferentialService],
})
export class GrReferentialModule {}
