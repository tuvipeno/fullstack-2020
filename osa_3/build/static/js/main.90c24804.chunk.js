(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(14),r=n.n(a),o=n(0),u=n.n(o),c=n(4),l=n(2),i=function(e){return u.a.createElement("form",{onSubmit:e.submit},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:e.name,onChange:e.changeName})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:e.number,onChange:e.changeNumber})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},d=function(e){var t=e.person,n=e.deleteContact;return u.a.createElement("li",null,t.name," ",t.number,u.a.createElement("button",{onClick:n},"delete"))},m=function(e){var t=e.handleFilter;return u.a.createElement("div",null,"filter shown with",u.a.createElement("input",{onChange:t}))},f=n(3),s=n.n(f),b="/api/contacts",h=function(){return s.a.get(b)},g=function(e){return s.a.post(b,e)},p=function(e,t){return s.a.put("".concat(b,"/").concat(e),t).then((function(e){return e.data}))},v=function(e){return s.a.delete("".concat(b,"/").concat(e))},E=function(){var e=Object(o.useState)([]),t=Object(l.a)(e,2),n=t[0],a=t[1],r=Object(o.useState)(""),f=Object(l.a)(r,2),s=f[0],b=f[1],E=Object(o.useState)(""),w=Object(l.a)(E,2),j=w[0],O=w[1],y=Object(o.useState)(n),C=Object(l.a)(y,2),S=C[0],k=C[1],N=Object(o.useState)(null),T=Object(l.a)(N,2),L=T[0],B=T[1],D=Object(o.useState)(null),z=Object(l.a)(D,2),A=z[0],F=z[1];Object(o.useEffect)((function(){h().then((function(e){a(e.data),k(e.data)}))}),[]);var J=function(e,t){var r=Object(c.a)(Object(c.a)({},e),{},{number:t});p(e.id,r).then((function(t){a(n.map((function(n){return n.id!==e.id?n:t}))),k(n.map((function(n){return n.id!==e.id?n:t}))),b(""),O(""),B("Number updated for ".concat(e.name)),setTimeout((function(){B(null)}),5e3)})).catch((function(t){F("the person '".concat(e.name,"' was already deleted from server")),setTimeout((function(){F(null)}),5e3),k(n.filter((function(t){return t.id!==e.id})))}))},x=function(e){var t=e.message;return null===t?null:u.a.createElement("div",{style:{color:"red",fontSize:28,backgroundColor:"lightgrey",borderStyle:"solid",borderColor:"red",paddingLeft:5,marginBottom:5}},t)},I=function(e){var t=e.message;return null===t?null:u.a.createElement("div",{style:{color:"green",fontSize:28,backgroundColor:"lightgrey",borderStyle:"solid",borderColor:"green",paddingLeft:5,marginBottom:5}},t)};return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(I,{message:L}),u.a.createElement(x,{message:A}),u.a.createElement(m,{handleFilter:function(e){k(n.filter((function(t){return t.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),u.a.createElement("h3",null,"Add a new"),u.a.createElement(i,{submit:function(e){e.preventDefault();var t=n.find((function(e){return e.name===s})),r=n.find((function(e){return e.number===j}));if(void 0!==t&&window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?")))return J(t,j);if(void 0!==r)return window.alert("".concat(j," is already added to phonebook"));var o={name:s,number:j};g(o).then((function(e){a(n.concat(e.data)),k(S.concat(e.data)),b(""),O(""),B("Added ".concat(o.name)),setTimeout((function(){B(null)}),5e3)})).catch((function(e){console.log(e.response.data),F(e.message)})),setTimeout((function(){F(null)}),5e3)},name:s,changeName:function(e){b(e.target.value)},number:j,changeNumber:function(e){O(e.target.value)}}),u.a.createElement("h3",null,"Numbers"),u.a.createElement("ul",null,S.map((function(e,t){return u.a.createElement(d,{key:t,person:e,deleteContact:function(){return t=e.id,r=e.name,void(window.confirm("Delete ".concat(r,"?"))&&v(t).then((function(e){a(n.filter((function(e){return e.id!==t}))),k(n.filter((function(e){return e.id!==t}))),B("Deleted ".concat(r)),setTimeout((function(){B(null)}),5e3)})));var t,r}})}))))};r.a.render(u.a.createElement(E,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.90c24804.chunk.js.map