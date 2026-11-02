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
const docs = {"company": {"title": "Реквизиты компании", "content": "<p>ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ»</p><p>ИНН 7743365131 · КПП 774301001 · ОГРН 1217700377290</p><p>г. Москва, Каширское шоссе, д. 3, к. 2, стр. 4</p><p><a href=\"mailto:a.ivanov@retaildesk.tech\">a.ivanov@retaildesk.tech</a></p>"}, "policy": {"title": "Политика обработки персональных данных", "content": "<p>Настоящая Политика определяет порядок обработки персональных данных посетителей сайта Retail Desk и лиц, направляющих обращения через сайт.</p><p>Оператор: ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ», ИНН 7743365131, КПП 774301001, ОГРН 1217700377290. Адрес: г. Москва, Каширское шоссе, д. 3, к. 2, стр. 4. Электронная почта по вопросам обработки персональных данных: a.ivanov@retaildesk.tech.</p><p>Цель обработки — рассмотрение обращения, связь с заявителем и подготовка ответа или коммерческого предложения по его запросу. Обрабатываются имя, адрес электронной почты, а также добровольно указанные телефон, компания или бренд и сведения в описании задачи. Специальные категории и биометрические персональные данные для этой цели не требуются.</p><p>Использование файлов cookie</p><p>Сайт Retail Desk использует файлы cookie — небольшие фрагменты данных, которые сохраняются браузером на устройстве посетителя и передаются сайту при последующих обращениях. Cookie могут содержать технические идентификаторы. Если содержащиеся в них сведения позволяют прямо или косвенно определить пользователя, их обработка осуществляется в соответствии с настоящей Политикой и законодательством о персональных данных.</p><p>Аналитика и реклама</p><p>Аналитические технологии используются для оценки посещаемости, анализа взаимодействия посетителей со страницами и улучшения работы сайта. Для этих целей могут обрабатываться IP-адрес, идентификаторы cookie, сведения о браузере и устройстве, просмотренных страницах, источниках перехода и действиях на сайте. Рекламные технологии используются для оценки эффективности рекламы и подбора рекламных материалов при наличии отдельного согласия посетителя на соответствующую обработку.</p><p>Оператор может привлекать поставщиков сервисов аналитики и рекламы при наличии законного основания и необходимых договорных условий. Сведения о фактически используемых сервисах, получателях данных, составе cookie и сроках их действия предоставляются посетителю до получения соответствующего согласия. Сведения о лицах, обрабатывающих персональные данные по поручению Оператора, также предоставляются по запросу в установленном законом порядке.</p><p>Сведения, позволяющие определить посетителя, хранятся не дольше, чем необходимо для заявленной цели, и подлежат удалению или уничтожению при достижении цели либо отзыве согласия, если иное законное основание отсутствует. Конкретные сроки обработки для подключённых сервисов указываются в информации, предоставляемой перед получением согласия. Срок действия cookie в браузере и срок хранения ранее собранных сведений могут различаться.</p><p>Посещение сайта, продолжение просмотра страниц и отправка обращения сами по себе не являются согласием на использование необязательных cookie для аналитики или рекламы. При использовании таких cookie согласие на них запрашивается отдельно от согласия на обработку обращения; до его получения соответствующие cookie не должны устанавливаться. Отказ от необязательных cookie не должен препятствовать отправке обращения.</p><p>Посетитель может удалить сохранённые cookie и ограничить их использование в настройках браузера. Блокирование cookie, необходимых для работы сайта, может ограничить отдельные функции. Удаление cookie с устройства само по себе не удаляет сведения, ранее полученные Оператором: для реализации прав и отзыва согласия можно обратиться на a.ivanov@retaildesk.tech. Срок хранения сведений должен соответствовать цели их обработки; установленный настоящей Политикой срок хранения обращений не определяет автоматически срок действия cookie.</p><p>Обработка осуществляется на основании отдельно предоставленного согласия либо другого применимого основания, предусмотренного законодательством Российской Федерации. Посещение сайта само по себе не означает предоставления согласия.</p><p>После отправки формы сведения поступают Оператору и передаются в CRM WEEEK для учёта и обработки обращения. Для подтверждения согласия сохраняются его версия, дата и время предоставления. Доступ к обращениям предоставляется лицам, которым он необходим для выполнения рабочих обязанностей.</p><p>Обработка может включать сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, предоставление в пределах указанной цели, блокирование, удаление и уничтожение данных с использованием средств автоматизации и без них. Привлечение поставщиков услуг к обработке допускается при наличии необходимых правовых оснований и договорных условий.</p><p>Корпоративная почта Оператора администрируется им самостоятельно и размещена на виртуальном сервере HOSTKEY на территории Российской Федерации. Резервные копии корпоративной почты также хранятся в России.</p><p>Данные обращения обрабатываются до завершения его рассмотрения и связанной с ним переписки, но не более одного года с даты получения обращения. При достижении цели или отзыве согласия раньше обработка прекращается при отсутствии иных законных оснований. Заключение договора может повлечь дальнейшую обработку на самостоятельном основании и применение установленных законом сроков хранения документов.</p><p>Оператор обязан обеспечивать конфиденциальность данных и принимать необходимые организационные и технические меры их защиты. Данные обращений не предназначены для публичного распространения или рекламных рассылок. Для обработки в иных целях требуется самостоятельное правовое основание.</p><p>Субъект персональных данных вправе получать сведения об обработке, требовать уточнения, блокирования или удаления данных в предусмотренных законом случаях, отозвать согласие, обратиться в Роскомнадзор или суд для защиты своих прав.</p><p>Запрос или отзыв согласия направляется на a.ivanov@retaildesk.tech либо по адресу Оператора. В обращении следует указать сведения, позволяющие определить заявителя и соответствующую заявку. Ответ, прекращение обработки и уничтожение данных осуществляются в установленные законом сроки.</p><p>Политика подлежит актуализации при изменении целей, способов обработки или используемых информационных систем.</p>"}, "consent": {"title": "Согласие на обработку персональных данных", "content": "<p>Я свободно, своей волей и в своём интересе даю ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ» (ИНН 7743365131, КПП 774301001, ОГРН 1217700377290; адрес: г. Москва, Каширское шоссе, д. 3, к. 2, стр. 4) согласие на обработку моих персональных данных для рассмотрения обращения, связи со мной и подготовки ответа или коммерческого предложения по моему запросу.</p><p>Согласие распространяется на указанные мной имя, адрес электронной почты, а также добровольно предоставленные телефон, компанию или бренд и сведения в описании задачи. Специальные категории и биометрические персональные данные для этой цели не требуются.</p><p>Разрешаю сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу в CRM WEEEK для учёта и обработки обращения, блокирование, удаление и уничтожение данных с использованием средств автоматизации и без них. Для подтверждения моего волеизъявления сохраняются версия согласия, дата и время его предоставления.</p><p>Согласие действует до завершения рассмотрения обращения и связанной с ним переписки, но не более одного года с даты предоставления, либо до отзыва. Отзыв можно направить на a.ivanov@retaildesk.tech или по адресу Оператора, указав сведения, позволяющие определить моё обращение.</p><p>После отзыва Оператор прекращает обработку и уничтожает данные в установленный законом срок, если отсутствует другое законное основание для продолжения обработки.</p><p>Согласие не распространяется на рекламные рассылки, публичное распространение данных и обработку для иных целей. Оно предоставляется отдельно от других документов посредством самостоятельной отметки в соответствующем поле перед отправкой формы на сайте Retail Desk. Ознакомление с Политикой обработки персональных данных само по себе не заменяет предоставление согласия.</p><p>Настоящее согласие относится к обработке обращения и не является согласием на использование необязательных файлов cookie для аналитики или рекламы. При использовании таких cookie решение об их обработке принимается отдельно; отказ от них не препятствует направлению обращения. Порядок использования cookie и управления ими описан в Политике обработки персональных данных.</p>"}};

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
  Object.assign(payload,{requestId,consent:form.elements.consent.checked,consentVersion:'2026-11-02'});
  try {
   const result=await RetailDeskLeads.send(window.RETAIL_DESK_API,payload);
   if(result.ok){sent=true;status.textContent='Заявка отправлена. Спасибо! Мы свяжемся с вами.';button.textContent='Отправлено ✓';}
   else {status.textContent=result.message;button.textContent='Повторить проверку';}
  } catch(error){status.textContent='Не удалось подтвердить доставку. Проверьте соединение и повторите проверку. Данные сохранены в форме.';button.textContent='Повторить проверку';}
  finally {pending=false;button.disabled=sent;}
 });
}
