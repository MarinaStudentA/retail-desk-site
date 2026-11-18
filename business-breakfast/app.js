'use strict';
const dialog=document.querySelector('#legal-dialog');
document.querySelectorAll('[data-document]').forEach(button=>button.addEventListener('click',()=>{const doc=window.RetailDeskDocuments[button.dataset.document];document.querySelector('#legal-title').textContent=doc.title;document.querySelector('#legal-content').innerHTML=doc.content;dialog.showModal();}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
