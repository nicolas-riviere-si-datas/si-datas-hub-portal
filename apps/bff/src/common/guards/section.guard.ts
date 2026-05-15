import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/auth.service';

export const SECTION_KEY = 'section';
export const ACTION_KEY = 'action';

@Injectable()
export class SectionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const section = this.reflector.get<string>(SECTION_KEY, context.getHandler());
    const action = (this.reflector.get<string>(ACTION_KEY, context.getHandler()) ?? 'read') as 'read' | 'write' | 'delete';
    if (!section) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.role) throw new ForbiddenException('Rôle non défini');

    const allowed = await this.authService.canAccess(user.role, section, action);
    if (!allowed) throw new ForbiddenException(`Accès refusé : ${action} sur ${section}`);
    return true;
  }
}
