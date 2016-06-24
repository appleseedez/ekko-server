module.exports = function(Devicealert) {
  Devicealert.observe('after save',function(ctx,next){
    console.log('has been saved',ctx.instance.device_id);
    // var from = Devicealert.app.models.Email.dataSource.emailserver.transports[0].auth.user;
    // console.log('from',from);

    Devicealert.app.models.DeviceInfo.findOne({where:{device_id:ctx.instance.device_id}},function(err,result){
      console.log('to:',result.setup_operator);
      Devicealert.app.models.Email.send({
        from:'noreply@loopback.com',
        to:result.setup_operator,
        subject:'hello test',
        text:'Li Jun'
      })

    })
    next();
  })
};
