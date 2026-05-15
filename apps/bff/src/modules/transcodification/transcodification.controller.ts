import { Controller, Get, Post, Patch, Query, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TranscodificationService } from './transcodification.service';
import type { Transcodification } from './transcodification.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SectionGuard } from '../../common/guards/section.guard';
import { Section } from '../../common/decorators/section.decorator';

@ApiTags('Transcodification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, SectionGuard)
@Controller('transcodification')
export class TranscodificationController {
  constructor(private readonly service: TranscodificationService) {}

  @Get()
  @Section('transcodification', 'read')
  @ApiOperation({ summary: 'Liste les transcodifications avec filtres optionnels' })
  @ApiQuery({ name: 'valuetype', required: false })
  @ApiQuery({ name: 'appcode', required: false })
  findAll(
    @Query('valuetype') valuetype?: string,
    @Query('appcode') appcode?: string,
  ) {
    return this.service.findAll(valuetype, appcode);
  }

  @Get('valuetypes')
  @Section('transcodification', 'read')
  @ApiOperation({ summary: 'Liste tous les types de valeurs distincts' })
  getValueTypes() {
    return this.service.getValueTypes();
  }

  @Get('appcodes')
  @Section('transcodification', 'read')
  @ApiOperation({ summary: 'Liste tous les codes application distincts' })
  getAppCodes() {
    return this.service.getAppCodes();
  }

  @Get('resolve')
  @Section('transcodification', 'read')
  @ApiOperation({ summary: 'Résoudre une transcodification via get_transco()' })
  @ApiQuery({ name: 'valuetype', required: true })
  @ApiQuery({ name: 'fromApp', required: true })
  @ApiQuery({ name: 'fromValue', required: true })
  @ApiQuery({ name: 'toApp', required: true })
  getTransco(
    @Query('valuetype') valuetype: string,
    @Query('fromApp') fromApp: string,
    @Query('fromValue') fromValue: string,
    @Query('toApp') toApp: string,
  ) {
    return this.service.getTransco(valuetype, fromApp, fromValue, toApp);
  }

  @Post()
  @Section('transcodification', 'write')
  @ApiOperation({ summary: 'Créer ou mettre à jour une transcodification (upsert)' })
  create(@Body() dto: Record<string, any>) {
    return this.service.create(dto as Transcodification);
  }

  @Patch('toggle')
  @Section('transcodification', 'write')
  @ApiOperation({ summary: 'Activer / désactiver une transcodification' })
  toggle(
    @Query('identifier') identifier: string,
    @Query('valuetype') valuetype: string,
    @Query('appcode') appcode: string,
    @Query('value') value: string,
    @Body('enabled') enabled: boolean,
  ) {
    return this.service.toggleEnabled(identifier, valuetype, appcode, value, enabled);
  }
}
