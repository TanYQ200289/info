import{_ as t}from"./u-icon.f076fea3.js";import{C as e,D as i,E as o,r as s,o as a,c as r,w as n,m as d,a as m,b as p,t as l,G as u,H as y,f as c,e as f,i as h}from"./index.37bf5aad.js";import{r as S}from"./uni-app.es.d259472c.js";import{_ as g}from"./plugin-vue_export-helper.21dcd24c.js";var x=g({name:"u-empty",mixins:[i,o,{props:{icon:{type:String,default:e.empty.icon},text:{type:String,default:e.empty.text},textColor:{type:String,default:e.empty.textColor},textSize:{type:[String,Number],default:e.empty.textSize},iconColor:{type:String,default:e.empty.iconColor},iconSize:{type:[String,Number],default:e.empty.iconSize},mode:{type:String,default:e.empty.mode},width:{type:[String,Number],default:e.empty.width},height:{type:[String,Number],default:e.empty.height},show:{type:Boolean,default:e.empty.show},marginTop:{type:[String,Number],default:e.empty.marginTop}}}],data:()=>({icons:{car:"购物车为空",page:"页面不存在",search:"没有搜索结果",address:"没有收货地址",wifi:"没有WiFi",order:"订单为空",coupon:"没有优惠券",favor:"暂无收藏",permission:"无权限",history:"无历史记录",news:"无新闻列表",message:"消息列表为空",list:"列表为空",data:"数据为空",comment:"暂无评论"}}),computed:{emptyStyle(){const t={};return t.marginTop=uni.$u.addUnit(this.marginTop),uni.$u.deepMerge(uni.$u.addStyle(this.customStyle),t)},textStyle(){const t={};return t.color=this.textColor,t.fontSize=uni.$u.addUnit(this.textSize),t},isSrc(){return this.icon.indexOf("/")>=0}}},[["render",function(e,i,o,g,x,_){const w=S(s("u-icon"),t),$=c,z=f,b=h;return e.show?(a(),r(b,{key:0,class:"u-empty",style:d([_.emptyStyle])},{default:n((()=>[_.isSrc?(a(),r($,{key:1,style:d({width:e.$u.addUnit(e.width),height:e.$u.addUnit(e.height)}),src:e.icon,mode:"widthFix"},null,8,["style","src"])):(a(),r(w,{key:0,name:"message"===e.mode?"chat":`empty-${e.mode}`,size:e.iconSize,color:e.iconColor,"margin-top":"14"},null,8,["name","size","color"])),m(z,{class:"u-empty__text",style:d([_.textStyle])},{default:n((()=>[p(l(e.text?e.text:x.icons[e.mode]),1)])),_:1},8,["style"]),e.$slots.default||e.$slots.$default?(a(),r(b,{key:2,class:"u-empty__wrap"},{default:n((()=>[u(e.$slots,"default",{},void 0,!0)])),_:3})):y("",!0)])),_:3},8,["style"])):y("",!0)}],["__scopeId","data-v-b328f456"]]);export{x as _};
