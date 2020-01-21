(this["webpackJsonpugs-hazards"]=this["webpackJsonpugs-hazards"]||[]).push([[0],[,,,,,,,,,,,function(e,a,t){e.exports=t.p+"static/media/qff-legend.77240261.jpg"},,function(e,a,t){e.exports=t.p+"static/media/ugs-logo.46881887.jpg"},function(e,a,t){e.exports=t(48)},,,,,function(e,a,t){},,function(e,a,t){},function(e,a,t){},function(e,a,t){},,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},,,,,,,,,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var r,n,c,o=t(0),s=t.n(o),l=t(9),i=t.n(l),u=(t(19),t(1)),d=t.n(u),m=t(4),p=t(3),g=t(2),h=(t(21),"https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services"),f="".concat(h,"/Utah_Geologic_Hazards_Supplemental_Data_View/FeatureServer"),b={mapKeys:{overview:"overview-map",lidar:"lidar-map",aerials:"aerials-map"},scaleMultiple:2500,notProd:!1,urls:{baseUrl:h,hazardGroupingsTable:"".concat(h,"/Report_Tables_View/FeatureServer/0"),hazardGroupTextTable:"".concat(h,"/Report_Tables_View/FeatureServer/1"),hazardIntroTextTable:"".concat(h,"/Report_Tables_View/FeatureServer/2"),hazardReferenceTextTable:"".concat(h,"/Report_Tables_View/FeatureServer/3"),hazardUnitTextTable:"".concat(h,"/Report_Tables_View/FeatureServer/4"),imageAgenciesTable:"".concat(h,"/Report_Tables_View/FeatureServer/5"),otherDataTable:"".concat(h,"/Report_Tables_View/FeatureServer/7"),reportTextTable:"".concat(h,"/Report_Tables_View/FeatureServer/8"),lidarExtents:"".concat(f,"/2"),aerialImageryCenterPoints:"".concat(f,"/3")},groundshakingHazardCode:"EGS",quaternaryFaultsHazardCode:"QFF",queries:[["Utah_Geologic_Hazards/FeatureServer/0","FLH"],["Utah_Geologic_Hazards/FeatureServer/1","SGS"],["Utah_Geologic_Hazards/FeatureServer/2","LSS"],["Utah_Geologic_Hazards/FeatureServer/3","LSF"],["Utah_Geologic_Hazards/FeatureServer/4","LSC"],["Utah_Geologic_Hazards/FeatureServer/5","CAS"],["Utah_Geologic_Hazards/FeatureServer/6","CSS"],["Utah_Geologic_Hazards/FeatureServer/7","CRS"],["Utah_Geologic_Hazards/FeatureServer/8","EFH"],["Utah_Geologic_Hazards/FeatureServer/9","ERZ"],["Utah_Geologic_Hazards/FeatureServer/10","EXS"],["Utah_Geologic_Hazards/FeatureServer/11","GSP"],["Utah_Geologic_Hazards/FeatureServer/12","MKF"],["Utah_Geologic_Hazards/FeatureServer/13","PES"],["Utah_Geologic_Hazards/FeatureServer/14","GRS"],["Utah_Geologic_Hazards/FeatureServer/15","RFH"],["Utah_Geologic_Hazards/FeatureServer/16","SDH"],["Utah_Geologic_Hazards/FeatureServer/17","SBP"],["Utah_Geologic_Hazards/FeatureServer/18","SLS"],["Utah_Geologic_Hazards/FeatureServer/19","WSS"],["https://webmaps.geology.utah.gov/arcgis/rest/services/Hazards/quaternary_faults/MapServer/0","QFF"],["Utah_Earthquake_Hazards/FeatureServer/2","LQS"],["Utah_Earthquake_Hazards/FeatureServer/3","SFR"],["Utah_Earthquake_Hazards/FeatureServer/5","EGS"]],webMaps:{hazard:"a2d16377b4b5495ab2aaca8dd14463ba"}},y=t(10),v=function(){var e,a,t,r,n,c,o,s,l,i;return d.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:return e=["esri/WebMap","esri/views/MapView","esri/geometry/Polygon","esri/Graphic","esri/core/watchUtils","esri/symbols/support/symbolUtils","esri/widgets/ScaleBar"],u.next=3,d.a.awrap(Object(y.loadModules)(e,{version:"4.14",css:!0}));case 3:return a=u.sent,t=Object(g.a)(a,7),r=t[0],n=t[1],c=t[2],o=t[3],s=t[4],l=t[5],i=t[6],u.abrupt("return",{WebMap:r,MapView:n,Polygon:c,Graphic:o,watchUtils:s,symbolUtils:l,ScaleBar:i});case 13:case"end":return u.stop()}}))},E=(t(22),Object(o.createContext)({visualAssets:{}})),T=function(e){console.log("HazardMap.render",e);var a=Object(o.useState)({}),t=Object(g.a)(a,2),l=t[0],i=t[1],u=Object(o.useState)(!1),m=Object(g.a)(u,2),p=m[0],h=m[1],f=Object(o.useState)(!1),y=Object(g.a)(f,2),T=y[0],S=y[1],H=Object(o.useContext)(se),x=H.registerProgressItem,w=H.setProgressItemAsComplete,z=function(e){return"screenshot-".concat(e)};return Object(o.useEffect)((function(){for(var a=0;a<e.queriesWithResults.length;a++){var t=Object(g.a)(e.queriesWithResults[a],1)[0];x(z(t))}Object.keys(b.mapKeys).forEach((function(e){x(z(b.mapKeys[e]))}))}),[e.queriesWithResults,x]),Object(o.useEffect)((function(){T&&e.queriesWithResults.length>0&&function(){var a,t,r,n,c,o,s,l,u,m,p;d.a.async((function(h){for(;;)switch(h.prev=h.next){case 0:console.log("getScreenshots",e.queriesWithResults),a={},t=0;case 3:if(!(t<e.queriesWithResults.length)){h.next=17;break}return r=Object(g.a)(e.queriesWithResults[t],2),n=r[0],c=r[1],h.next=7,d.a.awrap(_(n,c));case 7:o=h.sent,s=o.screenshot,l=o.renderer,u=o.scale,m=o.scaleBarDom,w(z(n)),a[c]={mapImage:s.dataUrl,renderer:l,scale:u,scaleBarDom:m};case 14:t++,h.next=3;break;case 17:return p=function(e,t){var r,n,c,o;return d.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,d.a.awrap(_(t));case 2:r=s.sent,n=r.screenshot,c=r.scale,o=r.scaleBarDom,a[e]={mapImage:n.dataUrl,scale:c,scaleBarDom:o},w(z(e));case 8:case"end":return s.stop()}}))},h.next=20,d.a.awrap(p(b.mapKeys.overview));case 20:return h.next=22,d.a.awrap(p(b.mapKeys.lidar,b.urls.lidarExtents));case 22:return h.next=24,d.a.awrap(p(b.mapKeys.aerials,b.urls.aerialImageryCenterPoints));case 24:i(a);case 25:case"end":return h.stop()}}))}()}),[e.queriesWithResults,T,w]),p||function(){var a,t,o,s,l,i,u,m,p,g,f;d.a.async((function(y){for(;;)switch(y.prev=y.next){case 0:return console.log("HazardMap.createMap"),h(!0),y.next=4,d.a.awrap(v());case 4:return a=y.sent,t=a.WebMap,o=a.MapView,s=a.Polygon,l=a.Graphic,i=a.ScaleBar,u=document.createElement("div"),document.body.appendChild(u),m={type:"simple-line",color:"#f012be",width:4},p=new s(e.aoi),g=new l({geometry:p,symbol:m}),r=new t({portalItem:{id:b.webMaps.hazard}}),console.log("map created"),n=new o({map:r,container:u,ui:{components:["attribution"]},extent:p.extent.expand(3),graphics:[g],constraints:{snapToZoom:!1}}),y.next=20,d.a.awrap(n.when());case 20:f=n.scale%b.scaleMultiple,n.scale+=b.scaleMultiple-f,c=new i({view:n,container:document.createElement("div"),unit:"dual"}),S(!0);case 24:case"end":return y.stop()}}))}(),s.a.createElement(s.a.Fragment,null,s.a.createElement(E.Provider,{value:{visualAssets:l}},e.children))},_=function(e,a){var t,o,s,l,i,u,m,p,g,h,f;return d.a.async((function(y){for(;;)switch(y.prev=y.next){case 0:return console.log("HazardMap.getScreenshot",e),y.next=3,d.a.awrap(r.when());case 3:o=0;case 4:if(!(o<r.layers.length)){y.next=19;break}if(s=r.layers.getItemAt(o),l=void 0,i=void 0,"map-image"===s.type?(s=s.sublayers.items[0],l=s.url,i=s.parent):(l="".concat(s.url,"/").concat(s.layerId),i=s),s.visible=!!e&&new RegExp("".concat(e.toUpperCase(),"$")).test(l.toUpperCase()),!s.visible){y.next=15;break}return y.next=13,d.a.awrap(i.load());case 13:t=s.renderer,s.parent&&(s.parent.visible=s.visible);case 15:case 16:o++,y.next=4;break;case 19:return y.next=21,d.a.awrap(v());case 21:if(u=y.sent,m=u.watchUtils,a!==b.groundshakingHazardCode){y.next=27;break}return p=n.scale,y.next=27,d.a.awrap(n.goTo({scale:2*n.scale}));case 27:return y.next=29,d.a.awrap(m.whenFalseOnce(n,"updating"));case 29:return y.next=31,d.a.awrap(n.takeScreenshot({width:2316,height:1431}));case 31:if(g=y.sent,c.renderNow(),h=c.container.cloneNode(!0),f=n.scale,!p){y.next=38;break}return y.next=38,d.a.awrap(n.goTo({scale:p}));case 38:return console.log("view.scale",f,a,t),y.abrupt("return",{screenshot:g,renderer:t,scale:f,scaleBarDom:h});case 40:case"end":return y.stop()}}))},S=(t(23),function(e){return s.a.createElement("div",{className:"page-break"},s.a.createElement("h1",{className:"group__heading",title:b.notProd&&"HazardGroupingsTable.HazardGroup"},e.name," Hazard"),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.text},title:b.notProd&&"HazardGroupTextTable.Text"}),e.children)}),H=t(6),x=(t(26),t(27),t(28),function(){return s.a.createElement("div",{className:"loader-container"},s.a.createElement("div",{className:"loader"},s.a.createElement("div",null),s.a.createElement("div",null),s.a.createElement("div",null)))}),w=function(e){var a=e.mapKey,t=Object(o.useRef)(),r=Object(o.useContext)(E).visualAssets,n=r&&r[a]&&r[a].mapImage,c=n?r[a].scale:0,l=n?r[a].scaleBarDom:null;return Object(o.useEffect)((function(){l&&t.current.appendChild(l)}),[l]),n?s.a.createElement(s.a.Fragment,null,s.a.createElement("img",{src:n,alt:"map",className:"map-surround__image"}),s.a.createElement("div",{className:"map-surround__parts"},s.a.createElement("div",{ref:t}),s.a.createElement("div",{className:"map-surround__scale-text"},"Scale 1:",Math.round(c).toLocaleString()))):s.a.createElement(x,null)},z=t(11),j=t.n(z),O=function(e){return s.a.createElement("div",{className:"page-break",id:Object(H.kebabCase)(e.name)},s.a.createElement("h2",{className:"group__heading",title:b.notProd&&"HazardGroupingsTable.HazardGroup (from parent)"},e.group," Hazard"),s.a.createElement("h2",{className:"hazard__heading",title:b.notProd&&"HazardUnitTextTable.HazardName (from first unit)"},e.name),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.introText},title:b.notProd&&"HazardIntroTextTable.Text"}),s.a.createElement(w,{mapKey:e.code}),e.code===b.quaternaryFaultsHazardCode&&s.a.createElement("img",{src:j.a,alt:"QFF static legend",className:"hazard__static-legend"}),e.children)},U=function(e){return e.slice(-3).toUpperCase()},N=(t(29),function(e){console.log("HazardUnit",e);var a=Object(o.useState)(!1),t=Object(g.a)(a,2),r=t[0],n=t[1],c=Object(o.useRef)(null),l=Object(o.useContext)(E);return Object(o.useEffect)((function(){console.log("mapContext",l);var a=l.visualAssets[U(e.HazardUnit)];!r&&a&&a.renderer&&function(a){var t,r,o,s;d.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return console.log("buildLegend",a),l.next=3,d.a.awrap(v());case 3:if(t=l.sent,r=t.symbolUtils,o=[],"unique-value"===a.type&&(o=a.uniqueValueInfos.filter((function(a){return a.value===e.HazardUnit}))),1===o.length){l.next=9;break}return l.abrupt("return");case 9:return s=o[0].symbol.clone(),l.next=12,d.a.awrap(r.renderPreviewHTML(s,{node:c.current}));case 12:n(!0);case 13:case"end":return l.stop()}}))}(a.renderer)}),[r,e.HazardUnit,l]),s.a.createElement("div",{className:"unit"},s.a.createElement("div",{className:"legend-container"},s.a.createElement("div",{ref:c,className:"legend"}),s.a.createElement("div",null,s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.Description},title:b.notProd&&"HazardUnitTextTable.Description"}),s.a.createElement("h4",null,"How to Use This Map"),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.HowToUse},title:b.notProd&&"HazardUnitTextTable.HowToUse"}))))}),F=function(e){return console.log("References.render"),s.a.createElement(s.a.Fragment,null,s.a.createElement("h3",null,"References"),e.references&&e.references.length>0?e.references.map((function(e,a){return s.a.createElement("p",{key:a,dangerouslySetInnerHTML:{__html:e},title:b.notProd&&"HazardReferenceTextTable.Text"})})):s.a.createElement("p",null,"None"))},R=t(5),P=t(12),G=t.n(P),I=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return e};return G()().waitAndRetry(3).executeForPromise((function(){var t,r;return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d.a.awrap(fetch(e));case 2:if((t=n.sent).ok){n.next=5;break}return n.abrupt("return",Promise.reject(Object(p.a)({},t,{requestURL:e})));case 5:return n.next=7,d.a.awrap(t.json());case 7:if(!(r=n.sent).error){n.next=10;break}return n.abrupt("return",Promise.reject(Object(p.a)({},r,{requestURL:e})));case 10:return n.abrupt("return",a(r));case 11:case"end":return n.stop()}}))}))},A=function(e,a){var t,r,n,c,o;return d.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return console.log("QueryService.queryUnitsAsync"),t=Object(g.a)(e,2),r=t[0],n=t[1],r.startsWith("https")||(r="".concat(b.urls.baseUrl,"/").concat(r)),c="".concat(n,"HazardUnit"),o={geometryType:"esriGeometryPolygon",geometry:JSON.stringify(a),returnGeometry:!1,outFields:c,f:"json"},s.next=7,d.a.awrap(I("".concat(r,"/query?").concat(Object(R.stringify)(o)),(function(e){return{units:e.features.map((function(e){return e.attributes[c]})),hazard:n,url:r}})));case 7:return s.abrupt("return",s.sent);case 8:case"end":return s.stop()}}))},M=function(e){return e.map((function(e){return U(e)}))},D=function(e,a,t,r){var n;return d.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return n={where:a,outFields:t,f:"json",orderByFields:r},c.next=3,d.a.awrap(I("".concat(e,"/query?").concat(Object(R.stringify)(n)),(function(e){return e.features.map((function(e){return e.attributes}))})));case 3:return c.abrupt("return",c.sent);case 4:case"end":return c.stop()}}))},C=function(e){console.log("QueryService.queryHazardUnitTableAsync");var a="HazardUnit IN ('".concat(e.join("','"),"')");return D(b.urls.hazardUnitTextTable,a,"HazardName,HazardUnit,HowToUse,Description,UnitName")},k=function(e){console.log("QueryService.queryReferenceTableAsync"),e=M(e);var a="Hazard IN ('".concat(e.join("','"),"')");return D(b.urls.hazardReferenceTextTable,a,"Hazard,Text")},L=function(e){console.log("QueryService.queryIntroTextAsync"),e=M(e);var a="Hazard IN ('".concat(e.join("','"),"')");return D(b.urls.hazardIntroTextTable,a,"Hazard,Text")},q=function(e){console.log("QueryService.queryGroupingAsync"),e=M(e);var a="HazardCode IN ('".concat(e.join("','"),"')");return D(b.urls.hazardGroupingsTable,a,"HazardCode,HazardGroup")},K=function(e){console.log("QueryService.queryGroupTextAsync");var a="HazardGroup IN ('".concat(e.join("','"),"')");return D(b.urls.hazardGroupTextTable,a,"HazardGroup,Text","Order_ ASC")},B=function(){console.log("QueryService.queryReportTextTableAsync");return D(b.urls.reportTextTable,"1=1","Section,Text")},W=function(){console.log("QueryService.queryOtherDataTable");return D(b.urls.otherDataTable,"1=1","Data,Introduction,HowToUse,References_")},V=function(e){var a;return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return a={geometryType:"esriGeometryPolygon",geometry:JSON.stringify(e),returnGeometry:!1,outFields:["ProjectName","AreaName","DataAccessURL"],f:"json"},t.next=3,d.a.awrap(I("".concat(b.urls.lidarExtents,"/query?").concat(Object(R.stringify)(a)),(function(e){return e.features.map((function(e){return e.attributes}))})));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}))},Q=function(e){var a,t,r,n,c,o;return d.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return a={geometryType:"esriGeometryPolygon",geometry:JSON.stringify(e),returnGeometry:!1,outFields:["Agency","ProjectYear","ProjectCode","ProjectName","Roll","Frame"],f:"json",orderByFields:"Agency ASC, ProjectYear DESC, ProjectCode ASC"},s.next=3,d.a.awrap(I("".concat(b.urls.aerialImageryCenterPoints,"/query?").concat(Object(R.stringify)(a)),(function(e){return e.features.map((function(e){return e.attributes}))})));case 3:return t=s.sent,r=Array.from(new Set(t.map((function(e){return e.Agency})))),n="Agency IN ('".concat(r.join(","),"')"),s.next=8,d.a.awrap(D(b.urls.imageAgenciesTable,n,["Agency","Description"]));case 8:return c=s.sent,o={},c.forEach((function(e){o[e.attributes.Agency]=e.attributes.Description})),s.abrupt("return",t.map((function(e){return Object(p.a)({},e,{Description:o[e.Agency]})})));case 12:case"end":return s.stop()}}))},J=t(13),Z=t.n(J),Y=(t(41),new Date),X=function(e){var a=e.aoiDescription,t=(e.aoi,e.Introduction),r=e.Disclaimer;return s.a.createElement("div",{className:"cover-page"},s.a.createElement("div",{className:"header"},s.a.createElement("h1",null,"Utah Geological Survey"),s.a.createElement("img",{src:Z.a,alt:"dnr logo",className:"logo"}),s.a.createElement("h3",null,"GEOLOGIC HAZARDS MAPPING AND DATA CUSTOM REPORT"),s.a.createElement("h3",{title:b.notProd&&'from "description" property of input data'},"for ",a),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:"Report generated on ".concat(Y.toLocaleDateString()," at ").concat(Y.toLocaleTimeString())}})),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:t},title:b.notProd&&"ReportTextTable.Text(Introduction)"}),s.a.createElement(w,{mapKey:b.mapKeys.overview}),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:r},title:b.notProd&&"ReportTextTable.Text(Disclaimer)"}))},$=(t(42),function(e){console.log("SummaryPage.render",e);var a=[];return Object.values(e.groupToHazardMap).forEach((function(t){t.forEach((function(t){a=a.concat(e.hazardToUnitMap[t])}))})),s.a.createElement("div",{className:"page-break summary-page"},s.a.createElement("div",{className:"header"},s.a.createElement("h1",null,"Report Summary")),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.Top},title:b.notProd&&"ReportTextTable.Text(Top)"}),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e["Table1headingautogenerated table"]},title:b.notProd&&"ReportTextTable.Text(Table 1 heading...)"}),s.a.createElement("table",{className:"summary-page__table summary-page__table--bordered"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"Mapped Geologic Hazards"),s.a.createElement("th",null,"Mapped Hazard Severity"))),s.a.createElement("tbody",null,a.map((function(e,a){return s.a.createElement("tr",{key:a},s.a.createElement("td",null,s.a.createElement("a",{href:"#".concat(Object(H.kebabCase)(e.HazardName))},e.HazardName)),s.a.createElement("td",null,e.UnitName))})))),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e["Table2headingautogenerated table"]},title:b.notProd&&"ReportTextTable.Text(Table 2 heading...)"}),s.a.createElement("table",{className:"summary-page__table summary-page__table--bordered"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"Other Available Data"))),s.a.createElement("tbody",null,e.lidarFeatures.length>0&&s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement("a",{href:"#lidar"},"Lidar Elevation Data (high-resolution ground topography)"))),e.aerialFeatures.length>0&&s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement("a",{href:"#aerial-photography"},"Aerial Photography and Imagery"))),e.aerialFeatures.length<1&&e.lidarFeatures.length<1&&s.a.createElement("tr",null,s.a.createElement("td",null,"No other data")))),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.Bottom},title:b.notProd&&"ReportTextTable.Text(Bottom)"}))}),ee=(t(43),function(e){return s.a.createElement("div",{className:"page-break",id:e.id},s.a.createElement("div",{className:"header"},s.a.createElement("h2",{className:"group__heading"},"OTHER DATA"),s.a.createElement("h2",{className:"other-data-page__heading"},e.Data)),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.Introduction},title:b.notProd&&"OtherDataTable.Introduction"}),s.a.createElement(w,{mapKey:e.mapKey}),e.children,s.a.createElement("h4",null,"How To Use This Map"),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.HowToUse},title:b.notProd&&"OtherDataTable.HowToUse"}),e.References_&&s.a.createElement(s.a.Fragment,null,s.a.createElement("h4",null,"References"),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.References_},title:b.notProd&&"OtherDataTable.References_"})))}),ae=t(7),te=t.n(ae),re=(t(44),function(e){console.log("Progress.render");var a=Object.values(e.tasks),t=a.length,r=0,n=0;t>0&&(n=(r=a.filter((function(e){return e})).length)/t*100);var c=te()("progress-bar","progress-bar--striped",{"progress-bar--animated":t>r}),o=te()(e.className);return s.a.createElement("div",{className:o},r<t?s.a.createElement("div",{className:"progress"},s.a.createElement("div",{className:c,style:{width:"".concat(n,"%")},role:"progressbar","area-valuenow":n,"aria-valuemin":"0","aria-valuemax":t})):e.children)}),ne=(t(45),function(e){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"lidar-feature-header"},(a=e.ProjectName,(t=e.AreaName)?"".concat(a," - ").concat(t):a)),e.DataAccessURL&&e.DataAccessURL.split(",").map((function(e,a){return s.a.createElement("div",{key:a},s.a.createElement("a",{href:e},e))})));var a,t}),ce=(t(46),function(e){return s.a.createElement("div",{className:"aerial-feature"},s.a.createElement("div",null,e.Agency),s.a.createElement("div",null,e.ProjectYear," ",e.ProjectCode," ",e.ProjectName," ",e.Roll," ",e.Frame),s.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.Description}}))}),oe=(t(47),function(e){return s.a.createElement("div",{className:"error-page"},s.a.createElement("h1",{className:"error-page__heading"},"There was an error generating the report"),s.a.createElement("p",null,"We are not displaying the report because an error has occurred resulting in an incomplete assessment of your area of interest. In order to not provide incomplete results and imply false information, we are unable to provide the report functionality at this time."),s.a.createElement("p",null,"Please contact UGS with the information provided."),s.a.createElement("pre",{className:"error-page__error"},JSON.stringify(e.error,null,2)))}),se=Object(o.createContext)();console.log("using web map: ".concat(b.webMaps.hazard));var le=function(e){var a=Object(o.useState)({}),t=Object(g.a)(a,2),r=t[0],n=t[1],c=Object(o.useState)({}),l=Object(g.a)(c,2),i=l[0],u=l[1],h=Object(o.useState)(),f=Object(g.a)(h,2),y=f[0],v=f[1],E=Object(o.useState)(),_=Object(g.a)(E,2),H=_[0],x=_[1],w=Object(o.useState)([]),z=Object(g.a)(w,2),j=z[0],R=z[1],P=Object(o.useState)([]),G=Object(g.a)(P,2),I=G[0],M=G[1],D=Object(o.useState)({}),J=Object(g.a)(D,2),Z=J[0],Y=J[1],ae=Object(o.useState)({}),te=Object(g.a)(ae,2),le=te[0],ie=te[1],ue=Object(o.useState)([]),de=Object(g.a)(ue,2),me=de[0],pe=de[1],ge=Object(o.useState)([]),he=Object(g.a)(ge,2),fe=he[0],be=he[1],ye=Object(o.useState)({}),ve=Object(g.a)(ye,2),Ee=ve[0],Te=ve[1],_e=Object(o.useState)(!1),Se=Object(g.a)(_e,2),He=Se[0],xe=Se[1],we=Object(o.useCallback)((function(e){Te((function(a){if(a[e])throw Error("".concat(e," is already registered as a progress task!"));return Object(p.a)({},a,Object(m.a)({},e,!1))}))}),[]),ze=Object(o.useCallback)((function(e){Te((function(a){return Object(p.a)({},a,Object(m.a)({},e,!0))}))}),[]);return Object(o.useEffect)((function(){e.polygon&&function(){var a,t,r,c,o,s,l,i,m,p,h,f,y,E,T,_,S,H,w,z,j;return d.a.async((function(O){for(;;)switch(O.prev=O.next){case 0:return console.log("App.getData"),we(a="related tables"),O.next=5,d.a.awrap(Promise.all(b.queries.map((function(a){return we(a),A(a,e.polygon).then((function(e){return ze(a),e}))}))));case 5:return t=O.sent,console.log("queried all units"),r=t.filter((function(e){return e.units.length>0})),c=Array.from(new Set(r.reduce((function(e,a){var t=a.units;return e.concat(t)}),[]))),R(r.map((function(e){return[e.url,e.hazard]}))),O.next=12,d.a.awrap(Promise.all([q(c),L(c),C(c),k(c),B(),W(),V(e.polygon),Q(e.polygon)]));case 12:return o=O.sent,s=Object(g.a)(o,8),l=s[0],i=s[1],m=s[2],p=s[3],h=s[4],f=s[5],y=s[6],E=s[7],ze(a),T={},f.forEach((function(e){T[e.Data]=e})),ie(T),_={},h.forEach((function(e){var a=e.Section,t=e.Text;_[a]=t})),Y(_),S=Array.from(new Set(l.map((function(e){return e.HazardGroup})))),O.next=32,d.a.awrap(K(S));case 32:H=O.sent,w={},z={},H.forEach((function(e){var a=e.HazardGroup,t=e.Text;w[a]=t,z[a]=[]})),j={},m.forEach((function(e){var a=e.HazardUnit,t=e.HazardName,r=e.HowToUse,n=e.Description,c=e.UnitName,o=U(a);j[o]||(j[o]=[]),j[o].push({HazardName:t,HowToUse:r,Description:n,HazardUnit:a,UnitName:c})})),l.forEach((function(e){var a=e.HazardCode,t=e.HazardGroup;return z[t].push(a)})),u(j),n(z),v(i),x(p),M(w),pe(y),be(E);case 46:case"end":return O.stop()}}))}().then(null,(function(e){console.warn(e),xe(e)}))}),[e.polygon,we,ze]),He?s.a.createElement(oe,{error:He}):s.a.createElement(s.a.Fragment,null,s.a.createElement(se.Provider,{value:{registerProgressItem:we,setProgressItemAsComplete:ze}},s.a.createElement(re,{className:"print--hide",tasks:Ee},s.a.createElement("div",{className:"print-button"},s.a.createElement("button",{onClick:window.print},"Print Report"))),s.a.createElement("div",{className:"app__container"},s.a.createElement(T,{aoi:e.polygon,queriesWithResults:j},s.a.createElement(X,Object.assign({aoiDescription:e.description},Z)),s.a.createElement($,Object.assign({},Z,{hazardToUnitMap:i,aerialFeatures:fe,lidarFeatures:me,groupToHazardMap:r})),Object.keys(r).map((function(e){return s.a.createElement(S,{key:e,name:e,text:I[e]},y&&H&&i&&r[e].map((function(a){var t=y.filter((function(e){return e.Hazard===a}))[0],r=t?t.Text:null,n=H.filter((function(e){return e.Hazard===a})),c=i[a];return s.a.createElement(O,{name:c[0].HazardName,group:e,introText:r,key:a,code:a},c.map((function(e,a){return s.a.createElement(N,Object.assign({key:a},e))})),s.a.createElement(F,{references:n.map((function(e){return e.Text}))}))})))})),s.a.createElement(ee,Object.assign({},le["Lidar Elevation Data"],{mapKey:b.mapKeys.lidar,id:"lidar"}),me.map((function(e,a){return s.a.createElement(ne,Object.assign({key:a},e))}))),s.a.createElement(ee,Object.assign({},le["Aerial Photography and Imagery"],{mapKey:b.mapKeys.aerials,id:"aerial-photography"}),fe.map((function(e,a){return s.a.createElement(ce,Object.assign({key:a},e))})))),s.a.createElement("div",{className:"header page-break"},s.a.createElement("h1",null,"OTHER GEOLOGIC HAZARD RESOURCES"),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:Z.OtherGeologicHazardResources},title:b.notProd&&"ReportTextTable.Text(OtherGeologicHazardResources)"})))))};console.log("app version: ".concat("1.0.1")),console.log("environment: ".concat("production"));var ie=function(e){console.log("aoi",e),i.a.render(s.a.createElement(le,e),document.getElementById("root"))},ue=localStorage.getItem("aoi");ue?ie(JSON.parse(ue)):t.e(3).then(t.t.bind(null,49,3)).then((function(e){return ie(e)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.cab138ef.chunk.js.map