(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{598:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(1),s=f(r),l=a(132),o=a(258),u=f(a(190)),i=a(256),d=f(a(259)),c=f(a(189)),m=f(a(192));function f(e){return e&&e.__esModule?e:{default:e}}a(191);var h=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),n(t,[{key:"componentWillMount",value:function(){d.default.loggedIn()||this.setState({pushUrl:"/login"})}},{key:"componentDidMount",value:function(){var e=this;u.default.get(c.default.getUrl("users/edit?regionId="+c.default.getRegion()+"&id="+this.props.match.params.userId)).withCredentials().end(function(t,a){t?e.setState({message:s.default.createElement(i.Panel,{bsStyle:"danger"},t.toString())}):(e.setState({id:a.body.id,username:a.body.username,firstname:a.body.firstname,lastname:a.body.lastname,currentPassword:null,newPassword:null,newPassword2:null,message:null}),document.title=c.default.getTitle("Edit "+a.body.firstname+" "+a.body.lastname))})}},{key:"save",value:function(e){var t=this;e.preventDefault(),"error"===this.validateFirstname(null)?this.setState({message:s.default.createElement(i.Panel,{bsStyle:"danger"},"Invalid firstname.")}):"error"===this.validateLastname(null)?this.setState({message:s.default.createElement(i.Panel,{bsStyle:"danger"},"Invalid lastname.")}):"error"===this.validateUsername(null)?this.setState({message:s.default.createElement(i.Panel,{bsStyle:"danger"},"Invalid username.")}):"error"===this.validateCurrentPassword(null)||"error"===this.validateNewPassword(null)||"error"===this.validateNewPassword2(null)?this.setState({message:s.default.createElement(i.Panel,{bsStyle:"danger"},"Invalid password.")}):u.default.post(c.default.getUrl("users/edit")).withCredentials().send({regionId:c.default.getRegion(),id:this.state.id,username:this.state.username,firstname:this.state.firstname,lastname:this.state.lastname,currentPassword:this.state.currentPassword,newPassword:this.state.newPassword}).set("Accept","application/json").end(function(e,a){e?t.setState({message:s.default.createElement(i.Panel,{bsStyle:"danger"},e.toString())}):t.setState({pushUrl:"/user"})})}},{key:"onCancel",value:function(){window.history.back()}},{key:"onFirstnameChanged",value:function(e){this.setState({firstname:e.target.value})}},{key:"onLastnameChanged",value:function(e){this.setState({lastname:e.target.value})}},{key:"onUsernameChanged",value:function(e){this.setState({username:e.target.value})}},{key:"onCurrentPasswordChanged",value:function(e){this.setState({currentPassword:e.target.value})}},{key:"onNewPasswordChanged",value:function(e){this.setState({newPassword:e.target.value})}},{key:"onConfirmNewPasswordChanged",value:function(e){this.setState({newPassword2:e.target.value})}},{key:"validateFirstname",value:function(){return this.state.firstname.length<1?"error":"success"}},{key:"validateLastname",value:function(){return this.state.lastname.length<1?"error":"success"}},{key:"validateUsername",value:function(){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.username)?"success":"error"}},{key:"validateCurrentPassword",value:function(){return"success"}},{key:"validateNewPassword",value:function(){return!this.state.currentPassword&&!this.state.newPassword2||this.state.newPassword?this.state.newPassword&&this.state.newPassword.length<8?"error":"success":"error"}},{key:"validateNewPassword2",value:function(){return!this.state.currentPassword&&!this.state.newPassword||this.state.newPassword2?this.state.newPassword2&&this.state.newPassword2.length<8?"error":this.state.newPassword2&&this.state.newPassword!=this.state.newPassword2?"error":"success":"error"}},{key:"render",value:function(){return this.state?this.state.pushUrl?s.default.createElement(o.Redirect,{to:this.state.pushUrl,push:!0}):s.default.createElement("span",null,s.default.createElement(i.Breadcrumb,null,s.default.createElement(l.Link,{to:"/"},"Home")," / ",s.default.createElement("font",{color:"#777"},"User edit")),s.default.createElement(i.Well,null,this.state.message,s.default.createElement("form",{onSubmit:this.save.bind(this)},s.default.createElement(i.FormGroup,{controlId:"formControlsFirstname",validationState:this.validateFirstname()},s.default.createElement(i.ControlLabel,null,"Firstname"),s.default.createElement(i.FormControl,{type:"text",value:this.state.firstname,placeholder:"Enter firstname",onChange:this.onFirstnameChanged.bind(this)}),s.default.createElement(i.FormControl.Feedback,null)),s.default.createElement(i.FormGroup,{controlId:"formControlsLastname",validationState:this.validateLastname()},s.default.createElement(i.ControlLabel,null,"Lastname"),s.default.createElement(i.FormControl,{type:"text",value:this.state.lastname,placeholder:"Enter lastname",onChange:this.onLastnameChanged.bind(this)}),s.default.createElement(i.FormControl.Feedback,null)),s.default.createElement(i.FormGroup,{controlId:"formControlsUsername",validationState:this.validateUsername()},s.default.createElement(i.ControlLabel,null,"Username"),s.default.createElement(i.FormControl,{type:"email",value:this.state.username,placeholder:"Enter username",onChange:this.onUsernameChanged.bind(this)}),s.default.createElement(i.FormControl.Feedback,null),s.default.createElement(i.HelpBlock,null,"You must enter a valid email address.")),s.default.createElement("hr",null),s.default.createElement("h4",null,"Only fill following fields if you want to change your password"),s.default.createElement(i.FormGroup,{controlId:"formControlsCurrentPassword",validationState:this.validateCurrentPassword()},s.default.createElement(i.ControlLabel,null,"Current password"),s.default.createElement(i.FormControl,{type:"password",placeholder:"Enter current password",onChange:this.onCurrentPasswordChanged.bind(this)})),s.default.createElement(i.FormGroup,{controlId:"formControlsNewPassword",validationState:this.validateNewPassword()},s.default.createElement(i.ControlLabel,null,"New password"),s.default.createElement(i.FormControl,{type:"password",placeholder:"Enter new password",onChange:this.onNewPasswordChanged.bind(this)}),s.default.createElement(i.FormControl.Feedback,null),s.default.createElement(i.HelpBlock,null,"At least 8 characters.")),s.default.createElement(i.FormGroup,{controlId:"formControlsNewPassword2",validationState:this.validateNewPassword2()},s.default.createElement(i.ControlLabel,null,"Confirm new password"),s.default.createElement(i.FormControl,{type:"password",placeholder:"Confirm new password",onChange:this.onConfirmNewPasswordChanged.bind(this)}),s.default.createElement(i.FormControl.Feedback,null),s.default.createElement(i.HelpBlock,null,"Must match new password.")),s.default.createElement(i.ButtonGroup,null,s.default.createElement(i.Button,{bsStyle:"danger",onClick:this.onCancel.bind(this)},"Cancel"),s.default.createElement(i.Button,{type:"submit",bsStyle:"success"},"Save"))))):s.default.createElement("center",null,s.default.createElement(m.default,{icon:"spinner",spin:!0,size:"3x"}))}}]),t}();t.default=h}}]);
//# sourceMappingURL=7.index.js.map