import { Global, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from 'src/configuration/configuration.module';
import { ConfigurationService } from 'src/configuration/configuration.service';
@Global()
@Module({
  imports: [
    ConfigurationModule,
    // PassportModule.register({ session: true }),
    {
      ...JwtModule.registerAsync({
        useFactory: async (configurationService: ConfigurationService) => ({
          secret: configurationService.JWT_SECRET_KEY,
          signOptions: { expiresIn: '1d' },
        }),
        inject: [ConfigurationService],
      }),
      global: true,
    },
  ],
  providers: [],
  exports: [JwtModule],
})
export class CoreModule {}
