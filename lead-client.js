(function(root){
 const api={async send(endpoint,payload,fetcher=fetch){
  if(!endpoint)throw new Error('Endpoint not configured');
  const response=await fetcher(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(30000)});
  const data=await response.json();
  if(response.ok && data.ok===true)return {ok:true};
  return {ok:false,message:response.status===202?'Заявка ожидает подтверждения доставки. Повторно заполнять форму не нужно.':response.status===429?'Лимит демонстрации достигнут. Напишите нам на a.ivanov@retaildesk.tech.':'Доставка не подтверждена. Данные остались в форме. Повторите проверку или напишите на a.ivanov@retaildesk.tech.'};
 }};root.RetailDeskLeads=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
