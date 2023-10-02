/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import 'colors';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ConfigurationService } from 'src/configuration/configuration.service';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configurationService: ConfigurationService) => ({
        uri: configurationService.MONGODB_URI,
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            Logger.log(
              ` Alhamdulillah! MongoDB Connected with: ${connection.host} `
                .bgWhite.black,
            );
          }

          connection.on('disconnected', () => {
            Logger.warn('DB disconnected');
          });

          connection.on('error', (error) => {
            Logger.error(
              ` DB connection failed! for error: ${error} `.bgRed.black
                .underline.bold,
            );
          });

          //! MongoDB AutoPopulate Plugin Initialization
          connection.plugin(mongoosePaginate);
          return connection;
        },
      }),
      inject: [ConfigurationService],
    }),
  ],
})
export class DatabaseModule {}
