import{S as Y,i as Z,s as ee,k as v,q as x,a as B,l as p,m as g,r as A,h,c as H,n as E,b as U,F as t,A as M,K as te,u as K}from"../../../chunks/index-549be724.js";import{u as C}from"../../../chunks/utils-c14c6f14.js";function Q(u,e,l){const a=u.slice();return a[4]=e[l],a[6]=l,a}function W(u){let e,l,a=u[6]+1+"",_,s,r,n,m=u[4].username+"",k,D,R,S=u[4].score+"",T,q;return{c(){e=v("tr"),l=v("td"),_=x(a),s=x("."),r=B(),n=v("td"),k=x(m),D=B(),R=v("td"),T=x(S),q=B(),this.h()},l(y){e=p(y,"TR",{});var i=g(e);l=p(i,"TD",{class:!0});var $=g(l);_=A($,a),s=A($,"."),$.forEach(h),r=H(i),n=p(i,"TD",{class:!0});var N=g(n);k=A(N,m),N.forEach(h),D=H(i),R=p(i,"TD",{class:!0});var O=g(R);T=A(O,S),O.forEach(h),q=H(i),i.forEach(h),this.h()},h(){E(l,"class","svelte-10xrrgn"),E(n,"class","svelte-10xrrgn"),E(R,"class","gold svelte-10xrrgn")},m(y,i){U(y,e,i),t(e,l),t(l,_),t(l,s),t(e,r),t(e,n),t(n,k),t(e,D),t(e,R),t(R,T),t(e,q)},p(y,i){i&1&&m!==(m=y[4].username+"")&&K(k,m),i&1&&S!==(S=y[4].score+"")&&K(T,S)},d(y){y&&h(e)}}}function X(u){let e,l,a,_;return{c(){e=v("p"),l=x("your score: "),a=v("span"),_=x(u[1]),this.h()},l(s){e=p(s,"P",{class:!0});var r=g(e);l=A(r,"your score: "),a=p(r,"SPAN",{class:!0});var n=g(a);_=A(n,u[1]),n.forEach(h),r.forEach(h),this.h()},h(){E(a,"class","gold svelte-10xrrgn"),E(e,"class","yourscore svelte-10xrrgn")},m(s,r){U(s,e,r),t(e,l),t(e,a),t(a,_)},p(s,r){r&2&&K(_,s[1])},d(s){s&&h(e)}}}function le(u){let e,l,a,_,s,r,n,m,k,D,R,S,T,q,y,i,$,N,O,F,P=u[0],d=[];for(let o=0;o<P.length;o+=1)d[o]=W(Q(u,P,o));let f=u[1]&&X(u);return{c(){e=v("div"),l=v("h1"),a=x("LEADERBOARD"),_=B(),s=v("table"),r=v("tr"),n=v("th"),m=x("Rank"),k=B(),D=v("th"),R=x("Name"),S=B(),T=v("th"),q=x("Score"),y=B();for(let o=0;o<d.length;o+=1)d[o].c();i=B(),f&&f.c(),$=B(),N=v("a"),O=v("button"),F=x("play"),this.h()},l(o){e=p(o,"DIV",{id:!0,class:!0});var b=g(e);l=p(b,"H1",{});var c=g(l);a=A(c,"LEADERBOARD"),c.forEach(h),_=H(b),s=p(b,"TABLE",{class:!0});var L=g(s);r=p(L,"TR",{});var J=g(r);n=p(J,"TH",{class:!0});var V=g(n);m=A(V,"Rank"),V.forEach(h),k=H(J),D=p(J,"TH",{class:!0});var j=g(D);R=A(j,"Name"),j.forEach(h),S=H(J),T=p(J,"TH",{class:!0});var w=g(T);q=A(w,"Score"),w.forEach(h),J.forEach(h),y=H(L);for(let I=0;I<d.length;I+=1)d[I].l(L);L.forEach(h),i=H(b),f&&f.l(b),$=H(b),N=p(b,"A",{href:!0});var z=g(N);O=p(z,"BUTTON",{class:!0});var G=g(O);F=A(G,"play"),G.forEach(h),z.forEach(h),b.forEach(h),this.h()},h(){E(n,"class","svelte-10xrrgn"),E(D,"class","svelte-10xrrgn"),E(T,"class","svelte-10xrrgn"),E(s,"class","svelte-10xrrgn"),E(O,"class","leaderboard"),E(N,"href","/"),E(e,"id","leaderboard"),E(e,"class","svelte-10xrrgn")},m(o,b){U(o,e,b),t(e,l),t(l,a),t(e,_),t(e,s),t(s,r),t(r,n),t(n,m),t(r,k),t(r,D),t(D,R),t(r,S),t(r,T),t(T,q),t(s,y);for(let c=0;c<d.length;c+=1)d[c].m(s,null);t(e,i),f&&f.m(e,null),t(e,$),t(e,N),t(N,O),t(O,F)},p(o,[b]){if(b&1){P=o[0];let c;for(c=0;c<P.length;c+=1){const L=Q(o,P,c);d[c]?d[c].p(L,b):(d[c]=W(L),d[c].c(),d[c].m(s,null))}for(;c<d.length;c+=1)d[c].d(1);d.length=P.length}o[1]?f?f.p(o,b):(f=X(o),f.c(),f.m(e,$)):f&&(f.d(1),f=null)},i:M,o:M,d(o){o&&h(e),te(d,o),f&&f.d()}}}function se(u,e,l){let a=[],_="";fetch(C.dburl+"leaderboard?select=*&apikey="+C.dbkey).then(n=>{n.text().then(m=>{l(0,a=JSON.parse(m)),console.log(a)})});let s=C.get_local("user_name"),r=C.dburl+`pirate_gambit_scores?select="score"&username=eq.${s}&apikey=${C.dbkey}`;return fetch(r).then(n=>n.text().then(m=>{console.log("personal score:",m);let k=JSON.parse(m)[0];k&&l(1,_=k.score)})),[a,_]}class oe extends Y{constructor(e){super(),Z(this,e,se,le,ee,{})}}export{oe as default};