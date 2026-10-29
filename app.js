'use strict';
// No data is submitted, stored, or sent to analytics in this preview.
// Connect a same-origin, Russian-hosted endpoint only after approving the legal texts.
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
  company: {
    title: 'Реквизиты компании',
    content: '<p><strong>ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ»</strong></p><p>ИНН 7743365131</p><p>Каширское шоссе, 3к2с4, пом. 1/7</p><p><a href="mailto:e.dolgikh@retaildesk.tech">e.dolgikh@retaildesk.tech</a></p><p class="small">Перед публичным запуском необходимо уточнить город, полный юридический адрес и ОГРН.</p>'
  },
  policy: {
    title: 'Политика обработки персональных данных',
    content: '<p class="draft-label">ПРОЕКТ ДОКУМЕНТА · НЕ УТВЕРЖДЁН ДЛЯ ПУБЛИКАЦИИ</p><p><strong>Оператор:</strong> ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ», ИНН 7743365131. Каширское шоссе, 3к2с4, пом. 1/7. Город и контакт для обращений по персональным данным уточняются.</p><p><strong>Планируемая цель:</strong> рассмотрение заявки и подготовка ответа. Данные: имя, email и добровольно заполненные сведения о компании, телефоне и задаче.</p><p>В этой версии сайта форма не передаёт введённые данные. Рекламная аналитика и необязательные cookie не используются. Письмо через почтовую ссылку отправляется пользователем в его почтовом приложении.</p><p><strong>До подключения формы:</strong> утвердить правовые основания, операции и способы обработки, сроки хранения и удаления, перечень обработчиков, условия использования почты и хостинга, локализацию, права пользователя, порядок обращений и меры защиты.</p>'
  },
  consent: {
    title: 'Согласие на обработку данных',
    content: '<p class="draft-label">ПРОЕКТ ОТДЕЛЬНОГО СОГЛАСИЯ · НЕ УТВЕРЖДЁН</p><p>Оператор: ООО «ЦИФРОВОЕ ПРЕДПРИЯТИЕ», ИНН 7743365131. Каширское шоссе, 3к2с4, пом. 1/7. Город необходимо уточнить.</p><p>Планируемая цель: рассмотреть обращение и подготовить ответ. Состав данных: имя, email, а также добровольно заполненные поля формы — компания, телефон и описание задачи.</p><p>Согласие не включает получение рекламных рассылок.</p><p>До подключения отправки необходимо определить операции и способы обработки, привлечённых обработчиков, срок действия согласия и порядок его отзыва с действующим контактом оператора.</p><p class="small">В текущей версии отметка не передаётся на сервер, форма служит для проверки интерфейса.</p>'
  }
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
  const name = form.elements.name, email = form.elements.email, consent = form.elements.consent;
  fieldError(name, name.value.trim() ? '' : 'Укажите, как к вам обращаться.');
  fieldError(email, email.validity.valid && email.value.trim() ? '' : 'Укажите почту в формате name@company.ru.');
  fieldError(consent, consent.checked ? '' : 'Подтвердите согласие на обработку данных.');
  const invalid = form.querySelector('[aria-invalid="true"]');
  if (invalid) invalid.focus();
  return !invalid;
}
for (const form of document.querySelectorAll('.contact-form')) {
  form.addEventListener('input', event => {
    if (event.target.matches('input,textarea')) fieldError(event.target, '');
    form.querySelector('.form-status').replaceChildren();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validate(form)) return;
    const status = form.querySelector('.form-status');
    status.textContent = 'Автоматическая отправка пока не подключена. Заявка не отправлена. Данные остались в форме. Свяжитесь с нами: ';
    const mail = document.createElement('a');
    mail.href = 'mailto:e.dolgikh@retaildesk.tech';
    mail.textContent = 'e.dolgikh@retaildesk.tech';
    status.append(mail);
  });
}
