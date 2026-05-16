import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwks: any;
  private issuer: string;

  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'placeholder',
    });
    const keycloak = config.get('keycloak');
    this.issuer = `${keycloak.url}/realms/${keycloak.realm}`;
    const jwksUri = new URL(`${this.issuer}/protocol/openid-connect/certs`);
    console.log('JWKS URI:', jwksUri.toString());
    this.jwks = createRemoteJWKSet(jwksUri);
  }

  async validate(payload: any) {
    console.log('validate called placeholder');
    return payload;
  }

  async authenticate(req: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!token) {
      this.fail({ message: 'No token' }, 401);
      return;
    }
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
      });
      console.log('jose verify OK:', payload.sub, (payload as any).realm_access?.roles);
      const user = {
        keycloakId: payload.sub,
        email: (payload as any).email,
        nom: (payload as any).family_name,
        prenom: (payload as any).given_name,
        role: (payload as any).realm_access?.roles?.find((r: string) =>
          ['hub-admin', 'hub-integrator', 'hub-viewer', 'hub-metier'].includes(r)
        ) ?? null,
      };
      this.success(user);
    } catch (err) {
      console.error('jose verify FAILED:', err.message);
      this.fail({ message: err.message }, 401);
    }
  }
}
