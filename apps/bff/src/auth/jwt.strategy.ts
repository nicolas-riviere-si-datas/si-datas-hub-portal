import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    const keycloak = config.get('keycloak');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${keycloak.url}/realms/${keycloak.realm}/protocol/openid-connect/certs`,
      }),
      audience: keycloak.clientId,
      issuer: `${keycloak.url}/realms/${keycloak.realm}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    if (!payload) throw new UnauthorizedException();
    return {
      keycloakId: payload.sub,
      email: payload.email,
      nom: payload.family_name,
      prenom: payload.given_name,
      role: payload.realm_access?.roles?.find((r: string) =>
        ['hub-admin', 'hub-integrator', 'hub-viewer', 'hub-metier'].includes(r)
      ) ?? null,
    };
  }
}
