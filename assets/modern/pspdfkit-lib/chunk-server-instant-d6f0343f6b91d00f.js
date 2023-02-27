/*!
 * PSPDFKit for Web 2023.1.1 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2023 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
"use strict";(globalThis.webpackChunkPSPDFKit=globalThis.webpackChunkPSPDFKit||[]).push([[2333],{20251:(e,t,s)=>{s.r(t),s.d(t,{InstantProvider:()=>H});var i=s(35369),n=s(70545),o=s(41371),a=s(81928),r=s(51983);class l extends(i.WV({clientId:"",userId:null,presenceContent:{}})){}class c extends(i.WV({status:"offline",currentClient:null,clients:(0,i.D5)()})){}var d=s(14968),h=s(34415);class u{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=null,this.tries=0}reset(){this.tries=0,this.timer&&clearTimeout(this.timer)}scheduleTimeout(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout((()=>{this.tries=this.tries+1,this.callback()}),this.timerCalc(this.tries+1))}}var m=s(46232);const p="0.0.1",k=0,_=1,f=2,C={name:"PSPDFKit-Web"},g=e=>[1e3,2e3][e-1]||5e3;class b{constructor(e,t){let{reconnectTimerCalc:s=g,enableReconnect:n=!0,events:o=[]}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.eventEmitter=new h.Z(["connect","disconnect","error"].concat(o)),this.serverURL=e,this.authPayload=t,this.socket=null,this.lastRequestId=0,this.requestsWaitingForAnswers=(0,i.D5)(),n&&(this.reconnectTimer=new u((()=>{this.socket&&(this.socket.close(),this.socket=null),this.connect()}),s)),this.clearAuthenticationInformation()}registerEvents(e){this.eventEmitter.events.push(...e)}connect(){if(this.socket)return;const e=new WebSocket(this.serverURL);e.onopen=this.onOpen.bind(this),e.onmessage=this.onMessage.bind(this),e.onerror=()=>{this.socket=null,this.eventEmitter.emit("error",`Failed to create the WebSocket connection to ${this.serverURL}. Please check your firewall or proxy settings.`)},this.socket=e}disconnect(){this.socket&&(this.socket.onclose=()=>{},this.socket.close(),this.clearAuthenticationInformation(),this.abortOpenRequests(),this.eventEmitter.emit("disconnect"))}get connectionState(){switch(this.socket&&this.socket.readyState){case k:return"connecting";case _:return"open";case f:return"closing";default:return"closed"}}get isAuthenticated(){return""!==this.clientId}sendRequest(e,t){return new Promise(((s,i)=>{if(!this.isAuthenticated||!this.socket)return void i(new n.p2("Cannot send request when the connection is not authenticated"));const o=this.nextRequestId(),a=JSON.stringify(t);this.requestsWaitingForAnswers=this.requestsWaitingForAnswers.set(o,{resolve:s,reject:i});this.socket.send(`${o}:${e}:${a}`)}))}on(e,t){this.eventEmitter.on(e,t)}off(e,t){this.eventEmitter.off(e,t)}onOpen(){const e=this.socket;e&&(e.onerror=this.onError.bind(this),e.onclose=this.onClose.bind(this))}onMessage(e){const t=e.data;if(this.isAuthenticated){const e=this.parseFrame(t);if(e.requestId){const t=e.requestId;(0,m.k)(this.requestsWaitingForAnswers.has(t),"Received a reply with an unknown request ID.");const s=this.requestsWaitingForAnswers.get(t);switch((0,m.k)(s),e.action){case"ok":s.resolve(e.payload);break;case"error":s.reject(new n.p2(e.payload.reason||"Unknown error"));break;default:(0,m.k)(!1,`${e.action} is not a valid request reply`)}this.requestsWaitingForAnswers=this.requestsWaitingForAnswers.delete(t)}else this.eventEmitter.events.includes(e.action)&&this.eventEmitter.emit(e.action,e.payload),this.log("incoming info message",e)}else{const e=this.parseUnauthenticatedFrame(t);switch(e.action){case"hello":this.onHello(e.payload);break;case"authenticated":this.onAuthenticated(e.payload);break;case"error":this.eventEmitter.emit("error",e.payload.reason||"Unknown error")}}}onClose(e){this.clearAuthenticationInformation(),this.abortOpenRequests(),this.reconnectTimer&&this.reconnectTimer.scheduleTimeout(),this.eventEmitter.emit("disconnect"),this.log("close",e)}onError(e){this.reconnectTimer&&this.reconnectTimer.scheduleTimeout(),this.log("error",e)}nextRequestId(){const e=this.lastRequestId+1;return this.lastRequestId=e,e}onHello(e){const t=this.socket;if(2===e.protocol_version){const e={protocol_version:2,client_version:p,client_info:C,auth_payload:this.authPayload};t.send(`hello_web:${JSON.stringify(e)}`)}else t.send(`handshake_failed:${JSON.stringify({reason:"protocol_mismatch",protocol_version:2,client_version:p,client_info:C})}`),this.eventEmitter.emit("error","protocol_mismatch")}onAuthenticated(e){(0,m.k)(e.client_id,"`authenticated` message has no `client_id`"),this.clientId=e.client_id,this.userId=e.user_id||null,this.eventEmitter.emit("connect",{clientId:this.clientId,userId:this.userId})}log(){if("development"===(0,d.zj)()){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];console.log("SYNCConnection",...t)}}parseFrame(e){const[,t,s,i]=/^(\d+|info):([a-zA-Z-_]+):(.+)$/.exec(e.toString());let n=null;"info"!==t&&(n=parseInt(t));return{requestId:n,action:s,payload:JSON.parse(i)}}parseUnauthenticatedFrame(e){const[,t,s]=/^(hello|authenticated|error):(.+)$/.exec(e.toString());return{action:t,payload:JSON.parse(s)}}abortOpenRequests(){this.requestsWaitingForAnswers.forEach((e=>{e.reject(new n.p2("request aborted"))})),this.requestsWaitingForAnswers=(0,i.D5)()}clearAuthenticationInformation(){this.clientId="",this.userId=null}}function F(e){return(0,n.kG)("string"==typeof e.client_id,"The client payload must have a `client_id`"),(0,n.kG)("object"==typeof e.presence,"The client payload must have a `presence`"),new l({clientId:e.client_id,userId:e.user_id,presenceContent:e.presence})}class y{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new c,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:b;this.state=e,this.connectionClass=t}load(e,t,s){return new Promise(((i,o)=>{this.setState=e=>{this.state=e},this.connection=new this.connectionClass(e,t,{events:["client_presence"]}),this.connection.on("connect",(e=>{const t=new l({clientId:e.clientId,userId:e.userId,presenceContent:s});this.setState(this.state.set("status","online").set("currentClient",t)),this.populateClients(s).then((()=>{i(this)})).catch(o)})),this.connection.on("error",(e=>{o(new n.p2(e.toString()))})),this.connection.on("client_presence",(e=>this.onInfoClientPresence(e))),this.connection.connect()}))}populateClients(e){return new Promise(((t,s)=>{this.connection.sendRequest("enter_layer",{presence:e}).then((e=>{this.setState(function(e,t){return(0,m.k)(t.clients,"The payload must have a `clients` list"),e.withMutations((s=>{var n;const o=(0,i.D5)(t.clients.map((e=>F(e))).map((e=>[e.clientId,e]))).set(null===(n=e.currentClient)||void 0===n?void 0:n.clientId,e.currentClient);s.set("clients",o)}))}(this.state,e)),t()})).catch(s)}))}onInfoClientPresence(e){if(this.setState(function(e,t){(0,m.k)("object"==typeof t.clients,"The payload must have `clients`");const s=e.clients.withMutations((s=>{if(t.clients.entered)for(const i of t.clients.entered){if(e.clients.has(i.client_id))throw new n.p2("The client marked as entered is already known");const t=F(i);s.set(t.clientId,t)}if(t.clients.updated)for(const i of t.clients.updated){(0,m.k)("string"==typeof i.client_id,"The client payload must have a `client_id`"),(0,m.k)("object"==typeof i.presence,"The client payload must have a `presence`");const t=e.clients.get(i.client_id);if(!t)throw new n.p2("The client marked as updated is not known");s.set(t.clientId,t.set("presenceContent",i.presence))}if(t.clients.left)for(const i of t.clients.left){if(!e.clients.has(i))throw new n.p2("The client marked as left is not known");s.delete(i)}}));return e.set("clients",s)}(this.state,e)),this.shouldFireClientUpdatesCallback){let t=(0,i.D5)();if(e.clients.entered){const s=e.clients.entered.map((e=>e.client_id));t=this.state.clients.filter((e=>-1!==s.indexOf(e.clientId))).toMap()}let s=(0,i.D5)();if(e.clients.updated){const t=e.clients.updated.map((e=>e.client_id));s=this.state.clients.filter((e=>-1!==t.indexOf(e.clientId))).toMap()}let n=(0,i.aV)();e.clients.updated&&(n=(0,i.aV)(e.clients.left)),this.clientUpdatesCallback(t,s,n)}}disconnect(){"offline"!==this.getStatus()&&(this.setState(this.state.set("status","offline")),this.connection.disconnect())}getStatus(){return this.state.status}getCurrentClient(){return this.state.currentClient}getClients(){return this.shouldFireClientUpdatesCallback=!0,this.state.clients}updatePresence(e){return new Promise(((t,s)=>{if("online"!==this.getStatus())return s(new n.p2("ClientsPresence is not connected"));this.connection.sendRequest("update_client_presence",{presence:e}).then((()=>{this.setState(function(e,t){var s;return e.setIn(["currentClient","presenceContent"],t).setIn(["clients",null===(s=e.currentClient)||void 0===s?void 0:s.clientId,"presenceContent"],t)}(this.state,e)),t(!0)}),(()=>{s(new n.p2("Unable to update presence"))}))}))}onClientUpdates(e){if("function"!=typeof e)throw new TypeError("callback must be a function");this.clientUpdatesCallback=e}}var v=s(52376);class w extends(i.WV({content:null,attachments:null,id:null,type:null,isAnonymous:void 0,group:void 0,resolve:()=>{},reject:()=>{}})){}var I=s(32289);class R extends(i.WV({requestInfo:null,status:"offline",currentClient:null,localRecordsContents:(0,i.zN)(),localRecordsChanges:(0,i.aV)(),stagedRecordsChanges:(0,i.aV)(),localRecordsRev:0,requiredAttachmentIds:(0,i.l4)(),clients:(0,i.D5)()})){}var x=s(14295);class S{getRecords(){return this._shouldFireRecordsUpdateCallback=!0,this._state.localRecordsContents.map(((e,t)=>{const{content:s,permissions:i,group:n,isAnonymous:o}=e;return{content:s,permissions:i,group:n,id:t,isAnonymous:o}})).toList()}createRecord(e,t,s,i,n){return new Promise(((o,a)=>{const r=new w({id:e,content:t,attachments:s,group:i,type:"created",isAnonymous:n,resolve:o,reject:a});this.enqueueChangeRequest(r)}))}updateRecord(e,t,s,i){return new Promise(((o,a)=>{if(!this.isKnownRecordId(e))return a(new n.p2(`Record with ID: ${e} not found.`));const r=new w({id:e,content:t,group:s,type:"updated",isAnonymous:i,resolve:o,reject:a});this.enqueueChangeRequest(r)}))}deleteRecord(e){return new Promise(((t,s)=>{if(!this.isKnownRecordId(e))return s(new n.p2(`Record with ID: ${e} not found.`));const i=new w({id:e,type:"deleted",resolve:t,reject:s});this.enqueueChangeRequest(i)}))}onRecordsUpdates(e,t){if("function"!=typeof e)throw new TypeError("recordsUpdateCallback must be a function");if("function"!=typeof t)throw new TypeError("acceptedRecordsCallback must be a function");this._recordsUpdatesCallback=e,this._acceptedRecordsResponseCallback=t}destroy(){this._cycle&&this._cycle.destroy()}_recordsUpdatesCallback=()=>{};_acceptedRecordsResponseCallback=()=>{};_shouldFireRecordsUpdateCallback=!1;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new R,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:I.ZP;this._state=e,this._CycleClass=t}load(e,t){let s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise(((i,n)=>{const o=this.setState.bind(this);this.setState(this._state.set("requestInfo",{serverURL:e,authPayload:t})),this._cycle=new this._CycleClass({getState:()=>this._state,setState:o,onChanges:this.onChanges,onAcceptedRecords:this.onAcceptedRecords,longPollingTimeout:s?I.mH:0}),this._cycle.nextCycle(0).then((()=>{i(this)})).catch(n)}))}setState(e){this._state=e}onChanges=e=>{if(this._shouldFireRecordsUpdateCallback){const{created:t,updated:s,deleted:n}=e;this._recordsUpdatesCallback((0,i.aV)(t),(0,i.aV)(s),(0,i.aV)(n))}};onAcceptedRecords=e=>{if(this._shouldFireRecordsUpdateCallback){const{created:t,updated:s,deleted:n}=e;this._acceptedRecordsResponseCallback((0,i.aV)(t),(0,i.aV)(s),(0,i.aV)(n))}};setOnDocumentHandleConflictCallback=e=>{if("function"!=typeof e)throw new TypeError("callback must be a function");this._cycle.setOnDocumentHandleConflictCallback(e)};enqueueChangeRequest(e){const t=(0,v.n)({oldChanges:this._state.localRecordsChanges,newChanges:(0,i.aV)([e])});this.setState(this._state.set("localRecordsChanges",t))}syncChanges=(0,x.k)((()=>this._cycle.nextCycle()));isKnownRecordId(e){function t(t){return"created"===t.type&&t.id===e}const s=this._state.localRecordsContents.has(e),i=!!this._state.localRecordsChanges.find(t),n=!!this._state.stagedRecordsChanges.find(t);return s||i||n}}var V=s(47291),A=s(11171);function P(e,t){const s=e.get("annotations"),i=e.get("formFields"),n=e.get("comments"),o=e.get("formattedFormFieldValues");let a;return t.id.startsWith("form-field-value/")&&(a=t.id.split("/")[1]),s.get(t.id)||i.find((e=>e.id===t.id))||n.get(t.id)||(a?o.get(a):void 0)}function q(e,t){return Boolean(P(e,t))}var T=s(44006),E=s(91002),U=s(16105),D=s(81172),G=s(36091),z=s(72706),B=s(33502);class H{_existingBookmarksIds=(0,i.l4)();_existingFormFieldsIds=(0,i.l4)();_existingFormFieldValuesIds=(0,i.l4)();_existingCommentIds=(0,i.l4)();_documentHandleConflictCallback=()=>{};canCreateBackendOrphanWidgets=!0;constructor(e,t,s){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:V.q;this._serverURL=e,this._documentURL=t,this._authPayload=s,this._settings=i,this._hasLoadedInitialRecords=!1,this._setReadStateCallbacksPromise=new Promise((e=>{this._setReadStateCallbacksPromiseResolve=e}))}load(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:y;const s=[];return this._sync=new e,s.push(this._sync.load(`${this._documentURL}/sync`,this._authPayload,this._settings.listenToServerChangesEnabled).catch(n.vU)),this._sync.setOnDocumentHandleConflictCallback(this.onDocumentHandleConflict),this._settings.clientsPresenceEnabled&&(this._clients=new t,s.push(this._clients.load(`${this._serverURL.replace(/^http/i,"ws")}/websocket`,this._authPayload,{}).then((()=>{const e=this._clients;null!=e&&(e.onClientUpdates((()=>this._onClientsChange(e.getClients()))),this._onClientsChange(e.getClients()))})).catch((e=>{(0,n.ZK)("PSPDFKit: An error occurred while initializing the connected clients module. This might be due to a lack of support for WebSockets or a related failure.\n\nFailure details:\n\n"+e.message)})))),Promise.all(s).then((()=>this)).catch((e=>{throw new n.p2(`Initialization of PSPDFKit Instant failed:\n${e.message}`)}))}destroy(){this._sync&&this._sync.destroy()}setFormsEnabledInConfig(e){this._formsEnabledInConfig=e}setReadStateCallbacks(e){var t;this._readStateCallbacks=e,null===(t=this._setReadStateCallbacksPromiseResolve)||void 0===t||t.call(this)}setAnnotationCallbacks(e){this._annotationCallbacks=e}setBookmarkCallbacks(e){this._bookmarkCallbacks=e}setFormFieldCallbacks(e){this._formFieldCallbacks=e}setFormFieldValueCallbacks(e){this._formFieldValueCallbacks=e}setCommentCallbacks(e){this._commentCallbacks=e}createAnnotation(e,t){const{id:s,...i}=(0,o.Hs)(e),{group:n,permissions:a,...r}=i;return this._sync.createRecord(s,r,(0,o.Lw)(t),n)}createComment(e){const{id:t,...s}=(0,o.jA)(e),{group:i,permissions:n,isAnonymous:a,...r}=s;return this._existingCommentIds=this._existingCommentIds.add(t),this._sync.createRecord(t,r,{},i,a)}async updateComment(e){try{return await this.updateRecord((0,o.jA)(e))}catch(e){if(!(e instanceof n.p2))throw e}}deleteComment(e){return this._existingCommentIds=this._existingCommentIds.delete(e),this._sync.deleteRecord(e).then((()=>{}))}setStateGetter(e){this._getState=e}async updateRecord(e){var t;const{id:s,permissions:i,group:n,isAnonymous:o,...a}=e;return this._getState&&this._getState()&&null!==(t=this._getState().backend)&&void 0!==t&&t.isCollaborationPermissionsEnabled()?this._sync.updateRecord(s,i.edit?a:void 0,i.setGroup?n:void 0,o):this._sync.updateRecord(s,a,n,o)}async updateAnnotation(e){try{return await this.updateRecord((0,o.Hs)(e))}catch(e){if(!(e instanceof n.p2))throw e}}deleteAnnotation(e){return this._sync.deleteRecord(e.id).then((()=>{}))}createBookmark(e){const{id:t,...s}=(0,a.a)(e);return this._existingBookmarksIds=this._existingBookmarksIds.add(t),this._sync.createRecord(t,s,{})}async updateBookmark(e){const{id:t,...s}=(0,a.a)(e);try{return await this._sync.updateRecord(t,s)}catch(e){if(!(e instanceof n.p2))throw e}}deleteBookmark(e){return this._sync.deleteRecord(e).then((()=>{this._existingBookmarksIds=this._existingBookmarksIds.delete(e)}))}createFormField(e){const{id:t,...s}=(0,o.vD)(e),{group:i,permissions:n,...a}=s;return this._existingFormFieldsIds=this._existingFormFieldsIds.add(t),this._sync.createRecord(t,a,{},i)}async updateFormField(e){try{return await this.updateRecord((0,o.vD)(e))}catch(e){if(!(e instanceof n.p2))throw e}}deleteFormField(e){return this._sync.deleteRecord(e.id).then((()=>{this._existingFormFieldsIds=this._existingFormFieldsIds.delete(e.id)}))}loadFormFields(){return this.loadAnnotationsForPageIndex()}createFormFieldValue(e){const t=(0,o.kr)(e),s=(0,A.X)(e);return this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.add(s),this._sync.createRecord(s,t,{})}async setFormFieldValue(e){const t=(0,o.kr)(e);try{return await this._sync.updateRecord((0,A.X)(e),t)}catch(e){if(!(e instanceof n.p2))throw e}}deleteFormFieldValue(e){return this._sync.deleteRecord(e).then((()=>{this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.delete(e)}))}loadAnnotationsForPageIndex(){return this._loadPromise||(this._loadPromise=new Promise((e=>setTimeout(e,0))).then((()=>{this._hasLoadedInitialRecords||(this._sync.onRecordsUpdates(((e,t,s)=>this._onRecordsUpdates(e,t,s,r.z)),((e,t,s)=>this._onAcceptedRecords(e,t,s))),this._onRecordsUpdates(this._sync.getRecords(),(0,i.aV)(),(0,i.aV)(),r.y),this._hasLoadedInitialRecords=!0)}))),this._loadPromise}async loadBookmarks(){}syncChanges(){return this._sync.syncChanges()}_filterRecords(e){return e.filter((e=>{let{content:t}=e;return this._formsEnabledInConfig||!(0,o._Q)(t)}))}_onRecordsUpdates(e,t,s,r){let l=(0,i.aV)();const c=[];let d=(0,i.aV)(),h=(0,i.aV)(),u=(0,i.l4)(),m=(0,i.l4)(),p=(0,i.l4)(),k=(0,i.l4)(),_=(0,i.l4)();const f=this._getState?this._getState():void 0;let C=e,g=t,b=s;if(f&&f.backend&&f.backend.isCollaborationPermissionsEnabled()){C=C.filter((e=>{let{content:t}=e;return!!t}));const e=[];t.forEach(((t,s)=>{t.content?q(f,t)||(C=C.push(t),e.push(s)):q(f,t)?(b=b.push(t.id),e.push(s)):e.push(s)})),g=g.filter(((t,s)=>!e.includes(s))),b=b.filter((e=>f.annotations.has(e)||this._existingFormFieldValuesIds.has(e)||this._existingFormFieldsIds.has(e)||this._existingCommentIds.has(e)||this._existingBookmarksIds.has(e)))}let F=(0,i.aV)().withMutations((e=>{this._filterRecords(C).forEach((t=>{let{id:s,content:i,permissions:r,group:u,isAnonymous:m}=t;const p={permissions:r,group:u,isAnonymous:m};try{(0,o._Q)(i)?(c.push((0,o.IN)(s,i,p)),this._existingFormFieldsIds=this._existingFormFieldsIds.add(s)):(0,o.Qp)(i)?(d=d.push((0,o.u9)(i)),this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.add(s)):(0,o.l9)(i)?(l=l.push((0,a.i)(s,i)),this._existingBookmarksIds=this._existingBookmarksIds.add(s)):(0,o.Fd)(i)?(this._existingCommentIds=this._existingCommentIds.add(s),h=h.push((0,o.Mu)(s,i,p))):(0,o.$T)(i)||(0,o._o)(i)||e.push((0,o.vH)(s,i,p))}catch(e){(0,n.um)(`Skipped creating record #${s} from payload because an error occurred while deserializing.`,i),(0,n.um)(e)}}))}));const y=!f||(0,G.xW)(f.features,f.signatureFeatureAvailability);c.length>0&&((0,n.kG)(this._formFieldCallbacks),f&&!y?this._formFieldCallbacks.createFormFields((0,i.aV)(c.filter((e=>!(e instanceof z.Yo)))),r):this._formFieldCallbacks.createFormFields((0,i.aV)(c),r)),F.size>0&&((0,n.kG)(this._annotationCallbacks),f&&!y&&(F=F.filter((e=>{if(!(e instanceof B.x_))return e;const t=c.find((t=>t.name===e.formFieldName))||f.formFields.get(e.formFieldName);return!(t&&t instanceof z.Yo)}))),this._annotationCallbacks.createAnnotations(F,(0,i.D5)(),r)),d.size>0&&((0,n.kG)(this._formFieldValueCallbacks),f&&!y&&(d=d.filter((e=>{const t=c.find((t=>t.name===e.name))||f.formFields.get(e.formFieldName);return!(t&&t instanceof z.Yo)}))),this._formFieldValueCallbacks.createFormFieldValues((0,i.aV)(d),r)),h.size>0&&((0,n.kG)(this._commentCallbacks),this._commentCallbacks.createComments(h,r)),l.size>0&&((0,n.kG)(this._bookmarkCallbacks),this._bookmarkCallbacks.createBookmarks(l,r));const v=(0,i.aV)().asMutable(),w=[],I=[],R=[],x=(0,i.aV)().withMutations((e=>{this._filterRecords(g).forEach((t=>{let{id:s,content:i,group:r,permissions:l,isAnonymous:c}=t;const d={permissions:l,group:r,isAnonymous:c};try{if((0,o._Q)(i))try{w.push((0,o.IN)(s,i,d))}catch(e){p=p.add(s),(0,n.um)(`Skipped updating form field #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,n.um)(e)}else if((0,o.Qp)(i))try{I.push((0,o.u9)(i))}catch(e){k=k.add(s),(0,n.um)(`Skipped updating form field value #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,n.um)(e)}else if((0,o.l9)(i))try{v.push((0,a.i)(s,i))}catch(e){m=m.add(s),(0,n.um)(`Skipped updating bookmark #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,n.um)(e)}else if((0,o.Fd)(i))try{R.push((0,o.Mu)(s,i,d))}catch(e){_=_.add(s),(0,n.um)(`Skipped updating comment #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i,e)}else e.push((0,o.vH)(s,i,d))}catch(e){u=u.add(s),(0,n.um)(`Skipped updating annotation #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,n.um)(e)}}))}));x.size>0&&((0,n.kG)(this._annotationCallbacks),this._annotationCallbacks.updateAnnotations(x)),v.size>0&&((0,n.kG)(this._bookmarkCallbacks),this._bookmarkCallbacks.updateBookmarks(v)),w.length>0&&((0,n.kG)(this._formFieldCallbacks),this._formFieldCallbacks.updateFormFields((0,i.aV)(w))),I.length>0&&((0,n.kG)(this._formFieldValueCallbacks),this._formFieldValueCallbacks.setFormFieldValues((0,i.aV)(I))),R.length>0&&((0,n.kG)(this._commentCallbacks),this._commentCallbacks.updateComments((0,i.aV)(R))),u=u.concat(b.filter((e=>!(this._existingBookmarksIds.has(e)||this._existingFormFieldsIds.has(e)||this._existingFormFieldValuesIds.has(e)||this._existingCommentIds.has(e)))).toSet()),u.size>0&&((0,n.kG)(this._annotationCallbacks),this._annotationCallbacks.deleteAnnotations(u)),m=m.concat(b.filter((e=>{const t=this._existingBookmarksIds.has(e);return t&&(this._existingBookmarksIds=this._existingBookmarksIds.delete(e)),t})).toSet()),m.size>0&&((0,n.kG)(this._bookmarkCallbacks),this._bookmarkCallbacks.deleteBookmarks(m)),p=p.concat(b.filter((e=>{const t=this._existingFormFieldsIds.has(e);return t&&(this._existingFormFieldsIds=this._existingFormFieldsIds.delete(e)),t})).toSet()),p.size>0&&((0,n.kG)(this._formFieldCallbacks),this._formFieldCallbacks.deleteFormFields(p)),k=k.concat(b.filter((e=>{const t=this._existingFormFieldValuesIds.has(e);return t&&(this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.delete(e)),t})).toSet()),k.size>0&&((0,n.kG)(this._formFieldValueCallbacks),this._formFieldValueCallbacks.deleteFormFieldValues(k)),_=_.concat(b.filter((e=>{const t=this._existingCommentIds.has(e);return t&&(this._existingCommentIds=this._existingCommentIds.delete(e)),t})).toSet()),_.size>0&&((0,n.kG)(this._commentCallbacks),this._commentCallbacks.deleteComments(_))}_onAcceptedRecords(e,t){const s=this._getState?this._getState():void 0;if(!s||!s.backend||!s.backend.isCollaborationPermissionsEnabled())return;const o=[],a=[],r=[],l=[],c=[],d=[];function h(e){const t={permissions:e.permissions,group:e.group};let i=P(s,e);if(i&&"string"!=typeof i){(0,D.G)(t);const e=(0,D.a5)(t);i=i.merge(e),i instanceof T.Z?t.permissions&&t.permissions.view?o.push(i):l.push(i.id):i instanceof E.Z?t.permissions&&t.permissions.view?a.push(i):((0,n.kG)(i.id),c.push(i.id)):i instanceof U.ZP&&(t.permissions&&t.permissions.view?r.push(i):d.push(i.id))}}e.isEmpty()||e.forEach(h),t.isEmpty()||t.forEach(h),o.length>0&&((0,n.kG)(this._annotationCallbacks),this._annotationCallbacks.updateAnnotations((0,i.aV)(o),!0)),a.length>0&&((0,n.kG)(this._commentCallbacks),this._commentCallbacks.updateComments((0,i.aV)(a))),r.length>0&&((0,n.kG)(this._formFieldCallbacks),this._formFieldCallbacks.updateFormFields((0,i.aV)(r))),l.length>0&&((0,n.kG)(this._annotationCallbacks),this._annotationCallbacks.deleteAnnotations((0,i.l4)(l),!0)),c.length>0&&((0,n.kG)(this._commentCallbacks),this._commentCallbacks.deleteComments((0,i.l4)(c))),d.length>0&&((0,n.kG)(this._formFieldCallbacks),this._formFieldCallbacks.deleteFormFields((0,i.l4)(d)))}onClientsChange(e){if("function"!=typeof e)throw new TypeError("Callback must be a function");this.onClientsChangeCallback=e}_onClientsChange(e){this.onClientsChangeCallback.call(null,e)}setDocumentHandleConflictCallback=e=>{this._documentHandleConflictCallback=e};setDocumentHandleOutdated=e=>{this._setDocumentHandleOutdatedCallback=e};onDocumentHandleConflict=()=>{this._documentHandleConflictCallback&&this._documentHandleConflictCallback(),this._setDocumentHandleOutdatedCallback&&this._setDocumentHandleOutdatedCallback(!0)}}}}]);