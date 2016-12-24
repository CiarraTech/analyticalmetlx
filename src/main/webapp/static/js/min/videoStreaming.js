var TokBox=function(){var c=!1,d=!1,m=!1,h={},q=void 0,r=void 0;return{getSessions:function(){return h},initialize:function(){q=$("#videoConfSessionsContainer");r=q.find(".videoConfSessionContainer").clone();q.empty();m=!0},receiveTokBoxSession:function(f){if(m)if(0==OT.checkSystemRequirements())c||(errorAlert("Video conferencing disabled","Video conferencing is disabled because your browser does not support it.  You could try recent versions of Chrome, Firefox or Internet Explorer."),c=!0);else if(d&&
!(f.sessionId in h)){var t=r.clone();q.append(t);f=TokBoxSession(f,t);h[f.id]=f;f.refreshVisualState()}},setTokBoxEnabledState:function(c){d=c},removeSessions:function(c){_.forEach(h,function(d){_.some(c,function(c){return c==d.id})&&(d.shutdown(),delete h[d.id])})}}}(),TokBoxSession=function(c,d){var m=160,h=120,q=15,r=[320,640,1280],f=[240,480,720],t=[1,7,15,30],z=function(a){var b=_.reverse(_.filter(t,function(b){return b<=a}))[0];void 0==b&&(b=t[0]);return b},A=function(a){var b=_.reverse(_.filter(r,
function(b){return b<=a}))[0];void 0==b&&(b=r[0]);return b},B=function(a){var b=_.reverse(_.filter(f,function(b){return b<=a}))[0];void 0==b&&(b=f[0]);return b},u=function(){return"isConnected"in e&&e.isConnected()},n=d.find(".videoConfStartButton"),v=d.find(".videoConfContainer"),C=d.find(".videoSubscriptionsContainer"),D=d.find(".videoContainer").clone(),w=d.find(".broadcastContainer"),E=d.find(".broadcastLink");C.empty();w.empty();v.empty();var p={},l=void 0,g=function(){n.unbind("click");u()?
(v.show(),"capabilities"in e&&"publish"in e.capabilities&&1==e.capabilities.publish?(n.show(),n.on("click",function(){u()&&(void 0==l?x():y())})):n.hide()):(n.hide(),v.hide());d.find(".subscribedStream").removeClass("subscribedStream");if(e.connection){var a=e.connection.data.match(/description=(.+)$/)[1],b=a;if(a==Conversations.getCurrentConversationJid())b="everyone";else{var c=_.flatMap(Conversations.getCurrentSlide().groupSets,function(b){return _.find(b.groups,function(b){return b.id==a})});
c.length&&(b=sprintf("group %s",c[0].title))}d.find(".context").text(b)}void 0!=l?n.addClass("publishedStream").find("div").text("Hide from"):n.removeClass("publishedStream").find("div").text("Stream to");_.forEach(p,function(a){"refreshVisual"in a&&a.refreshVisual()});DeviceConfiguration.applyFit()},x=function(){g();if(u()&&void 0==l){var a=sprintf("tokBoxVideoElemPublisher_%s",_.uniqueId()),b=$("<span />",{id:a,"class":"publisherVideoElem"});d.find(".viewscreen").append(b);sprintf("%sx%s",A(m),
B(h));l=a=OT.initPublisher(a,{name:UserSettings.getUsername(),width:m,height:h,resolution:"320x240",frameRate:z(q),insertMode:"append"},function(a){a&&console.log("tokbox error:",a)});a.element.style.width=m;a.element.style.height=h;e.publish(a);d.find(".videoConfStartButton").addClass("publishedStream")}g()},y=function(a){g();u()&&void 0!=l&&(d.find(".publisherVideoElem").remove(),e.unpublish(l),l=void 0,d.find(".videoConfStartButton").removeClass("publishedStream"));g()};Progress.afterWorkQueuePause.videoStreaming=
function(){_.forEach(p,function(a){"subscriber"in a&&null!=a.subscriber&&"restrictFramerate"in a.subscriber&&a.subscriber.restrictFramerate(!0)})};Progress.beforeWorkQueueResume.videoStreaming=function(){_.forEach(p,function(a){"subscriber"in a&&null!=a.subscriber&&"restrictFramerate"in a.subscriber&&a.subscriber.restrictFramerate(!1)})};var e=OT.initSession(c.apiKey,c.sessionId);e.on({streamDestroyed:function(a){a.stream.id in p&&(p[a.stream.id].elem.remove(),delete p[a.stream.id],g())},streamCreated:function(a){if("capabilities"in
e&&"subscribe"in e.capabilities&&1==e.capabilities.subscribe){var b=a.stream,c=p[b.id];if(void 0==c){c={stream:b,subscribed:!1,refreshVisual:function(){}};p[b.id]=c;var d=sprintf("tokBoxVideoElemSubscriber_%s",_.uniqueId()),f=$(D.clone()),l=$("<span />",{id:d,"class":"subscriberVideoElem"});f.find(".icon-txt").text(a.stream.name);var q=f.find(".videoConfSubscribeButton"),n=function(){q.toggleClass("subscribedStream",c.subscribed)};n();var k=p[b.id],r=function(){k.subscribed=!0;var a=e.subscribe(k.stream,
d,{insertMode:"append",width:m,height:h},function(a){a?(f.remove(),console.log("error when subscribing to stream",a,k.stream.name,k.stream.id)):console.log("subscribed to stream:",k.stream.name,k.stream.id)});a.element.style.width=m;a.element.style.height=h;a.on("videoDimensionsChanged",function(b){a.element.style.width=b.newValue.width+"px";a.element.style.height=b.newValue.height+"px"});k.subscriber=a;k.refreshVisual=n};f.find(".videoConfSubscribeButton").on("click",function(){k.subscribed?(k.subscribed=
!1,e.unsubscribe(k.subscriber),console.log("unsubscribed from stream:",k.stream.name,k.stream.id)):r();g()});l.prepend(f);v.append(l);c.videoSelectorId=d;c.elem=f;g()}else c.stream=b,console.log("updating stream with a new version of it, for whatever reason.",a)}},sessionConnected:function(a){g()},sessionDisconnected:function(a){g()},sessionReconnected:function(a){g()},sessionReconnecting:function(a){g()}});e.connect(c.token,function(a){a&&console.log("error when connecting to tokBox",a,c);g()});
return{startPublish:x,receiveBroadcast:function(a){if(null!=a&&"broadcastUrls"in a&&"hls"in a.broadcastUrls){var b=E.clone();b.attr("href",a.broadcastUrls.hls);w.append(b)}else w.empty()},getIsConnected:u,id:e.id,getSession:function(){return e},refreshVisualState:g,shutdown:function(){e.disconnect();d.remove()},resizeVideo:function(a,b,c){void 0!=a&&(m=a);void 0!=b&&(h=b);void 0!=c&&(q=c);void 0!=l&&(y(),startPublisherFunc());_.forEach(p,function(a){"subscriber"in a&&null!=a.subscriber&&(a.subscriber.setPreferredResolution({width:m,
height:h}),"refreshVisual"in a&&a.refreshVisual())});g()}}};function receiveTokBoxSessionToken(c){"token"in c&&(console.log("receiveTokBoxSession:",c),TokBox.receiveTokBoxSession(c))}function removeTokBoxSessions(c){console.log("removeTokBoxSessions",c);TokBox.removeSessions(c)}function receiveTokBoxEnabled(c){TokBox.setTokBoxEnabledState(c)}function receiveTokBoxArchives(c){console.log("archives:",c)}function receiveTokBoxBroadcast(c){};
