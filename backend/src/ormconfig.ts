import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'ec2-54-229-68-88.eu-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'dfkt391oc1h473',
  username: 'autqspedcnalcg',
  password: '74d90270e97ca78cd3782409544cbb732be3b8e605b0a667d184110fc10fc7e6',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default config;
