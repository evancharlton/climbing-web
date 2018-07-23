(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{615:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),n=r(1),o=b(n),l=b(r(261)),i=r(135),u=r(258),s=b(r(191)),d=b(r(757)),p=b(r(756)),c=b(r(755)),f=b(r(134)),m=b(r(193));function b(e){return e&&e.__esModule?e:{default:e}}r(192);var h=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),a(t,[{key:"componentDidMount",value:function(){var e=this;s.default.get(f.default.getUrl("frontpage?regionId="+f.default.getRegion())).withCredentials().end(function(t,r){e.setState({error:t||null,data:t?null:r.body})})}},{key:"render",value:function(){if(!this.state)return o.default.createElement("center",null,o.default.createElement(m.default,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return o.default.createElement("span",null,o.default.createElement("h3",null,this.state.error.status),this.state.error.toString());var e=this.state.data.fas.map(function(e,t){return o.default.createElement("p",{key:t},o.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem)," ",e.grade,o.default.createElement("br",null),o.default.createElement("small",{style:{color:"#777"}},o.default.createElement(i.Link,{to:"/area/"+e.idArea,style:{color:"#777"}},e.area)," / ",o.default.createElement(i.Link,{to:"/sector/"+e.idSector,style:{color:"#777"}},e.sector)," ",e.date))}),t=this.state.data.ascents.map(function(e,t){return o.default.createElement("p",{key:t},o.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem)," ",e.grade,o.default.createElement("br",null),o.default.createElement("small",{style:{color:"#777"}},o.default.createElement(i.Link,{to:"/user/"+e.idUser,style:{color:"#777"}},e.user)," ",e.date))}),r=this.state.data.medias.map(function(e,t){var r="image"===e.type?o.default.createElement(m.default,{icon:"camera"}):o.default.createElement(m.default,{icon:"video"});return o.default.createElement("p",{key:t},o.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem)," ",o.default.createElement("small",null,e.grade)," ",r)}),a=this.state.data.comments.map(function(e,t){return o.default.createElement("p",{key:t},o.default.createElement("small",null,e.date)," ",o.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem))});return o.default.createElement("span",null,o.default.createElement(l.default,null,o.default.createElement("title",null,f.default.getTitle())),o.default.createElement(u.Grid,null,o.default.createElement(u.Row,null,o.default.createElement(u.Well,{style:{textAlign:"center"}},"Total: ",this.state.data.numProblems," (",this.state.data.numProblemsWithCoordinates," with coordinates",this.state.data.numProblemsWithTopo>0?", "+this.state.data.numProblemsWithTopo+" on topo":"",") | Public ascents: ",this.state.data.numTicks," | Images: ",this.state.data.numImages," | Ascents on video: ",this.state.data.numMovies)),o.default.createElement(u.Row,null,o.default.createElement(u.Col,{xs:8,md:9,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(p.default,{data:this.state.data.randomMedia})),o.default.createElement(u.Col,{xs:4,md:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(c.default,null))),o.default.createElement(u.Row,null,o.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(d.default,{title:"Newest",data:e})),o.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(d.default,{title:"Latest ascents",data:t})),o.default.createElement(u.Clearfix,{visibleXsBlock:!0}),o.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(d.default,{title:"Newest media",data:r})),o.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(d.default,{title:"Latest comments",data:a})))))}}]),t}();t.default=h},755:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),n=r(1),o=i(n),l=(r(135),i(r(134)));function i(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),a(t,[{key:"render",value:function(){return o.default.createElement("div",null,l.default.isBouldering()&&o.default.createElement("a",{href:"https://play.google.com/store/apps/details?id=org.jossi.android.bouldering&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",target:"_blank"},o.default.createElement("img",{style:{maxWidth:"100%"},alt:"Get it on Google Play",src:"https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"})),1==l.default.getRegion()&&o.default.createElement("a",{href:"http://sissportssenter.no/",target:"_blank"},o.default.createElement("img",{style:{marginBottom:"10px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",paddingLeft:"10px",paddingRight:"10px",maxWidth:"100%",backgroundColor:"#00A0E0"},src:"/png/sis-sportssenter.png",alt:"SiS Sportssenter"})),(1==l.default.getRegion()||4==l.default.getRegion())&&o.default.createElement("a",{href:"http://brv.no/",target:"_blank"},o.default.createElement("img",{style:{marginBottom:"10px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",paddingLeft:"10px",paddingRight:"10px",maxWidth:"100%",backgroundColor:"#FFFFFF"},src:"/png/brv.png",alt:"Bratte Rogalands venner"})))}}]),t}();t.default=u},756:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),n=r(1),o=s(n),l=r(135),i=r(258),u=s(r(134));function s(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),a(t,[{key:"render",value:function(){var e=null;return this.props&&this.props.data?(e=this.props.data.inPhoto?o.default.createElement("i",null,"Photographer: ",o.default.createElement(l.Link,{to:"/user/"+this.props.data.idCreator},this.props.data.creator),", in photo: ",this.props.data.inPhoto):o.default.createElement("i",null,"Photographer: ",o.default.createElement(l.Link,{to:"/user/"+this.props.data.idCreator},this.props.data.creator)),o.default.createElement(i.Well,{style:{marginBottom:"15px",textAlign:"center"}},o.default.createElement("h4",null,o.default.createElement(l.Link,{to:"/problem/"+this.props.data.idProblem},this.props.data.problem)," ",this.props.data.grade),o.default.createElement(l.Link,{to:"/problem/"+this.props.data.idProblem},o.default.createElement("img",{style:{maxWidth:"100%"},src:u.default.getUrl("images?id="+this.props.data.idMedia+"&targetHeight=480"),alt:this.props.data.problem})),o.default.createElement("br",null),e)):o.default.createElement(i.Well,{style:{marginBottom:"15px",textAlign:"center"}},"No data")}}]),t}();t.default=d},757:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=r(1),l=(a=o)&&a.__esModule?a:{default:a},i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={showAll:!1,btnLabel:"More"},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),n(t,[{key:"handleOnClick",value:function(e){e.preventDefault(),!0===this.state.showAll?this.setState({showAll:!1,btnLabel:"More"}):this.setState({showAll:!0,btnLabel:"Less"})}},{key:"render",value:function(){var e=!0===this.state.showAll?this.props.data:this.props.data.map(function(e,t){if(t<10)return e});return l.default.createElement("div",{style:{backgroundColor:"#FFF",position:"relative",padding:"45px 15px 15px",borderColor:"#e3e3e3",borderStyle:"solid",borderWidth:"1px",borderTopLeftRadius:"4px",borderTopRightRadius:"4px",borderBottomLeftRadius:"4px"}},e,l.default.createElement("div",{style:{position:"absolute",top:"15px",left:"15px",fontSize:"12px",fontWeight:"700",color:"#959595",textTransform:"uppercase",letterSpacing:"1px"}},this.props.title),l.default.createElement("a",{style:{float:"right",display:"inline-block",position:"relative",right:"-16px",top:"15px",background:"#FFF",borderBottomLeftRadius:"4px",borderBottomRightRadius:"4px",border:"1px solid #e3e3e3",borderTop:"none",padding:"4px 8px",marginBottom:"20px"},href:"#",onClick:this.handleOnClick.bind(this)},this.state.btnLabel))}}]),t}();t.default=i}}]);
//# sourceMappingURL=19.index.js.map