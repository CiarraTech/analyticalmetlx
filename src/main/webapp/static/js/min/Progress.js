var Progress=function(){return{manifest:function(){var b=_.map(Progress,function(a,b){return[b,_.keys(a).length]});_.each(_.sortBy(b,"1").reverse(),function(a){console.log(a)})},call:function(b,a){a=a||[];$.each(Progress[b],function(d,c){try{c.apply(c,a)}catch(e){console.log("exception",b,d,e)}})},onBackstageShow:{},onBackstageHide:{},onPrivacyChanged:{},beforeLeavingSlide:{},beforeChangingAudience:{},afterJoiningSlide:{},onConversationJoin:{},onSelectionChanged:{},isolated:{},deisolated:{},onBoardContentChanged:{},
onViewboxChanged:{},onLayoutUpdated:{},textBoundsChanged:{},postRender:{},attendanceReceived:{},historyReceived:{},stanzaReceived:{},themeReceived:{},currentConversationJidReceived:{},currentSlideJidReceived:{},conversationDetailsReceived:{},newConversationDetailsReceived:{},conversationsReceived:{},syncMoveReceived:{},userGroupsReceived:{},groupProvidersReceived:{},orgUnitsReceived:{},groupSetsReceived:{},groupsReceived:{},gradeValueReceived:{},usernameReceived:{},userOptionsReceived:{},afterWorkQueuePause:{},
beforeWorkQueueResume:{},onCanvasContentDeleted:{}}}();
