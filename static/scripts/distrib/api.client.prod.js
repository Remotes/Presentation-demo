/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/*!
 * Pusher JavaScript Library v1.12.2
 * http://pusherapp.com/
 *
 * Copyright 2011, Pusher
 * Released under the MIT licence.
 */

(function(){var e,t,n;(function(r){function c(e,t){var n=t&&t.split("/"),r=o.map,i=r&&r["*"]||{},s,u,a,f,l,c,h,p,d,v;if(e&&e.charAt(0)==="."&&t){n=n.slice(0,n.length-1),e=n.concat(e.split("/"));for(p=0;v=e[p];p++)if(v===".")e.splice(p,1),p-=1;else if(v===".."){if(p===1&&(e[2]===".."||e[0]===".."))return!0;p>0&&(e.splice(p-1,2),p-=2)}e=e.join("/")}if((n||i)&&r){s=e.split("/");for(p=s.length;p>0;p-=1){u=s.slice(0,p).join("/");if(n)for(d=n.length;d>0;d-=1){a=r[n.slice(0,d).join("/")];if(a){a=a[u];if(a){f=a,l=p;break}}}if(f)break;!c&&i&&i[u]&&(c=i[u],h=p)}!f&&c&&(f=c,l=h),f&&(s.splice(0,l,f),e=s.join("/"))}return e}function h(e,t){return function(){return l.apply(r,a.call(arguments,0).concat([e,t]))}}function p(e){return function(t){return c(t,e)}}function d(e){return function(t){i[e]=t}}function v(e){if(s.hasOwnProperty(e)){var t=s[e];delete s[e],u[e]=!0,f.apply(r,t)}if(!i.hasOwnProperty(e))throw new Error("No "+e);return i[e]}function m(e,t){var n,r,i=e.indexOf("!");return i!==-1?(n=c(e.slice(0,i),t),e=e.slice(i+1),r=v(n),r&&r.normalize?e=r.normalize(e,p(t)):e=c(e,t)):e=c(e,t),{f:n?n+"!"+e:e,n:e,p:r}}function g(e){return function(){return o&&o.config&&o.config[e]||{}}}var i={},s={},o={},u={},a=[].slice,f,l;f=function(e,t,n,o){var a=[],f,l,c,p,y,b;o=o||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(b=0;b<t.length;b++){y=m(t[b],o),c=y.f;if(c==="require")a[b]=h(e);else if(c==="exports")a[b]=i[e]={},f=!0;else if(c==="module")l=a[b]={id:e,uri:"",exports:i[e],config:g(e)};else if(i.hasOwnProperty(c)||s.hasOwnProperty(c))a[b]=v(c);else if(y.p)y.p.load(y.n,h(o,!0),d(c),{}),a[b]=i[c];else if(!u[c])throw new Error(e+" missing "+c)}p=n.apply(i[e],a);if(e)if(l&&l.exports!==r&&l.exports!==i[e])i[e]=l.exports;else if(p!==r||!f)i[e]=p}else e&&(i[e]=n)},e=t=l=function(e,t,n,i){return typeof e=="string"?v(m(e,t).f):(e.splice||(o=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},i?f(r,e,t,n):setTimeout(function(){f(r,e,t,n)},15),l)},l.config=function(e){return o=e,l},n=function(e,t,n){t.splice||(n=t,t=[]),s[e]=[e,t,n]},n.amd={jQuery:!0}})(),n("libs/almond",function(){}),function(){Function.prototype.scopedTo===void 0&&(Function.prototype.scopedTo=function(e,t){var n=this;return function(){return n.apply(e,Array.prototype.slice.call(t||[]).concat(Array.prototype.slice.call(arguments)))}});var e=function(t,n){this.options=n||{},this.key=t,this.channels=new e.Channels,this.global_emitter=new e.EventsDispatcher;var r=this;this.checkAppKey(),this.connection=new e.Connection(this.key,this.options),this.connection.bind("connected",function(){r.subscribeAll()}).bind("message",function(e){var t=e.event.indexOf("pusher_internal:")===0;if(e.channel){var n;(n=r.channel(e.channel))&&n.emit(e.event,e.data)}t||r.global_emitter.emit(e.event,e.data)}).bind("disconnected",function(){r.channels.disconnect()}).bind("error",function(t){e.warn("Error",t)}),e.instances.push(this),e.isReady&&r.connect()};e.instances=[],e.prototype={channel:function(e){return this.channels.find(e)},connect:function(){this.connection.connect()},disconnect:function(){this.connection.disconnect()},bind:function(e,t){return this.global_emitter.bind(e,t),this},bind_all:function(e){return this.global_emitter.bind_all(e),this},subscribeAll:function(){for(channelName in this.channels.channels)this.channels.channels.hasOwnProperty(channelName)&&this.subscribe(channelName)},subscribe:function(e){var t=this,n=this.channels.add(e,this);return this.connection.state==="connected"&&n.authorize(this.connection.socket_id,this.options,function(r,i){r?n.emit("pusher:subscription_error",i):t.send_event("pusher:subscribe",{channel:e,auth:i.auth,channel_data:i.channel_data})}),n},unsubscribe:function(e){this.channels.remove(e),this.connection.state==="connected"&&this.send_event("pusher:unsubscribe",{channel:e})},send_event:function(e,t,n){return this.connection.send_event(e,t,n)},checkAppKey:function(){(this.key===null||this.key===void 0)&&e.warn("Warning","You must pass your app key when you instantiate Pusher.")}},e.Util={extend:function t(e,n){for(var r in n)e[r]=n[r]&&n[r].constructor&&n[r].constructor===Object?t(e[r]||{},n[r]):n[r];return e},stringify:function(){for(var e=["Pusher"],t=0;t<arguments.length;t++)typeof arguments[t]=="string"?e.push(arguments[t]):window.JSON==void 0?e.push(arguments[t].toString()):e.push(JSON.stringify(arguments[t]));return e.join(" : ")},arrayIndexOf:function(e,t){var n=Array.prototype.indexOf;if(e==null)return-1;if(n&&e.indexOf===n)return e.indexOf(t);for(i=0,l=e.length;i<l;i++)if(e[i]===t)return i;return-1}},e.debug=function(){e.log&&e.log(e.Util.stringify.apply(this,arguments))},e.warn=function(){window.console&&window.console.warn?window.console.warn(e.Util.stringify.apply(this,arguments)):e.log&&e.log(e.Util.stringify.apply(this,arguments))},e.VERSION="1.12.2",e.host="ws.pusherapp.com",e.ws_port=80,e.wss_port=443,e.channel_auth_endpoint="/pusher/auth",e.cdn_http="http://js.pusher.com/",e.cdn_https="https://d3dy5gmtp8yhk7.cloudfront.net/",e.dependency_suffix=".min",e.channel_auth_transport="ajax",e.activity_timeout=12e4,e.pong_timeout=3e4,e.isReady=!1,e.ready=function(){e.isReady=!0;for(var t=0,n=e.instances.length;t<n;t++)e.instances[t].connect()},this.Pusher=e}.call(this),function(){function e(){this._callbacks={}}function t(t){this.callbacks=new e,this.global_callbacks=[],this.failThrough=t}e.prototype.get=function(e){return this._callbacks[this._prefix(e)]},e.prototype.add=function(e,t){var n=this._prefix(e);this._callbacks[n]=this._callbacks[n]||[],this._callbacks[n].push(t)},e.prototype.remove=function(e,t){if(this.get(e)){var n=Pusher.Util.arrayIndexOf(this.get(e),t);this._callbacks[this._prefix(e)].splice(n,1)}},e.prototype._prefix=function(e){return"_"+e},t.prototype.bind=function(e,t){return this.callbacks.add(e,t),this},t.prototype.unbind=function(e,t){return this.callbacks.remove(e,t),this},t.prototype.emit=function(e,t){for(var n=0;n<this.global_callbacks.length;n++)this.global_callbacks[n](e,t);var r=this.callbacks.get(e);if(r)for(n=0;n<r.length;n++)r[n](t);else this.failThrough&&this.failThrough(e,t);return this},t.prototype.bind_all=function(e){return this.global_callbacks.push(e),this},this.Pusher.EventsDispatcher=t}.call(this),function(){function e(e,t,n){t[e]!==void 0&&t[e](n)}function t(e,t,r){n.EventsDispatcher.call(this),this.state=void 0,this.errors=[],this.stateActions=r,this.transitions=t,this.transition(e)}var n=this.Pusher;t.prototype.transition=function(t,r){var i=this.state,s=this.stateActions;if(i&&n.Util.arrayIndexOf(this.transitions[i],t)==-1)throw this.emit("invalid_transition_attempt",{oldState:i,newState:t}),Error("Invalid transition ["+i+" to "+t+"]");e(i+"Exit",s,r),e(i+"To"+(t.substr(0,1).toUpperCase()+t.substr(1)),s,r),e(t+"Pre",s,r),this.state=t,this.emit("state_change",{oldState:i,newState:t}),e(t+"Post",s,r)},t.prototype.is=function(e){return this.state===e},t.prototype.isNot=function(e){return this.state!==e},n.Util.extend(t.prototype,n.EventsDispatcher.prototype),this.Pusher.Machine=t}.call(this),function(){var e=function(){var e=this;Pusher.EventsDispatcher.call(this),window.addEventListener!==void 0&&(window.addEventListener("online",function(){e.emit("online",null)},!1),window.addEventListener("offline",function(){e.emit("offline",null)},!1))};e.prototype.isOnLine=function(){return window.navigator.onLine===void 0?!0:window.navigator.onLine},Pusher.Util.extend(e.prototype,Pusher.EventsDispatcher.prototype),this.Pusher.NetInfo=e}.call(this),function(){function e(e){e.connectionWait=0,e.openTimeout=n.TransportType==="flash"?5e3:2e3,e.connectedTimeout=2e3,e.connectionSecure=e.compulsorySecure,e.connectionAttempts=0}function t(t,l){function p(){C.connectionWait<u&&(C.connectionWait+=i),C.openTimeout<a&&(C.openTimeout+=s),C.connectedTimeout<f&&(C.connectedTimeout+=o),C.compulsorySecure!==!0&&(C.connectionSecure=!C.connectionSecure),C.connectionAttempts++}function d(){C._machine.transition("impermanentlyClosing")}function v(){C._activityTimer&&clearTimeout(C._activityTimer),C._activityTimer=setTimeout(function(){C.send_event("pusher:ping",{}),C._activityTimer=setTimeout(function(){C.socket.close()},C.options.pong_timeout||n.pong_timeout)},C.options.activity_timeout||n.activity_timeout)}function m(){var e=C.connectionWait;if(e===0&&C.connectedAt){var t=(new Date).getTime()-C.connectedAt;t<1e3&&(e=1e3-t)}return e}function y(){C._machine.transition("open")}function w(e){e=S(e);if(e!==void 0)if(e.event==="pusher:connection_established")C._machine.transition("connected",e.data.socket_id);else if(e.event==="pusher:error"){var t=e.data.code;C.emit("error",{type:"PusherError",data:{code:t,message:e.data.message}}),t===4e3?(C.compulsorySecure=!0,C.connectionSecure=!0,C.options.encrypted=!0,d()):t<4100?C._machine.transition("permanentlyClosing"):t<4200?(C.connectionWait=1e3,C._machine.transition("waiting")):t<4300?d():C._machine.transition("permanentlyClosing")}}function E(e){v(),e=S(e);if(e!==void 0){n.debug("Event recd",e);switch(e.event){case"pusher:error":C.emit("error",{type:"PusherError",data:e.data});break;case"pusher:ping":C.send_event("pusher:pong",{})}C.emit("message",e)}}function S(e){try{var t=JSON.parse(e.data);if(typeof t.data=="string")try{t.data=JSON.parse(t.data)}catch(n){if(!(n instanceof SyntaxError))throw n}return t}catch(r){C.emit("error",{type:"MessageParseError",error:r,data:e.data})}}function x(){C._machine.transition("waiting")}function T(e){C.emit("error",{type:"WebSocketError",error:e})}function N(e,t){var r=C.state;C.state=e,r!==e&&(n.debug("State changed",r+" -> "+e),C.emit("state_change",{previous:r,current:e}),C.emit(e,t))}var C=this;n.EventsDispatcher.call(this),this.options=n.Util.extend({encrypted:!1},l),this.netInfo=new n.NetInfo,this.netInfo.bind("online",function(){C._machine.is("waiting")&&(C._machine.transition("connecting"),N("connecting"))}),this.netInfo.bind("offline",function(){C._machine.is("connected")&&(C.socket.onclose=void 0,C.socket.onmessage=void 0,C.socket.onerror=void 0,C.socket.onopen=void 0,C.socket.close(),C.socket=void 0,C._machine.transition("waiting"))}),this._machine=new n.Machine("initialized",r,{initializedPre:function(){C.compulsorySecure=C.options.encrypted,C.key=t,C.socket=null,C.socket_id=null,C.state="initialized"},waitingPre:function(){C.connectionWait>0&&C.emit("connecting_in",C.connectionWait),C.netInfo.isOnLine()&&C.connectionAttempts<=4?N("connecting"):N("unavailable"),C.netInfo.isOnLine()&&(C._waitingTimer=setTimeout(function(){C._machine.transition("connecting")},m()))},waitingExit:function(){clearTimeout(C._waitingTimer)},connectingPre:function(){if(C.netInfo.isOnLine()===!1)C._machine.transition("waiting"),N("unavailable");else{var e;e=n.ws_port;var t="ws://";if(C.connectionSecure||document.location.protocol==="https:")e=n.wss_port,t="wss://";e=t+n.host+":"+e+"/app/"+C.key+"?protocol=5&client=js&version="+n.VERSION+"&flash="+(n.TransportType==="flash"?"true":"false"),n.debug("Connecting",e),C.socket=new n.Transport(e),C.socket.onopen=y,C.socket.onclose=x,C.socket.onerror=T,C._connectingTimer=setTimeout(d,C.openTimeout)}},connectingExit:function(){clearTimeout(C._connectingTimer),C.socket.onopen=void 0},connectingToWaiting:function(){p()},connectingToImpermanentlyClosing:function(){p()},openPre:function(){C.socket.onmessage=w,C.socket.onerror=T,C.socket.onclose=x,C._openTimer=setTimeout(d,C.connectedTimeout)},openExit:function(){clearTimeout(C._openTimer),C.socket.onmessage=void 0},openToWaiting:function(){p()},openToImpermanentlyClosing:function(){p()},connectedPre:function(t){C.socket_id=t,C.socket.onmessage=E,C.socket.onerror=T,C.socket.onclose=x,e(C),C.connectedAt=(new Date).getTime(),v()},connectedPost:function(){N("connected")},connectedExit:function(){C._activityTimer&&clearTimeout(C._activityTimer),N("disconnected")},impermanentlyClosingPost:function(){C.socket&&(C.socket.onclose=x,C.socket.close())},permanentlyClosingPost:function(){C.socket?(C.socket.onclose=function(){e(C),C._machine.transition("permanentlyClosed")},C.socket.close()):(e(C),C._machine.transition("permanentlyClosed"))},failedPre:function(){N("failed"),n.debug("WebSockets are not available in this browser.")},permanentlyClosedPost:function(){N("disconnected")}})}var n=this.Pusher,r={initialized:["waiting","failed"],waiting:["connecting","permanentlyClosed"],connecting:["open","permanentlyClosing","impermanentlyClosing","waiting"],open:["connected","permanentlyClosing","impermanentlyClosing","waiting"],connected:["permanentlyClosing","waiting"],impermanentlyClosing:["waiting","permanentlyClosing"],permanentlyClosing:["permanentlyClosed"],permanentlyClosed:["waiting","failed"],failed:["permanentlyClosed"]},i=2e3,s=2e3,o=2e3,u=5*i,a=5*s,f=5*o;t.prototype.connect=function(){!this._machine.is("failed")&&!n.Transport?this._machine.transition("failed"):this._machine.is("initialized")?(e(this),this._machine.transition("waiting")):this._machine.is("waiting")&&this.netInfo.isOnLine()===!0?this._machine.transition("connecting"):this._machine.is("permanentlyClosed")&&(e(this),this._machine.transition("waiting"))},t.prototype.send=function(e){if(this._machine.is("connected")){var t=this;return setTimeout(function(){t.socket.send(e)},0),!0}return!1},t.prototype.send_event=function(e,t,r){return e={event:e,data:t},r&&(e.channel=r),n.debug("Event sent",e),this.send(JSON.stringify(e))},t.prototype.disconnect=function(){this._machine.is("permanentlyClosed")||(this._machine.is("waiting")||this._machine.is("failed")?this._machine.transition("permanentlyClosed"):this._machine.transition("permanentlyClosing"))},n.Util.extend(t.prototype,n.EventsDispatcher.prototype),this.Pusher.Connection=t}.call(this),function(){Pusher.Channels=function(){this.channels={}},Pusher.Channels.prototype={add:function(e,t){var n=this.find(e);return n||(n=Pusher.Channel.factory(e,t),this.channels[e]=n),n},find:function(e){return this.channels[e]},remove:function(e){delete this.channels[e]},disconnect:function(){for(var e in this.channels)this.channels[e].disconnect()}},Pusher.Channel=function(e,t){var n=this;Pusher.EventsDispatcher.call(this,function(t){Pusher.debug("No callbacks on "+e+" for "+t)}),this.pusher=t,this.name=e,this.subscribed=!1,this.bind("pusher_internal:subscription_succeeded",function(e){n.onSubscriptionSucceeded(e)})},Pusher.Channel.prototype={init:function(){},disconnect:function(){this.subscribed=!1,this.emit("pusher_internal:disconnected")},onSubscriptionSucceeded:function(){this.subscribed=!0,this.emit("pusher:subscription_succeeded")},authorize:function(e,t,n){return n(!1,{})},trigger:function(e,t){return this.pusher.send_event(e,t,this.name)}},Pusher.Util.extend(Pusher.Channel.prototype,Pusher.EventsDispatcher.prototype),Pusher.Channel.PrivateChannel={authorize:function(e,t,n){var r=this;return(new Pusher.Channel.Authorizer(this,Pusher.channel_auth_transport,t)).authorize(e,function(e,t){e||r.emit("pusher_internal:authorized",t),n(e,t)})}},Pusher.Channel.PresenceChannel={init:function(){this.members=new e(this)},onSubscriptionSucceeded:function(){this.subscribed=!0}};var e=function(e){var t=this,n=function(){this._members_map={},this.count=0,this.me=null};n.call(this),e.bind("pusher_internal:authorized",function(n){var r=JSON.parse(n.channel_data);e.bind("pusher_internal:subscription_succeeded",function(n){t._members_map=n.presence.hash,t.count=n.presence.count,t.me=t.get(r.user_id),e.emit("pusher:subscription_succeeded",t)})}),e.bind("pusher_internal:member_added",function(n){t.get(n.user_id)===null&&t.count++,t._members_map[n.user_id]=n.user_info,e.emit("pusher:member_added",t.get(n.user_id))}),e.bind("pusher_internal:member_removed",function(n){var r=t.get(n.user_id);r&&(delete t._members_map[n.user_id],t.count--,e.emit("pusher:member_removed",r))}),e.bind("pusher_internal:disconnected",function(){n.call(t)})};e.prototype={each:function(e){for(var t in this._members_map)e(this.get(t))},get:function(e){return this._members_map.hasOwnProperty(e)?{id:e,info:this._members_map[e]}:null}},Pusher.Channel.factory=function(e,t){var n=new Pusher.Channel(e,t);return e.indexOf("private-")===0?Pusher.Util.extend(n,Pusher.Channel.PrivateChannel):e.indexOf("presence-")===0&&(Pusher.Util.extend(n,Pusher.Channel.PrivateChannel),Pusher.Util.extend(n,Pusher.Channel.PresenceChannel)),n.init(),n}}.call(this),function(){Pusher.Channel.Authorizer=function(e,t,n){this.channel=e,this.type=t,this.authOptions=(n||{}).auth||{}},Pusher.Channel.Authorizer.prototype={composeQuery:function(e){var e="&socket_id="+encodeURIComponent(e)+"&channel_name="+encodeURIComponent(this.channel.name),t;for(t in this.authOptions.params)e+="&"+encodeURIComponent(t)+"="+encodeURIComponent(this.authOptions.params[t]);return e},authorize:function(e,t){return Pusher.authorizers[this.type].call(this,e,t)}},Pusher.auth_callbacks={},Pusher.authorizers={ajax:function(e,t){var n;n=Pusher.XHR?new Pusher.XHR:window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),n.open("POST",Pusher.channel_auth_endpoint,!0),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded");for(var r in this.authOptions.headers)n.setRequestHeader(r,this.authOptions.headers[r]);return n.onreadystatechange=function(){if(n.readyState==4)if(n.status==200){var e,r=!1;try{e=JSON.parse(n.responseText),r=!0}catch(i){t(!0,"JSON returned from webapp was invalid, yet status code was 200. Data was: "+n.responseText)}r&&t(!1,e)}else Pusher.warn("Couldn't get auth info from your webapp",n.status),t(!0,n.status)},n.send(this.composeQuery(e)),n},jsonp:function(e,t){this.authOptions.headers!==void 0&&Pusher.warn("Warn","To send headers with the auth request, you must use AJAX, rather than JSONP.");var n=document.createElement("script");Pusher.auth_callbacks[this.channel.name]=function(e){t(!1,e)},n.src=Pusher.channel_auth_endpoint+"?callback="+encodeURIComponent("Pusher.auth_callbacks['"+this.channel.name+"']")+this.composeQuery(e);var r=document.getElementsByTagName("head")[0]||document.documentElement;r.insertBefore(n,r.firstChild)}}}.call(this);var r=function(){function e(e,t){document.addEventListener?e.addEventListener("load",t,!1):e.attachEvent("onreadystatechange",function(){(e.readyState=="loaded"||e.readyState=="complete")&&t()})}function t(t,n){var r=document.getElementsByTagName("head")[0],i=document.createElement("script");i.setAttribute("src",t),i.setAttribute("type","text/javascript"),i.setAttribute("async",!0),e(i,function(){n()}),r.appendChild(i)}return function(e,n){for(var r=0,i=0;i<e.length;i++)t(e[i],function(){e.length==++r&&setTimeout(n,0)})}}();(function(){!window.WebSocket&&window.MozWebSocket&&(window.WebSocket=window.MozWebSocket),window.WebSocket&&(Pusher.Transport=window.WebSocket,Pusher.TransportType="native");var e=(document.location.protocol=="http:"?Pusher.cdn_http:Pusher.cdn_https)+Pusher.VERSION,t=[];window.JSON||t.push(e+"/json2"+Pusher.dependency_suffix+".js"),window.WebSocket||(window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=!0,t.push(e+"/flashfallback"+Pusher.dependency_suffix+".js"));var n=function(){return window.WebSocket?function(){Pusher.ready()}:function(){window.WebSocket?(Pusher.Transport=window.WebSocket,Pusher.TransportType="flash",window.WEB_SOCKET_SWF_LOCATION=e+"/WebSocketMain.swf",WebSocket.__addTask(function(){Pusher.ready()}),WebSocket.__initialize()):(Pusher.Transport=null,Pusher.TransportType="none",Pusher.ready())}}(),i=function(e){var t=function(){document.body?e():setTimeout(t,0)};t()},s=function(){i(n)};t.length>0?r(t,s):s()})(),n("libs/pusher",function(){}),n("settings",[],function(){return{applicationKey:"1234567890",authenticationCheckUrl:"http://remoats.herokuapp.com/auth/check/",channelResolutionUrl:"http://remoats.herokuapp.com/auth/channel/resolve/",pusherAuthEndpoint:"http://remoats.herokuapp.com/pusher/auth/",pusherApplicationKey:"0b6ee8539603f52808dd",actionEventName:"client-action",loginUrl:"http://remoats.herokuapp.com/auth/login/"}}),n("oats/Channel",["libs/pusher","settings"],function(e,t){function i(){}function s(){var e=this;window.addEventListener("message",function(t){console.log("[LOCAL RECEIVER] got message",t);if(t.source!=window)return;n(t.data)&&e.onReceive(t.data)},!1)}function o(){return e.log=function(e){window.console&&window.console.log&&window.console.log(e)},e.channel_auth_endpoint=t.pusherAuthEndpoint,WEB_SOCKET_DEBUG=!0,new e(t.pusherApplicationKey)}function u(e){var t=o();this.channel=t.subscribe("presence-"+e),this.channel.bind("pusher:subscription_succeeded",function(){console.log("pusher initiailized OK")}),this.channel.bind("pusher:subscription_error",function(e){console.error("pusher scubscription error",e)})}function a(e){var n=o(),r=this;this.channel=n.subscribe("presence-"+e),this.channel.bind(t.actionEventName,function(e){r.onReceive(e)}),this.channel.bind("pusher:subscription_succeeded",function(){console.log("pusher initiailized OK"),typeof r.onSubscribersChanged!="undefined"&&r.onSubscribersChanged(r.getSubscribers()),typeof r.onReady!="undefined"?r.onReady():console.error("onReady is not defined")}),this.channel.bind("pusher:subscription_error",function(e){console.error("pusher scubscription error",e),typeof r.onError!="undefined"&&r.onError()}),this.channel.bind("pusher:member_added",function(e){typeof r.onSubscribersChanged!="undefined"&&r.onSubscribersChanged(r.getSubscribers())}),this.channel.bind("pusher:member_removed",function(e){typeof r.onSubscribersChanged!="undefined"&&r.onSubscribersChanged(r.getSubscribers())})}var n=function(e){return e.destination==="oats"},r=function(e){return{data:data,destination:"oats"}};return i.prototype={send:function(e){window.postMessage(r(e),"*")}},s.prototype={onReceive:function(e){}},u.prototype={send:function(e){this.channel.trigger(t.actionEventName,e)},onReady:function(){},onError:function(){}},a.prototype={onReady:function(){},onError:function(){},onReceive:function(e){},onSubscribersChanged:function(e){},getSubscribers:function(){console.log("enumerating members",this.channel.members);var e=this.channel.members.me,t=[];return this.channel.members.each(function(n){e?n.id!=e.id&&t.push(n):t.push(n)}),t}},{LocalSender:i,LocalReceiver:s,RemoteSender:u,RemoteReceiver:a}}),n("oats/Catcher",["./Channel"],function(e){function t(){var t=this;this.channel=new e.LocalReceiver,this.channel.onReceive=function(e){console.log("got data",e),t.onEvent(e);switch(e.action){case"swipe-left":t.onSwipeLeft();break;case"swipe-right":t.onSwipeRight();break;case"swipe-up":t.onSwipeUp();break;case"swipe-down":t.onSwipeDown();break;case"tap":t.onTap()}}}return t.prototype={onEvent:function(e){},onSwipeLeft:function(){},onSwipeRight:function(){},onSwipeUp:function(){},onSwipeDown:function(){},onTap:function(){}},t}),n("oats/ClientBootstrap",[],function(){function t(){return document.getElementById("remoats-plugin-installed")!=null}function n(){var e=document.getElementById("remoats-plugin-installed");return e!=null?e.getAttribute("data-extension-id"):null}function r(){this.promptStyleString="position: fixed;left: 0;right: 0;bottom: 0;z-index: 10000;border-top: solid 1px #CCC;padding: 5px;",this.promptContent='<p>You can use Remoats to control this site remotely from your phone. <a id="btn-install-extension" href="#">Enable Remoats</a></p>'}function i(){}var e={extensionCheckTimeout:3e3};return r.prototype={render:function(){var e=document.createElement("div");e.setAttribute("style",this.promptStyleString),e.innerHTML=this.promptContent,document.body.insertBefore(e,document.body.firstChild),document.getElementById("btn-install-extension").addEventListener("click",function(){e.innerHTML="<p>once extension is installed, please refresh your browser</p>"},!1)}},i.prototype={check:function(){var n=this;setTimeout(function(){t()?(n.registerClient(),n.onReady()):(new r).render()},e.extensionCheckTimeout)},registerClient:function(){window.postMessage({message_type:"oats.register.client"},"*")},onReady:function(){}},i}),n("oats/Client",["./Catcher","./ClientBootstrap","settings"],function(e,t,n){function r(e){var n=this,n=this,r=new t;r.onReady=function(){n.__setupCatcher()},r.check()}return r.prototype={__setupCatcher:function(t){this.catcher=new e(t,this.remote),this.catcher.onSwipeLeft=this.onSwipeLeft,this.catcher.onSwipeRight=this.onSwipeRight,this.catcher.onSwipeUp=this.onSwipeUp,this.catcher.onSwipeDown=this.onSwipeDown,this.catcher.onTap=this.onTap,this.catcher.onEvent=this.onEvent},onNotAuthenticated:function(){alert("please log in")},onEvent:function(e){},onSwipeLeft:function(){},onSwipeRight:function(){},onSwipeUp:function(){},onSwipeDown:function(){},onTap:function(){}},r}),e.config({paths:{libs:"../libs",oats:"../oats/",jquery:"../libs/jquery",settings:"../oats/settings.dev"},shim:{jquery:{exports:"$"}},waitSeconds:15,urlArgs:"bust="+(new Date).getTime()}),t(["oats/Client"],function(e){window.Remoats=e}),n("api/remoats",function(){})})()