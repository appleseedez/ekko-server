var server = require('./server')
var ds = server.dataSources.mssqlserver
var lbTables = ['User','AccessToken','ACL','RoleMapping','Role']
ds.automigrate(lbTables,function(err){
  if (err) {
    throw err
  }
  console.log('loopback tables [' + lbTables +'] created in ',ds.adapter.name)
  ds.disconnect()
})
