(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{287:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),l=m(n),o=a(68),i=m(a(99)),u=a(131),s=a(341),c=a(135),d=m(a(302)),f=m(a(134)),h=m(a(98)),p=m(a(101));function m(e){return e&&e.__esModule?e:{default:e}}a(100);var g=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.setState({currLat:t.coords.latitude,currLng:t.coords.longitude})}),i.default.get(h.default.getUrl("areas/list?regionId="+h.default.getRegion())).withCredentials().end(function(t,a){e.setState({error:t||null,areas:t?null:a.body}),document.title=h.default.getTitle()+" | browse"})}},{key:"formatName",value:function(e,t){return l.default.createElement("span",null,l.default.createElement(o.Link,{to:"/area/"+t.id},t.name)," ",1===t.visibility&&l.default.createElement(p.default,{icon:"lock"}),2===t.visibility&&l.default.createElement(p.default,{icon:"user-secret"}))}},{key:"toRad",value:function(e){return e*Math.PI/180}},{key:"calcCrow",value:function(e,t,a,r){var n=this.toRad(a-e),l=this.toRad(r-t),o=(e=this.toRad(e),a=this.toRad(a),Math.sin(n/2)*Math.sin(n/2)+Math.sin(l/2)*Math.sin(l/2)*Math.cos(e)*Math.cos(a));return 2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))*6371}},{key:"formatDistance",value:function(e,t){return this.state.currLat>0&&this.state.currLng>0&&t.lat>0&&t.lng>0?this.calcCrow(this.state.currLat,this.state.currLng,t.lat,t.lng).toFixed(1)+" km":""}},{key:"sortDistance",value:function(e,t,a){var r=this.state.currLat>0&&this.state.currLng>0&&e.lat>0&&e.lng>0?this.calcCrow(this.state.currLat,this.state.currLng,e.lat,e.lng):0,n=this.state.currLat>0&&this.state.currLng>0&&t.lat>0&&t.lng>0?this.calcCrow(this.state.currLat,this.state.currLng,t.lat,t.lng):0;return"asc"===a?r<n?-1:r>n?1:0:r<n?1:r>n?-1:0}},{key:"render",value:function(){if(!this.state||!this.state.areas)return l.default.createElement("center",null,l.default.createElement(p.default,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return l.default.createElement("span",null,l.default.createElement("h3",null,this.state.error.status),this.state.error.toString());var e=this.state.areas.filter(function(e){return 0!=e.lat&&0!=e.lng}).map(function(e){return{lat:e.lat,lng:e.lng,title:e.name,label:e.name.charAt(0),url:"/area/"+e.id}}),t=e.length>0?l.default.createElement(d.default,{markers:e,defaultCenter:h.default.getDefaultCenter(),defaultZoom:h.default.getDefaultZoom()}):null;return l.default.createElement("span",null,l.default.createElement(u.Breadcrumb,null,f.default.isAdmin()?l.default.createElement(u.OverlayTrigger,{placement:"top",overlay:l.default.createElement(u.Tooltip,{id:-1},"Add area")},l.default.createElement("div",{style:{float:"right"}},l.default.createElement(c.LinkContainer,{to:"/area/edit/-1"},l.default.createElement(u.Button,{bsStyle:"primary",bsSize:"xsmall"},l.default.createElement(p.default,{icon:"plus-square",inverse:!0}))))):null,l.default.createElement(o.Link,{to:"/"},"Home")," / ",l.default.createElement("font",{color:"#777"},"Browse")),t,l.default.createElement(s.BootstrapTable,{data:this.state.areas,condensed:!0,hover:!0,columnFilter:!1},l.default.createElement(s.TableHeaderColumn,{dataField:"id",isKey:!0,hidden:!0},"id"),l.default.createElement(s.TableHeaderColumn,{dataField:"name",dataSort:!0,dataFormat:this.formatName.bind(this),width:"150",filter:{type:"TextFilter",placeholder:"Filter"}},"Name"),l.default.createElement(s.TableHeaderColumn,{dataField:"numSectors",dataSort:!0,dataAlign:"center",width:"50"},"#sectors"),l.default.createElement(s.TableHeaderColumn,{dataField:"numProblems",dataSort:!0,dataAlign:"center",width:"50"},"#problems"),l.default.createElement(s.TableHeaderColumn,{dataField:"distance",dataSort:!0,dataFormat:this.formatDistance.bind(this),sortFunc:this.sortDistance.bind(this),dataAlign:"center",width:"60"},l.default.createElement(p.default,{icon:"plane"}))))}}]),t}();t.default=g},302:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),l=s(n),o=a(133),i=a(303),u=s(a(336));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return navigator.geolocation.getCurrentPosition(function(e){a.setState({currLat:e.coords.latitude,currLng:e.coords.longitude})}),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"handleOnClick",value:function(e){this.setState({pushUrl:e})}},{key:"render",value:function(){var e=this;if(this.state&&this.state.pushUrl)return l.default.createElement(o.Redirect,{to:this.state.pushUrl,push:!0});var t=null;this.props.markers&&(t=this.props.markers.map(function(t,a){return l.default.createElement(i.Marker,{icon:t.icon,key:a,position:{lat:t.lat,lng:t.lng},label:t.label,title:t.title,clickable:!0,onClick:e.handleOnClick.bind(e,t.url)})})),this.state&&this.state.currLat&&this.state.currLng&&this.state.currLat>0&&this.state.currLng>0&&t.push(l.default.createElement(i.Marker,{key:-1,icon:"https://maps.gstatic.com/mapfiles/markers2/measle_blue.png",position:{lat:this.state.currLat,lng:this.state.currLng}}));var a=null;this.props.polygons&&(a=this.props.polygons.map(function(t,a){return l.default.createElement(i.Polygon,{key:a,paths:t.triangleCoords,options:{strokeColor:"#FF3300",strokeOpacity:"0.5",strokeWeight:"2",fillColor:"#FF3300",fillOpacity:"0.15"},onClick:e.handleOnClick.bind(e,t.url)})}));var r=(0,i.withGoogleMap)(function(r){return l.default.createElement(i.GoogleMap,{defaultZoom:e.props.defaultZoom,defaultCenter:e.props.defaultCenter,defaultMapTypeId:google.maps.MapTypeId.TERRAIN},l.default.createElement(u.default,{averageCenter:!1,minimumClusterSize:60,enableRetinaIcons:!1,imagePath:"https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m",gridSize:60},t,a))});return l.default.createElement("section",{style:{height:"600px"}},l.default.createElement(r,{containerElement:l.default.createElement("div",{style:{height:"100%"}}),mapElement:l.default.createElement("div",{style:{height:"100%"}})}))}}]),t}();t.default=c}}]);
//# sourceMappingURL=22.index.js.map