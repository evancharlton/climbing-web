(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{289:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),r=p(l),i=a(68),s=p(a(99)),o=a(131),u=a(135),c=p(a(302)),d=p(a(301)),h=p(a(134)),f=p(a(98)),m=p(a(101));function p(e){return e&&e.__esModule?e:{default:e}}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function b(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}a(100);var v=function(e){function t(){return g(this,t),y(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return b(t,l.Component),n(t,[{key:"render",value:function(){var e="";if(this.props.sector.comment)if(this.props.sector.comment.length>100){var t=r.default.createElement(o.Tooltip,{id:this.props.sector.id},this.props.sector.comment);e=r.default.createElement(o.OverlayTrigger,{key:this.props.sector.id,placement:"top",overlay:t},r.default.createElement("span",null,this.props.sector.comment.substring(0,100)+"..."))}else e=this.props.sector.comment;return r.default.createElement("tr",null,r.default.createElement("td",null,r.default.createElement(i.Link,{to:"/sector/"+this.props.sector.id},this.props.sector.name)," ",1===this.props.sector.visibility&&r.default.createElement(m.default,{icon:"lock"}),2===this.props.sector.visibility&&r.default.createElement(m.default,{icon:"user-secret"})),r.default.createElement("td",null,e),r.default.createElement("td",null,this.props.sector.numProblems))}}]),t}(),E=function(e){function t(e){g(this,t);var a=y(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={tabIndex:1},a}return b(t,l.Component),n(t,[{key:"refresh",value:function(e){var t=this;s.default.get(f.default.getUrl("areas?id="+e)).withCredentials().end(function(e,a){e?t.setState({error:e}):(t.setState({id:a.body.id,visibility:a.body.visibility,name:a.body.name,media:a.body.media,comment:a.body.comment,lat:a.body.lat,lng:a.body.lng,sectors:a.body.sectors}),document.title=f.default.getTitle()+" | "+t.state.name)})}},{key:"componentDidMount",value:function(){this.refresh(this.props.match.params.areaId)}},{key:"componentWillReceiveProps",value:function(e){this.refresh(e.match.params.areaId)}},{key:"handleTabsSelection",value:function(e){this.setState({tabIndex:e})}},{key:"onRemoveMedia",value:function(e){var t=this.state.media.filter(function(t){return t.id!=e});this.setState({media:t})}},{key:"render",value:function(){if(!this.state.id)return r.default.createElement("center",null,r.default.createElement(m.default,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return r.default.createElement("span",null,r.default.createElement("h3",null,this.state.error.status),this.state.error.toString());var e=this.state.sectors.map(function(e,t){return r.default.createElement(v,{sector:e,key:t})}),t=this.state.sectors.filter(function(e){return 0!=e.lat&&0!=e.lng}).map(function(e){return{lat:e.lat,lng:e.lng,title:e.name,icon:{url:"https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png",scaledSize:new google.maps.Size(32,32)},url:"/sector/"+e.id}}),a=this.state.sectors.filter(function(e){return e.polygonCoords}).map(function(e){return{triangleCoords:e.polygonCoords.split(";").map(function(e,t){var a=e.split(",");return{lat:parseFloat(a[0]),lng:parseFloat(a[1])}}),url:"/sector/"+e.id}}),n=this.state.lat&&this.state.lat>0?{lat:this.state.lat,lng:this.state.lng}:f.default.getDefaultCenter(),l=this.state.lat&&this.state.lat>0?14:f.default.getDefaultZoom(),s=t.length>0||a.length>0?r.default.createElement(c.default,{markers:t,polygons:a,defaultCenter:n,defaultZoom:l}):null,p=this.state.media&&this.state.media.length>0?r.default.createElement(d.default,{media:this.state.media,showThumbnails:this.state.media.length>1,removeMedia:this.onRemoveMedia.bind(this)}):null,g=null;return s&&p?g=r.default.createElement(o.Tabs,{activeKey:this.state.tabIndex,animation:!1,onSelect:this.handleTabsSelection.bind(this),id:"area_tab",unmountOnExit:!0},r.default.createElement(o.Tab,{eventKey:1,title:"Topo"},1==this.state.tabIndex&&p),r.default.createElement(o.Tab,{eventKey:2,title:"Map"},2==this.state.tabIndex&&s)):s?g=s:p&&(g=p),r.default.createElement("span",null,r.default.createElement(o.Breadcrumb,null,h.default.isAdmin()?r.default.createElement("div",{style:{float:"right"}},r.default.createElement(o.ButtonGroup,null,r.default.createElement(o.OverlayTrigger,{placement:"top",overlay:r.default.createElement(o.Tooltip,{id:-1},"Add sector")},r.default.createElement(u.LinkContainer,{to:{pathname:"/sector/edit/-1",query:{idArea:this.state.id,lat:this.state.lat,lng:this.state.lng}}},r.default.createElement(o.Button,{bsStyle:"primary",bsSize:"xsmall"},r.default.createElement(m.default,{icon:"plus-square",inverse:!0})))),r.default.createElement(o.OverlayTrigger,{placement:"top",overlay:r.default.createElement(o.Tooltip,{id:this.state.id},"Edit area")},r.default.createElement(u.LinkContainer,{to:{pathname:"/area/edit/"+this.state.id,query:{lat:this.state.lat,lng:this.state.lng}}},r.default.createElement(o.Button,{bsStyle:"primary",bsSize:"xsmall"},r.default.createElement(m.default,{icon:"edit",inverse:!0})))))):null,r.default.createElement(i.Link,{to:"/"},"Home")," / ",r.default.createElement(i.Link,{to:"/browse"},"Browse")," / ",r.default.createElement("font",{color:"#777"},this.state.name)," ",1===this.state.visibility&&r.default.createElement(m.default,{icon:"lock"}),2===this.state.visibility&&r.default.createElement(m.default,{icon:"user-secret"})),g,this.state.comment?r.default.createElement(o.Well,null,r.default.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.comment}})):null,r.default.createElement(o.Table,{striped:!0,condensed:!0,hover:!0},r.default.createElement("thead",null,r.default.createElement("tr",null,r.default.createElement("th",null,"Name"),r.default.createElement("th",null,"Description"),r.default.createElement("th",null,"#problems"))),r.default.createElement("tbody",null,e)))}}]),t}();t.default=E},301:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),r=y(l),i=y(a(335)),s=a(131),o=y(a(334)),u=y(a(134)),c=y(a(99)),d=a(314),h=a(68),f=y(a(98)),m=a(133),p=y(a(333)),g=y(a(101));function y(e){return e&&e.__esModule?e:{default:e}}a(100);var b=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={mediaIndex:0,hoverTrash:!1,hoverEdit:!1,showFullscreenButton:!0,showGalleryFullscreenButton:!0,showPlayButton:!0,showGalleryPlayButton:!1,showVideo:{},isFullscreen:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"componentWillReceiveProps",value:function(e){this.state={mediaIndex:0,hoverTrash:!1,hoverEdit:!1,showFullscreenButton:!0,showGalleryFullscreenButton:!0,showPlayButton:!0,showGalleryPlayButton:!1,showVideo:{},isFullscreen:!1},this.imageGallery&&this.imageGallery.slideToIndex(0)}},{key:"toggleHoverTrash",value:function(){this.setState({hoverTrash:!this.state.hoverTrash})}},{key:"toggleHoverEdit",value:function(){this.setState({hoverEdit:!this.state.hoverEdit})}},{key:"onDeleteImage",value:function(e){var t=this;if(confirm("Are you sure you want to delete this image?")){var a=this.props.media[this.state.mediaIndex].id;c.default.delete(f.default.getUrl("media?id="+a)).withCredentials().end(function(e,n){if(e)alert(e.toString());else{if(t.props.media.length>1&&t.state.mediaIndex>=t.props.media.length-1){var l=t.state.mediaIndex-1;t.setState({mediaIndex:l}),t.imageGallery.slideToIndex(l)}t.props.removeMedia(a)}})}}},{key:"onSlide",value:function(e){this.resetVideo(),this.setState({mediaIndex:e})}},{key:"onScreenChange",value:function(e){this.setState({isFullscreen:e})}},{key:"resetVideo",value:function(){this.setState({showVideo:{}}),this.state.showPlayButton&&this.setState({showGalleryPlayButton:!0}),this.state.showFullscreenButton&&this.setState({showGalleryFullscreenButton:!0})}},{key:"toggleShowVideo",value:function(e){this.state.showVideo[e]=!Boolean(this.state.showVideo[e]),this.setState({showVideo:this.state.showVideo}),this.state.showVideo[e]&&(this.state.showPlayButton&&this.setState({showGalleryPlayButton:!1}),this.state.showFullscreenButton&&this.setState({showGalleryFullscreenButton:!1}))}},{key:"renderVideo",value:function(e){var t=this;return r.default.createElement("div",{className:"image-gallery-image"},this.state.showVideo[e.embedUrl]?r.default.createElement("span",null,r.default.createElement("a",{className:"gallery-close-video",onClick:this.toggleShowVideo.bind(this,e.embedUrl)}),r.default.createElement(o.default,{ref:function(e){t.player=e},className:"react-player",width:"100%",height:"100%",url:e.embedUrl,onDuration:function(e){return t.setState({duration:e})},onStart:function(){return t.player.seekTo(parseFloat(e.seekTo/t.state.duration))},controls:!0,playing:!0})):r.default.createElement("a",{onClick:this.toggleShowVideo.bind(this,e.embedUrl)},r.default.createElement("div",{className:"gallery-play-button"}),r.default.createElement("img",{src:e.original})))}},{key:"pushUrl",value:function(e){this.setState({pushUrl:e})}},{key:"generateShapes",value:function(e,t,a,n){var l=this;return e.map(function(e,i){var s,o=(0,d.parseSVG)(e.path);(0,d.makeAbsolute)(o);for(var u,c=0,h=99999999,f=0,m=o.length;f<m;f++)o[f].y>c&&(s=f,c=o[f].y),o[f].y<h&&(u=f,h=o[f].y);var p=o[s].x,g=o[s].y,y=.012*a;p<y&&(p=y),p>a-y&&(p=a-y),g<y&&(g=y),g>n-y&&(g=n-y);var b=null;return e.hasAnchor&&(b=r.default.createElement("circle",{className:"buldreinfo-svg-ring",cx:o[u].x,cy:o[u].y,r:.006*a})),r.default.createElement("g",{className:"buldreinfo-svg-pointer buldreinfo-svg-hover"+(0===t||e.problemId===t?"":" buldreinfo-svg-opacity"),key:i,onClick:l.pushUrl.bind(l,"/problem/"+e.problemId)},r.default.createElement("path",{d:e.path,className:"buldreinfo-svg-route",strokeWidth:.003*a,strokeDasharray:.006*a}),r.default.createElement("circle",{className:"buldreinfo-svg-ring",cx:p,cy:g,r:y}),r.default.createElement("text",{className:"buldreinfo-svg-routenr",x:p,y:g,fontSize:.02*a,dy:".3em"},e.nr),b)})}},{key:"renderImage",value:function(e){return e.svgs?r.default.createElement("div",{className:"image-gallery-image"},r.default.createElement("canvas",{className:"buldreinfo-svg-canvas-ie-hack",width:e.width,height:e.height}),r.default.createElement("svg",{className:"buldreinfo-svg",viewBox:"0 0 "+e.width+" "+e.height,preserveAspectRatio:"xMidYMid meet"},r.default.createElement("image",{xlinkHref:f.default.getUrl("images?id="+e.id),width:"100%",height:"100%"}),this.generateShapes(e.svgs,e.svgProblemId,e.width,e.height))):r.default.createElement("div",{className:"image-gallery-image"},r.default.createElement("img",{src:f.default.getUrl("images?id="+e.id),className:"buldreinfo-scale-img"}))}},{key:"render",value:function(){var e=this;if((0,p.default)(null,{watchMQ:!0}),this.state&&this.state.pushUrl)return r.default.createElement(m.Redirect,{to:this.state.pushUrl,push:!0});var t=this.props.media.map(function(t,a){return 1==t.idType?{original:f.default.getUrl("images?id="+t.id),thumbnail:f.default.getUrl("images?id="+t.id),originalClass:"featured-slide",thumbnailClass:"featured-thumb",originalAlt:"original-alt",thumbnailAlt:"thumbnail-alt",renderItem:e.renderImage.bind(e,t)}:{original:f.default.getUrl("images?id="+t.id),thumbnail:f.default.getUrl("images?id="+t.id),originalClass:"featured-slide",thumbnailClass:"featured-thumb",originalAlt:"original-alt",thumbnailAlt:"thumbnail-alt",embedUrl:"https://buldreinfo.com/buldreinfo_media/mp4/"+100*Math.floor(t.id/100)+"/"+t.id+".mp4",seekTo:t.t,renderItem:e.renderVideo.bind(e)}}),a="",n=this.props.media[this.state.mediaIndex];return!this.state.isFullscreen&&1==n.idType&&u.default.isAdmin()&&(n.svgProblemId>0?a=r.default.createElement("span",{style:{position:"absolute",zIndex:"4",background:"rgba(0, 0, 0, 0.4)",padding:"8px 20px"}},r.default.createElement(h.Link,{to:"/problem/svg-edit/"+n.svgProblemId+"/"+n.id,onMouseEnter:this.toggleHoverEdit.bind(this),onMouseLeave:this.toggleHoverEdit.bind(this)},r.default.createElement(g.default,{icon:"edit",style:this.state.hoverEdit?{transform:"scale(1.1)",color:"#fff"}:{color:"#fff"}}))):n.svgs||(a=r.default.createElement("span",{style:{position:"absolute",zIndex:"4",background:"rgba(0, 0, 0, 0.4)",padding:"8px 20px"}},r.default.createElement("a",{href:"#",onMouseEnter:this.toggleHoverTrash.bind(this),onMouseLeave:this.toggleHoverTrash.bind(this)},r.default.createElement(g.default,{icon:"trash",style:this.state.hoverTrash?{transform:"scale(1.1)",color:"#fff"}:{color:"#fff"},onClick:this.onDeleteImage.bind(this)}))))),r.default.createElement(s.Well,{className:"app"},a,r.default.createElement(i.default,{ref:function(t){return e.imageGallery=t},items:t,onSlide:this.onSlide.bind(this),onScreenChange:this.onScreenChange.bind(this),showThumbnails:this.props.showThumbnails,showBullets:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton&&this.props.media.length>1,showIndex:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton,showPlayButton:!1,showFullscreenButton:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton}))}}]),t}();t.default=b},302:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),r=u(l),i=a(133),s=a(303),o=u(a(336));function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return navigator.geolocation.getCurrentPosition(function(e){a.setState({currLat:e.coords.latitude,currLng:e.coords.longitude})}),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"handleOnClick",value:function(e){this.setState({pushUrl:e})}},{key:"render",value:function(){var e=this;if(this.state&&this.state.pushUrl)return r.default.createElement(i.Redirect,{to:this.state.pushUrl,push:!0});var t=null;this.props.markers&&(t=this.props.markers.map(function(t,a){return r.default.createElement(s.Marker,{icon:t.icon,key:a,position:{lat:t.lat,lng:t.lng},label:t.label,title:t.title,clickable:!0,onClick:e.handleOnClick.bind(e,t.url)})})),this.state&&this.state.currLat&&this.state.currLng&&this.state.currLat>0&&this.state.currLng>0&&t.push(r.default.createElement(s.Marker,{key:-1,icon:"https://maps.gstatic.com/mapfiles/markers2/measle_blue.png",position:{lat:this.state.currLat,lng:this.state.currLng}}));var a=null;this.props.polygons&&(a=this.props.polygons.map(function(t,a){return r.default.createElement(s.Polygon,{key:a,paths:t.triangleCoords,options:{strokeColor:"#FF3300",strokeOpacity:"0.5",strokeWeight:"2",fillColor:"#FF3300",fillOpacity:"0.15"},onClick:e.handleOnClick.bind(e,t.url)})}));var n=(0,s.withGoogleMap)(function(n){return r.default.createElement(s.GoogleMap,{defaultZoom:e.props.defaultZoom,defaultCenter:e.props.defaultCenter,defaultMapTypeId:google.maps.MapTypeId.TERRAIN},r.default.createElement(o.default,{averageCenter:!1,minimumClusterSize:60,enableRetinaIcons:!1,imagePath:"https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m",gridSize:60},t,a))});return r.default.createElement("section",{style:{height:"600px"}},r.default.createElement(n,{containerElement:r.default.createElement("div",{style:{height:"100%"}}),mapElement:r.default.createElement("div",{style:{height:"100%"}})}))}}]),t}();t.default=c}}]);
//# sourceMappingURL=24.index.js.map