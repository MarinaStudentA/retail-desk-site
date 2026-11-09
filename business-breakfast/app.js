'use strict';
const dialog=document.querySelector('#legal-dialog');
document.querySelectorAll('[data-document]').forEach(button=>button.addEventListener('click',()=>{const doc=window.RetailDeskDocuments[button.dataset.document];document.querySelector('#legal-title').textContent=doc.title;document.querySelector('#legal-content').innerHTML=doc.content;dialog.showModal();}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const form=document.querySelector('#registration-form'),status=document.querySelector('#form-status'),submit=form.querySelector('[type=submit]');
let requestId=null,lastBody=null,busy=false;
form.addEventListener('submit',async e=>{e.preventDefault();if(busy||!form.reportValidity())return;
 const values=Object.fromEntries(new FormData(form));values.consent=form.elements.consent.checked;
 const data=BreakfastForm.build(values,'');
 const body=JSON.stringify(data);if(body!==lastBody){requestId=crypto.randomUUID();lastBody=body;}data.requestId=requestId;
 busy=true;submit.disabled=true;status.textContent='Отправляем заявку…';
 try{const result=await RetailDeskLeads.send(window.RETAIL_DESK_API,data);
 if(result.ok){status.textContent='Спасибо! Заявка получена. Организаторы рассмотрят её и отправят подтверждение участия на вашу почту.';form.reset();lastBody=null;requestId=null;}
 else status.textContent=result.message;
 }catch{status.textContent='Не удалось подтвердить отправку. Данные сохранены в форме. Попробуйте ещё раз или напишите на a.ivanov@retaildesk.tech.';}
 finally{busy=false;submit.disabled=false;}
});
