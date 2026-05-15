import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GrReferentialService } from './gr-referential.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SectionGuard } from '../../common/guards/section.guard';
import { Section } from '../../common/decorators/section.decorator';
import { GrReferential } from './gr-referential.entity';

@ApiTags('GR Referential')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, SectionGuard)
@Controller('gr-referential')
export class GrReferentialController {
  constructor(private readonly service: GrReferentialService) {}

  @Get()
  @Section('gr_referential', 'read')
  @ApiOperation({ summary: 'Liste tous les types GR (hub-admin, hub-integrator, hub-viewer)' })
  findAll(): Promise<GrReferential[]> {
    return this.service.findAll();
  }

  @Get(':objectType')
  @Section('gr_referential', 'read')
  @ApiOperation({ summary: 'Détail d un type GR' })
  findOne(@Param('objectType') objectType: string): Promise<GrReferential> {
    return this.service.findOne(objectType);
  }

  @Patch(':objectType')
  @Section('gr_referential', 'write')
  @ApiOperation({ summary: 'Modifier un type GR (hub-admin uniquement)' })
  update(
    @Param('objectType') objectType: string,
    @Body() dto: Partial<GrReferential>,
  ): Promise<GrReferential> {
    return this.service.update(objectType, dto);
  }

  @Patch(':objectType/toggle')
  @Section('gr_referential', 'write')
  @ApiOperation({ summary: 'Activer / désactiver un type GR' })
  toggle(
    @Param('objectType') objectType: string,
    @Body('is_active') isActive: boolean,
  ): Promise<GrReferential> {
    return this.service.toggleActive(objectType, isActive);
  }
}
