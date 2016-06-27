module.exports = function(Devicealert) {
  // Devicealert.observe('before save',function(ctx,next){
  //   ctx.instance && (ctx.instance.id = ctx.instance.device_id)
  //   next()
  // })
  Devicealert.observe('after save',function(ctx,next){
    console.log('has been saved',ctx.instance.device_id);
    // var from = Devicealert.app.models.Email.dataSource.emailserver.transports[0].auth.user;
    // console.log('from',from);

    Devicealert.app.models.DeviceInfo.findOne({where:{device_id:ctx.instance.device_id}},function(err,result){
      if (result && result.setup_operator) {
        console.log('to:',result.setup_operator);
        Devicealert.app.models.Email.send({
          from:'vleboy@163.com',
          to:result.setup_operator,
          subject:'hello test',
          text:'Li Jun'
        },function(err){
          if (err) {
            throw err;
          }
          console.log('done');

        })
      }
    })
    next();
  })
};
