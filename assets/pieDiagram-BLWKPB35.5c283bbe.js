import{p as W}from"./chunk-BAOP5US2.145a6b68.js";import{aw as N,A as U,B as q,g as V,h as Z,k as H,i as J,_ as i,t as C,F as K,n as Q,ax as X,a_ as Y,b0 as ee,b1 as z,b2 as te,u as ae,b3 as re}from"./vendor.579cef01.js";import{p as ie}from"./mermaid-parser.core.bf06b5f7.js";import"./_basePickBy.910bca03.js";import"./_baseUniq.0f22fd68.js";import"./clone.f754b9c6.js";var F=N.pie,D={sections:new Map,showData:!1,config:F},m=D.sections,y=D.showData,se=structuredClone(F),ne=i(()=>structuredClone(se),"getConfig"),oe=i(()=>{m=new Map,y=D.showData,K()},"clear"),le=i(({label:e,value:a})=>{m.has(e)||(m.set(e,a),C.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),ce=i(()=>m,"getSections"),pe=i(e=>{y=e},"setShowData"),de=i(()=>y,"getShowData"),P={getConfig:ne,clear:oe,setDiagramTitle:U,getDiagramTitle:q,setAccTitle:V,getAccTitle:Z,setAccDescription:H,getAccDescription:J,addSection:le,getSections:ce,setShowData:pe,getShowData:de},ge=i((e,a)=>{W(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),fe={parse:i(async e=>{const a=await ie("pie",e);C.debug(a),ge(a,P)},"parse")},ue=i(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),he=ue,me=i(e=>{const a=[...e.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,l)=>l.value-s.value);return re().value(s=>s.value)(a)},"createPieArcs"),ve=i((e,a,G,s)=>{C.debug(`rendering pie chart
`+e);const l=s.db,b=Q(),T=X(l.getConfig(),b.pie),$=40,n=18,g=4,c=450,v=c,S=Y(a),p=S.append("g");p.attr("transform","translate("+v/2+","+c/2+")");const{themeVariables:r}=b;let[f]=ee(r.pieOuterStrokeWidth);f!=null||(f=2);const A=T.textPosition,u=Math.min(v,c)/2-$,O=z().innerRadius(0).outerRadius(u),M=z().innerRadius(u*A).outerRadius(u*A);p.append("circle").attr("cx",0).attr("cy",0).attr("r",u+f/2).attr("class","pieOuterCircle");const _=l.getSections(),x=me(_),R=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],d=te(R);p.selectAll("mySlices").data(x).enter().append("path").attr("d",O).attr("fill",t=>d(t.data.label)).attr("class","pieCircle");let k=0;_.forEach(t=>{k+=t}),p.selectAll("mySlices").data(x).enter().append("text").text(t=>(t.data.value/k*100).toFixed(0)+"%").attr("transform",t=>"translate("+M.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(l.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const w=p.selectAll(".legend").data(d.domain()).enter().append("g").attr("class","legend").attr("transform",(t,o)=>{const h=n+g,B=h*d.domain().length/2,I=12*n,L=o*h-B;return"translate("+I+","+L+")"});w.append("rect").attr("width",n).attr("height",n).style("fill",d).style("stroke",d),w.data(x).append("text").attr("x",n+g).attr("y",n-g).text(t=>{const{label:o,value:h}=t.data;return l.getShowData()?`${o} [${h}]`:o});const j=Math.max(...w.selectAll("text").nodes().map(t=>{var o;return(o=t==null?void 0:t.getBoundingClientRect().width)!=null?o:0})),E=v+$+n+g+j;S.attr("viewBox",`0 0 ${E} ${c}`),ae(S,c,E,T.useMaxWidth)},"draw"),Se={draw:ve},Te={parser:fe,db:P,renderer:Se,styles:he};export{Te as diagram};
