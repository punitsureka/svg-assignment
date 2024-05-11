import pkg from 'pg';

const { Pool } = pkg;

class PGClient {
  constructor(options = {}) {
    const {
      user = process.env.PG_USER || 'postgres',
      password = process.env.PG_PASSWORD || 'postgres',
      host = process.env.PG_HOST || 'localhost',
      port = process.env.PG_PORT || 5432,
    } = options;

    this.pool = new Pool({user, password, host, port});
    this.is_connected = false;
  }

  async connect() {
    try {
      if (!this.is_connected) {
        this.client = await this.pool.connect();
        this.is_connected = true;
      }
    } catch (error) {
      console.error('Error connecting to the database');
      throw error;
    }
  }

  async query(sql) {
    await this.connect();
    try {
      return await this.client.query(sql);
    } catch (error) {
      console.error('Error querying the database');
      throw error;
    }
  }

  async end() {
    try {
      if (this.is_connected) {
        await this.client.release();
        this.is_connected = false;
      } else {
        console.log('Client is already disconnected');
      }
    } catch (error) {
      console.error('Error disconnecting from the database');
      throw error;
    }
  }
}

export default new PGClient();

