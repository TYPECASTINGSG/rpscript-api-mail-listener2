import {expect} from 'chai';
import m from 'mocha';

import RPSMailListener from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('$template', () => {

  m.it('should convert to html', async function () {
    let ctx = new RpsContext;
    let md = new RPSMailListener(ctx);
    ctx.addModuleContext('mail-listener2',{
      username:'username',
      password:'password',
      host:'host', port:'143', tls:false
    })

    let mailListener = await md.listenMail(ctx,{},function (mail) {
      console.log(mail);
    });

    mailListener.on("server:connected", function(){
      console.log("imapConnected");
    });
    
    mailListener.on("server:disconnected", function(){
      console.log("imapDisconnected");
    });
    
    mailListener.on("error", function(err){
      console.log(err);
    });

  }).timeout(0);

})
