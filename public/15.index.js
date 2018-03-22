(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{59:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(1),a=c(r),s=(n(15),n(91)),i=c(n(81)),l=n(84),u=(c(n(83)),c(n(79))),d=c(n(30));function c(e){return e&&e.__esModule?e:{default:e}}n(29);var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return document.title=u.default.getTitle()+" | Reset password",n.state={password:"",password2:""},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"componentDidMount",value:function(){this.setState({token:this.props.match.params.token})}},{key:"recover",value:function(e){var t=this;e.preventDefault(),"error"===this.validatePassword(null)||"error"===this.validatePassword2(null)?this.setState({message:a.default.createElement(l.Panel,{bsStyle:"danger"},"Invalid password.")}):i.default.get(u.default.getUrl("users/password?token="+this.state.token+"&password="+this.state.password)).withCredentials().end(function(e,n){e?t.setState({error:e}):t.setState({error:null,pushUrl:"/login"})})}},{key:"onPasswordChanged",value:function(e){this.setState({password:e.target.value})}},{key:"onConfirmPasswordChanged",value:function(e){this.setState({password2:e.target.value})}},{key:"validatePassword",value:function(){return this.state.password.length<8?"error":"success"}},{key:"validatePassword2",value:function(){return this.state.password2.length<8||this.state.password!=this.state.password2?"error":"success"}},{key:"render",value:function(){return this.state.token?this.state.error?a.default.createElement("span",null,a.default.createElement("h3",null,this.state.error.status),this.state.error.toString()):this.state.pushUrl?a.default.createElement(s.Redirect,{to:this.state.pushUrl,push:!0}):a.default.createElement(l.Well,null,a.default.createElement("form",{onSubmit:this.recover.bind(this)},a.default.createElement(l.FormGroup,{controlId:"formControlsPassword",validationState:this.validatePassword()},a.default.createElement(l.ControlLabel,null,"New password"),a.default.createElement(l.FormControl,{type:"password",placeholder:"Enter new password",onChange:this.onPasswordChanged.bind(this)}),a.default.createElement(l.FormControl.Feedback,null),a.default.createElement(l.HelpBlock,null,"At least 8 characters.")),a.default.createElement(l.FormGroup,{controlId:"formControlsPassword2",validationState:this.validatePassword2()},a.default.createElement(l.ControlLabel,null,"Confirm new password"),a.default.createElement(l.FormControl,{type:"password",placeholder:"Confirm new password",onChange:this.onConfirmPasswordChanged.bind(this)}),a.default.createElement(l.FormControl.Feedback,null),a.default.createElement(l.HelpBlock,null,"Must match password field.")),a.default.createElement(l.ButtonGroup,null,a.default.createElement(l.Button,{type:"submit",bsStyle:"success"},"Reset password")))):a.default.createElement("center",null,a.default.createElement(d.default,{icon:"spinner",spin:!0,size:"3x"}))}}]),t}();t.default=f},79:function(e,t,n){"use strict";e.exports={getUrl:function(e){return"buldring.bergen-klatreklubb.no"==window.location.hostname?"https://buldring.bergen-klatreklubb.no/com.buldreinfo.jersey.jaxb/v1/"+e:"buldring.fredrikstadklatreklubb.org"==window.location.hostname?"https://buldring.fredrikstadklatreklubb.org/com.buldreinfo.jersey.jaxb/v1/"+e:"brattelinjer.no"==window.location.hostname?"https://brattelinjer.no/com.buldreinfo.jersey.jaxb/v1/"+e:"dev.jossi.org"==window.location.hostname?"https://dev.jossi.org/com.buldreinfo.jersey.jaxb/v1/"+e:"https://buldreinfo.com/com.buldreinfo.jersey.jaxb/v1/"+e},getTitle:function(){return"buldring.bergen-klatreklubb.no"==window.location.hostname?"Buldring i Hordaland":"buldring.fredrikstadklatreklubb.org"==window.location.hostname?"Buldring i Fredrikstad":"brattelinjer.no"==window.location.hostname?"Bratte linjer":"dev.jossi.org"==window.location.hostname?"Bratte linjer (dev)":"buldreinfo"},getRegion:function(){return"buldring.bergen-klatreklubb.no"==window.location.hostname?"2":"buldring.fredrikstadklatreklubb.org"==window.location.hostname?"3":"brattelinjer.no"==window.location.hostname?"4":"dev.jossi.org"==window.location.hostname?"4":"1"},getDefaultCenter:function(){return"buldring.bergen-klatreklubb.no"==window.location.hostname?{lat:60.47521,lng:6.83169}:"buldring.fredrikstadklatreklubb.org"==window.location.hostname?{lat:59.22844,lng:10.91722}:{lat:58.78119,lng:5.86361}},getDefaultZoom:function(){return"brattelinjer.no"==window.location.hostname?9:"dev.jossi.org"==window.location.hostname?9:7},convertFromDateToString:function(e){var t=e.getDate(),n=e.getMonth()+1;return e.getFullYear()+"-"+(n<=9?"0"+n:n)+"-"+(t<=9?"0"+t:t)}}},83:function(e,t,n){"use strict";var o=s(n(87)),r=s(n(81)),a=s(n(79));function s(e){return e&&e.__esModule?e:{default:e}}e.exports={login:function(e,t,n){var s=this;n=arguments[arguments.length-1],function(e,t,n){setTimeout(function(){r.default.post(a.default.getUrl("users/login")).type("form").withCredentials().send({username:e}).send({password:t}).send({regionId:a.default.getRegion()}).set("Accept","application/json").end(function(e,t){if(e)console.log(e),n({authenticated:!1,admin:!1,superadmin:!1});else{var o=parseInt(t.text);n({authenticated:!0,admin:o>=1,superadmin:2===o})}})},0)}(e,t,function(e){e.authenticated?(o.default.setItem("buldreinfo_is_admin",e.admin),o.default.setItem("buldreinfo_is_super_admin",e.superadmin),n&&n(!0),s.onChange(!0)):(n&&n(!1),s.onChange(!1))})},getToken:function(){return o.default.getItem("buldreinfo")},logout:function(e){var t=this;r.default.get(a.default.getUrl("logout")).withCredentials().end(function(n,r){n?console.log(n):console.log("Logged out"),o.default.removeItem("buldreinfo"),e&&e(),t.onChange(!1)})},loggedIn:function(){return o.default.hasItem("buldreinfo")},isAdmin:function(){return!!o.default.hasItem("buldreinfo_is_admin")&&"true"==o.default.getItem("buldreinfo_is_admin")},isSuperAdmin:function(){return!!o.default.hasItem("buldreinfo_is_super_admin")&&"true"==o.default.getItem("buldreinfo_is_super_admin")},onChange:function(){}}},87:function(e,t,n){"use strict";var o={getItem:function(e){return e&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},setItem:function(e,t,n,o,r,a){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+s+(r?"; domain="+r:"")+(o?"; path="+o:"")+(a?"; secure":""),!0},removeItem:function(e,t,n){return!!this.hasItem(e)&&(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(t?"; path="+t:""),!0)},hasItem:function(e){return!!e&&new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),t=e.length,n=0;n<t;n++)e[n]=decodeURIComponent(e[n]);return e}};e.exports=o},91:function(e,t,n){"use strict";n.r(t);var o=n(21);n.d(t,"MemoryRouter",function(){return o.a});var r=n(20);n.d(t,"Prompt",function(){return r.a});var a=n(16);n.d(t,"Redirect",function(){return a.a});var s=n(7);n.d(t,"Route",function(){return s.a});var i=n(6);n.d(t,"Router",function(){return i.a});var l=n(19);n.d(t,"StaticRouter",function(){return l.a});var u=n(18);n.d(t,"Switch",function(){return u.a});var d=n(5);n.d(t,"matchPath",function(){return d.a});var c=n(17);n.d(t,"withRouter",function(){return c.a})}}]);
//# sourceMappingURL=15.index.js.map