'use strict';
const formDialog = document.querySelector('#contact-dialog');
const documentDialog = document.querySelector('#document-dialog');
const detailDialog = document.querySelector('#detail-dialog');
const template = document.querySelector('#form-template');
for (const slot of document.querySelectorAll('[data-form-slot]')) {
  slot.append(template.content.cloneNode(true));
  const prefix = slot.dataset.formSlot;
  const heading = slot.querySelector('h3');
  heading.id = prefix === 'popup' ? 'popup-title' : 'inline-form-title';
  slot.querySelector('form').setAttribute('aria-labelledby', heading.id);
  for (const input of slot.querySelectorAll('input,textarea')) {
    input.id = `${prefix}-${input.name}`;
    const error = input.name === 'consent' ? slot.querySelector('.consent-error') : input.parentElement.querySelector('.field-error');
    if (error) {
      error.id = `${input.id}-error`;
      input.setAttribute('aria-describedby', error.id);
    }
  }
}
const docs = {
 company:{title:'Реквизиты компании',content:'<p><strong>ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ»</strong></p><p>ИНН 7743365131 · КПП 774301001 · ОГРН 1217700377290</p><p>г. Москва, Каширское шоссе, д. 3, к. 2, стр. 4</p><p><a href="mailto:a.ivanov@retaildesk.tech">a.ivanov@retaildesk.tech</a></p>'},
 policy:{title:'Обработка данных в демонстрационной форме',content:'<p>Оператор: ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ», ИНН 7743365131, ОГРН 1217700377290. Адрес: г. Москва, Каширское шоссе, д. 3, к. 2, стр. 4. Контакт: a.ivanov@retaildesk.tech.</p><p>Форма передаёт имя, email, добровольно заполненные телефон, компанию и описание задачи через временное HTTPS-соединение Cloudflare на компьютер, обслуживающий демонстрацию, затем в CRM WEEEK. На компьютере сохраняются заявка, время и версия согласия, статус доставки. Суммарный срок обработки — до завершения обращения, но не более одного года; при достижении цели или отзыве согласия раньше обработка прекращается при отсутствии иных законных оснований.</p><p>Демонстрационная форма использует внешний сервис Cloudflare. Российское размещение корпоративной почты и её резервных копий на HOSTKEY не означает, что все сервисы демонстрации находятся в России. Для показа рекомендуем вымышленные данные. Не указывайте конфиденциальные сведения и данные третьих лиц.</p><p>GitHub Pages регистрирует IP-адреса посетителей в целях безопасности. Рекламные счётчики на сайте не подключены. Согласие не включает рекламные рассылки и публичное распространение данных.</p><p>Вы можете запросить сведения об обработке, уточнение, блокирование или удаление данных и отозвать согласие по адресу a.ivanov@retaildesk.tech; также вправе обратиться в Роскомнадзор или суд. Прекращение обработки и уничтожение выполняются в сроки, установленные законом. Редакция: 29.10.2026, демонстрационный режим.</p>'},
 consent:{title:'Согласие на обработку персональных данных',content:'<p>Я свободно, своей волей и в своём интересе даю ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ» (ИНН 7743365131, ОГРН 1217700377290; г. Москва, Каширское шоссе, д. 3, к. 2, стр. 4) согласие на обработку указанных мной имени, email, телефона, компании и текста обращения для рассмотрения заявки и подготовки ответа.</p><p>Согласие распространяется на сбор, запись, систематизацию, хранение, уточнение, использование, передачу в CRM WEEEK, блокирование, удаление и уничтожение данных. Демонстрационная передача идёт через Cloudflare на компьютер, обслуживающий показ, затем в WEEEK; заявка и подтверждение согласия сохраняются на этом компьютере. Не требуется указывать специальные категории и биометрические данные.</p><p>Согласие действует до достижения цели, но не более одного года с предоставления, либо до отзыва. Отзыв направляется на a.ivanov@retaildesk.tech. При отсутствии иных законных оснований данные подлежат удалению в установленный законом срок.</p><p>Согласие не распространяется на рекламные рассылки и публикацию данных. Я подтверждаю его отдельной отметкой перед отправкой формы. Редакция 2026-10-29-demo.</p>'}
};
let formOpener;
let documentOpener;
let detailOpener;
let currentDetail;
let openingFormFromDetail = false;
function openForm(opener) {
  formOpener = opener;
  formDialog.showModal();
  formDialog.querySelector('input').focus({preventScroll:true});
}
document.addEventListener('click', event => {
  const opener = event.target.closest('[data-open-form]');
  if (opener) {
    const topic = opener.dataset.topic;
    const message = formDialog.querySelector('[name="message"]');
    if (topic && !message.value.trim()) message.value = topic;
    openForm(opener);
  }
  const detail = event.target.closest('[data-detail]');
  if (detail) {
    currentDetail = campaignDetails[detail.dataset.detail];
    if (!currentDetail) return;
    detailOpener = detail;
    document.querySelector('#detail-kicker').textContent = currentDetail.kicker;
    document.querySelector('#detail-title').innerHTML = currentDetail.title;
    const content = document.querySelector('#detail-content');
    content.replaceChildren();
    const intro = document.createElement('p');
    intro.className = 'detail-intro';
    intro.textContent = currentDetail.intro;
    content.append(intro);
    if (detailVisuals[detail.dataset.detail]) {
      const visual = document.createElement('div');
      visual.className = 'detail-visual';
      visual.innerHTML = detailVisuals[detail.dataset.detail];
      content.append(visual);
    }
    const list = document.createElement('ol');
    list.className = 'detail-list';
    for (const [title, text] of currentDetail.items) {
      const item = document.createElement('li');
      const h = document.createElement('h3');
      h.textContent = title;
      const p = document.createElement('p');
      p.textContent = text;
      item.append(h,p);
      list.append(item);
    }
    const note = document.createElement('p');
    note.className = 'detail-note';
    note.textContent = currentDetail.note;
    content.append(list,note);
    document.querySelector('[data-detail-cta]').textContent = currentDetail.cta+' ↗';
    detailDialog.showModal();
    detailDialog.scrollTop = 0;
    document.querySelector('#detail-title').focus({preventScroll:true});
  }
  if (event.target.closest('[data-detail-cta]')) {
    const field = formDialog.querySelector('[name="message"]');
    if (!field.value.trim()) field.value = currentDetail.topic;
    openingFormFromDetail = true;
    detailDialog.close();
    openForm(detailOpener);
  }
  const doc = event.target.closest('[data-document]');
  if (doc) {
    documentOpener = doc;
    const entry = docs[doc.dataset.document];
    document.querySelector('#document-title').textContent = entry.title;
    document.querySelector('#document-content').innerHTML = entry.content;
    documentDialog.showModal();
    documentDialog.scrollTop = 0;
    document.querySelector('#document-title').focus({preventScroll:true});
  }
  const close = event.target.closest('[data-close]');
  if (close) close.closest('dialog').close();
});
for (const dialog of [formDialog, documentDialog, detailDialog]) {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}
formDialog.addEventListener('close', () => formOpener?.focus({preventScroll:true}));
documentDialog.addEventListener('close', () => documentOpener?.focus({preventScroll:true}));
detailDialog.addEventListener('close', () => {
  if (!openingFormFromDetail) detailOpener?.focus({preventScroll:true});
  openingFormFromDetail = false;
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Открыть меню');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
// Match anchor offsets to the collapsed header even while the mobile menu is open.
const header = document.querySelector('.header');
const headerObserver = new ResizeObserver(() => {
  if (!navigation.classList.contains('open')) {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  }
});
headerObserver.observe(header);
const navLinks = [...navigation.querySelectorAll('a')];
const watchedSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scheduled = false;
function updateNavigation() {
  scheduled = false;
  const threshold = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 96) + 70;
  let active = null;
  for (const section of watchedSections) if (section.getBoundingClientRect().top <= threshold) active = section.id;
  for (const link of navLinks) {
    if (link.hash === `#${active}`) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
  header.classList.toggle('scrolled',window.scrollY > 8);
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, {passive:true});
window.addEventListener('resize',updateNavigation);
updateNavigation();
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); }
});
function fieldError(input, message) {
  input.setAttribute('aria-invalid', String(Boolean(message)));
  const errorId = input.getAttribute('aria-describedby');
  if (errorId) document.getElementById(errorId).textContent = message;
}
function validate(form) {
  const name = form.elements.name, email = form.elements.email;
  fieldError(name, name.value.trim() ? '' : 'Укажите, как к вам обращаться.');
  fieldError(email, email.validity.valid && email.value.trim() ? '' : 'Укажите почту в формате name@company.ru.');
  fieldError(form.elements.consent, form.elements.consent.checked ? '' : 'Подтвердите согласие на обработку данных.');
  const invalid = form.querySelector('[aria-invalid="true"]');
  if (invalid) invalid.focus();
  return !invalid;
}
for (const form of document.querySelectorAll('.contact-form')) {
 let requestId = null, sent = false, pending = false;
 form.addEventListener('input', event => {
  if (event.target.matches('input,textarea')) fieldError(event.target,'');
  if (!pending) {requestId=null;sent=false;form.querySelector('.submit-button').disabled=false;form.querySelector('.form-status').replaceChildren();}
 });
 form.addEventListener('submit', async event => {
  event.preventDefault();if(pending||sent||!validate(form))return;
  const status=form.querySelector('.form-status'),button=form.querySelector('.submit-button');
  requestId=requestId||crypto.randomUUID();pending=true;button.disabled=true;button.textContent='Отправляем…';status.textContent='';
  const payload=Object.fromEntries(['name','email','company','phone','message','website'].map(k=>[k,form.elements[k].value]));
  Object.assign(payload,{requestId,consent:form.elements.consent.checked,consentVersion:'2026-10-29-demo'});
  try {
   const result=await RetailDeskLeads.send(window.RETAIL_DESK_API,payload);
   if(result.ok){sent=true;status.textContent='Заявка отправлена. Спасибо! Мы свяжемся с вами.';button.textContent='Отправлено ✓';}
   else {status.textContent=result.message;button.textContent='Повторить проверку';}
  } catch(error){status.textContent='Не удалось подтвердить доставку. Проверьте соединение и повторите проверку. Данные сохранены в форме.';button.textContent='Повторить проверку';}
  finally {pending=false;button.disabled=sent;}
 });
}
