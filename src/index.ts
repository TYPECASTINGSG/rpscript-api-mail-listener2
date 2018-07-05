/**
 * @module mail-listener2
 */

import MailListener from 'mail-listener2';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';
import EventEmitter from 'events';

let MOD_ID = "mail-listener2";

export interface TwilioContext {
  username?: string;
  password?: string;
  host?: string;
  port?: number;
  tls?: boolean;
  connTimeout?: number;
  authTimeout?: number;
  debug?: any;
  tlsOptions?: any;
  mailbox?: string;
  searchFilter?: string[];
  markSeen?: boolean;
  fetchUnreadOnStart?: boolean;
  mailParserOptions?: any;
  attachments?: boolean;
  attachmentOptions?: any;
}

@RpsModule(MOD_ID)
export default class RPSMailListener {

  constructor(ctx:RpsContext){
    let mapContext = ctx.getModuleContext(MOD_ID);
    
    if(!mapContext)
      ctx.event.emit(RpsContext.LOAD_MOD_ERR_EVT,MOD_ID,new Error("No config found for mail-listener2 module"));
  }

  @rpsAction({verbName:'listen-mail'})
  async listenMail (ctx:RpsContext,opts:Object, onMail:(mail:any,seqno?:any,attri?:any)=>void) : Promise<EventEmitter>{
    //TODO: merge opts with config
     let listener = new MailListener( ctx.getModuleContext(MOD_ID) );
    listener.on('mail',onMail);
    
    listener.start();

     return listener;
  }

}

