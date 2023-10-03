import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file
import { ConfigurationService } from './configuration/configuration.service';

const env = process.env.NODE_ENV || 'dev';
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configurationService =
      app.get<ConfigurationService>(ConfigurationService);

    // app.use(morgan('common'));
    app.enableCors({
      credentials: true,
      origin: [
        configurationService.WEB_URL,
        // configurationService.ADMIN_URL,
        'http://localhost:3000',
        'http://localhost:4000',
        'https://accounts.google.com',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    app.disable('x-powered-by');

    if (env !== 'dev') {
      app.set('trust proxy', true);
    }

    app.use(cookieParser());
    // Enable API versioning
    app.enableVersioning({
      type: VersioningType.URI,
    });

    // Swagger Setup
    const config = new DocumentBuilder()
      .setTitle('Airbnb - An API for Airbnb')
      .setDescription(
        'Airbnb is your source for quality auto parts, advice and accessories. View family care tips, shop online for home delivery, or pick up in one of our 4000 convenient store locations in 30 minutes or less.',
      )
      .setVersion('1.0')
      .addServer(configurationService.API_URL)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // app.useGlobalFilters(new NestHttpExceptionFilter(configurationService));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(
      ` Alhamdulillah! - Application is running on: http://localhost:${port} 🚀 `
        .bgCyan.black,
    );
  } catch (error) {
    Logger.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
}
bootstrap();
