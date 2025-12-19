/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show')
    })
  }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // impedir reload

  const form = this;
  const data = new FormData(form);

  // envia para o Formspree
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      // limpa o form
      form.reset();

      // mostra a mensagem
      const msg = document.getElementById("successMessage");
      msg.style.display = "block";

      // some automaticamente depois de alguns segundos
      setTimeout(() => {
        msg.style.display = "none";
      }, 5000);
    }
  } catch (error) {
    console.error("Erro ao enviar o formulário:", error);
  }
});


function openModal(title, url) {
  const modal = document.getElementById('fullscreenModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalIframe = document.getElementById('modalIframe');

  modalTitle.textContent = title;
  modalIframe.src = url;
  modal.classList.add('active');

  // Previne scroll no body quando modal está aberto
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('fullscreenModal');
  const modalIframe = document.getElementById('modalIframe');

  modal.classList.remove('active');
  modalIframe.src = '';

  // Restaura scroll no body
  document.body.style.overflow = 'auto';
}

// Fechar modal clicando no fundo escuro
function closeModalOnBackground(event) {
  if (event.target.id === 'fullscreenModal') {
    closeModal();
  }
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Fix para o toggle dos checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const conteudoId = this.id.replace('processo', 'conteudo');
    const conteudo = document.getElementById(conteudoId);

    if (this.checked) {
      conteudo.style.display = 'block';
    } else {
      conteudo.style.display = 'none';
    }
  });
});
