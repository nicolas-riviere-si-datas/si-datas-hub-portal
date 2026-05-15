import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SectionGuard } from '../../common/guards/section.guard';
import { Section } from '../../common/decorators/section.decorator';

@ApiTags('Tenant')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, SectionGuard)
@Controller('tenant')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Get('config')
  @Section('tenant_config', 'read')
  @ApiOperation({ summary: 'Configuration et personnalisation du tenant' })
  getConfig() { return this.service.getConfig(); }

  @Patch('config')
  @Section('tenant_config', 'write')
  @ApiOperation({ summary: 'Modifier la configuration du tenant (hub-admin uniquement)' })
  updateConfig(@Body() dto: Record<string, any>) {
    return this.service.updateConfig(dto);
  }
}
