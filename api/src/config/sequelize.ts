interface ISeqDatabase {
  USERNAME: string
  PASSWORD: string
  DATABASE: string
  HOST: string
  PORT: number
}

export const SEQ_DATABASE: ISeqDatabase = {
  USERNAME: process.env.POSTGRES_USER || 'root',
  PASSWORD: process.env.POSTGRES_PASSWORD || 'password',
  DATABASE: process.env.POSTGRES_DB || 'malinda',
  HOST: process.env.DATABASE_HOST || 'postgres',
  PORT: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432
}
