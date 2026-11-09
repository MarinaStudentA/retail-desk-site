(function(root){
 const api={build(values,requestId){return {requestId,event:'business-breakfast',name:values.name.trim(),email:values.email.trim(),company:values.company.trim(),position:values.position.trim(),phone:'',message:values.message.trim(),website:values.website||'',consent:values.consent===true,consentVersion:'2026-11-02'};}};
 root.BreakfastForm=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
