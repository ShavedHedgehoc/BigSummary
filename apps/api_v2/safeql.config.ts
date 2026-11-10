// apps/api_v2/safeql.config.ts

export default {
  connections: [
    {
      // Подключение к вашей живой БД
      databaseUrl: process.env.DATABASE_URL,

      // Путь к вашей схеме Prisma внутри монорепозитория
      prismaSchemaPath: '../../packages/db/mssql/prisma/schema.prisma',

      targets: [
        {
          tag: 'mssqlPrisma\\.\\$(queryRaw|executeRaw)',
          transform: '{type}',
        },
      ],
      overrides: {
        types: {
          datetime: 'Date',
          datetime2: 'Date',
          date: 'Date',
          bigint: 'number',
        },
      },
    },
  ],
};
