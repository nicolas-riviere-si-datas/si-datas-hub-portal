import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SectionGuard } from '../../common/guards/section.guard';
import { Section } from '../../common/decorators/section.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, SectionGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @Section('users', 'read')
  @ApiOperation({ summary: 'Liste tous les utilisateurs (hub-admin uniquement)' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @Section('users', 'read')
  @ApiOperation({ summary: 'Détail d un utilisateur' })
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch(':id')
  @Section('users', 'write')
  @ApiOperation({ summary: 'Modifier préférences utilisateur' })
  update(@Param('id') id: string, @Body() dto: Record<string, any>) {
    return this.service.update(id, dto);
  }

  @Patch(':id/role')
  @Section('users', 'write')
  @ApiOperation({ summary: 'Changer le rôle d un utilisateur (hub-admin uniquement)' })
  updateRole(@Param('id') id: string, @Body('role') role: string) {
    return this.service.updateRole(id, role);
  }

  @Patch(':id/toggle')
  @Section('users', 'write')
  @ApiOperation({ summary: 'Activer / désactiver un utilisateur' })
  toggle(@Param('id') id: string, @Body('is_active') isActive: boolean) {
    return this.service.toggleActive(id, isActive);
  }

  @Get('section-access/:role')
  @Section('users', 'read')
  @ApiOperation({ summary: 'Droits d accès par rôle' })
  getSectionAccess(@Param('role') role: string) {
    return this.service.getSectionAccess(role);
  }
}
