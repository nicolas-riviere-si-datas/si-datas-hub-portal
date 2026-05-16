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
    console.log('SectionGuard user:', JSON.stringify(user));
    console.log('SectionGuard section:', section, 'action:', action);

    if (!user?.role) {
      console.log('SectionGuard: no role found, rejecting');
      throw new ForbiddenException('Role non defini');
    }

    const allowed = await this.authService.canAccess(user.role, section, action);
    console.log('SectionGuard allowed:', allowed);
    if (!allowed) throw new ForbiddenException(`Acces refuse : ${action} sur ${section}`);
    return true;
  }
}
