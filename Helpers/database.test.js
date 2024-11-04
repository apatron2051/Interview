// database.test.js
const databaseC =  require('./database.js');
db_c = new databaseC();
require('dotenv').config({ path: '/.env' });

test('gets distinct list data', async () => {
 const data = await db_c.getdistinctlistbyKey()
 expect(data.size).toBe(!0)
})

test('gets product data', async () => {
  const data = await db_c.getProductListBySearch("hat",10);
   expect(data.size).toBe(!0)

});