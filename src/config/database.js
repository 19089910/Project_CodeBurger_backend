module.exports = {
  dialect: 'postgres',
  /**
   * host: 'localhost',
   * username: 'postgres',
   * password: '19089910',
   * database: 'codeburger',
   *
   * postgresql://postgres:mEMOTEAFYKxGFlAxMKShvCKRzECKVPEW@junction.proxy.rlwy.net:26036/railway
   * */

  host: 'junction.proxy.rlwy.net',
  port: 26036,
  username: 'postgres',
  password: 'mEMOTEAFYKxGFlAxMKShvCKRzECKVPEW',
  database: 'railway',
  define: {
    timestamps: true,
    underscored: true,
    underscoreAll: true,
  },
}
