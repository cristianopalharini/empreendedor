// CURSOS CONCLUÍDOS — adicione um objeto por curso nesta lista.
// Salve as fotos na pasta images e informe de 1 a 3 caminhos na lista "fotos".
// Copie o exemplo abaixo para dentro dos colchetes e substitua os textos.
// Os campos fotos, fotoAlt, periodo e descricao são opcionais.
// Para usar uma ou duas fotos, remova as linhas que não precisar da lista.
// {
//   titulo: 'Nome do curso concluído',
//   periodo: 'Mês e ano da conclusão',
//   descricao: 'Resumo das atividades e conquistas da turma.',
//   fotos: [
//     'images/foto-1.jpg',
//     'images/foto-2.jpg',
//     'images/foto-3.jpg'
//   ],
//   fotoAlt: 'Descrição da foto da turma'
// },
const cursosConcluidos = [
  {
    titulo: 'Ar Condicionado',
    descricao: 'Curso de instalação e manutenção de ar condicionado.',
    fotos: [
      'images/CursosQualifica/ar-condicionado (1).jpeg',
      'images/CursosQualifica/ar-condicionado (2).jpeg'
    ],
    fotoAlt: 'Registros do curso de Ar Condicionado'
  },
  {
    titulo: 'CNC — Controle Numérico Computadorizado',
    fotos: [
      'images/CursosQualifica/CNC- Controle Numérico Computadorizado (1).jpeg',
      'images/CursosQualifica/CNC- Controle Numérico Computadorizado (2).jpeg'
    ],
    fotoAlt: 'Atividades práticas do curso de CNC'
  },
  {
    titulo: 'Corte e Costura — Unidade Móvel',
    fotos: [
      'images/CursosQualifica/corte e costura - Unidade movel (1).jpeg',
      'images/CursosQualifica/corte e costura - Unidade movel (2).jpeg'
    ],
    fotoAlt: 'Turma de Corte e Costura apresentando peças na unidade móvel'
  },
  {
    titulo: 'Costura — Unidade Móvel',
    fotos: ['images/CursosQualifica/costura - unidade movel.jpg'],
    fotoAlt: 'Registro na unidade móvel do curso de Costura'
  },
  {
    titulo: 'MOPP — Produtos Perigosos',
    fotos: ['images/CursosQualifica/Curso de mopp - Movimentação Operacional de Produtos Perigosos.jpeg'],
    fotoAlt: 'Turma do curso de MOPP em sala de aula'
  },
  {
    titulo: 'Desenho e LID',
    fotos: [
      'images/CursosQualifica/Desenho e LID (1).jpeg',
      'images/CursosQualifica/Desenho e LID (2).jpeg'
    ],
    fotoAlt: 'Registros do curso de Desenho e LID'
  },
  {
    titulo: 'Educação Financeira',
    fotos: ['images/CursosQualifica/educacao financeira.jpeg'],
    fotoAlt: 'Turma do curso de Educação Financeira'
  },
  {
    titulo: 'Eletricidade Predial',
    fotos: ['images/CursosQualifica/eletrecidade predial.jpeg'],
    fotoAlt: 'Turma do curso de Eletricidade Predial'
  },
  {
    titulo: 'Empilhadeira — Plata',
    fotos: ['images/CursosQualifica/Empilhadeira - plata.jpeg'],
    fotoAlt: 'Atividade prática do curso de Empilhadeira na Plata'
  },
  {
    titulo: 'Empilhadeira — SEST SENAT',
    fotos: [
      'images/CursosQualifica/empilhadeira - Sest senat (1).jpeg',
      'images/CursosQualifica/empilhadeira - Sest senat (2).jpeg'
    ],
    fotoAlt: 'Registros do curso de Empilhadeira no SEST SENAT'
  },
  {
    titulo: 'Estética Facial',
    fotos: ['images/CursosQualifica/estetica facial.jpg'],
    fotoAlt: 'Turma de Estética Facial com os certificados de conclusão'
  },
  {
    titulo: 'NR 12',
    fotos: ['images/CursosQualifica/nr 12.jpg'],
    fotoAlt: 'Turma do curso de NR 12 em sala de aula'
  },
  {
    titulo: 'NR 35 — Trabalho em Altura',
    fotos: ['images/CursosQualifica/nr 35 - trabalho em altura.jpg'],
    fotoAlt: 'Atividade prática do curso de NR 35 com equipamentos para trabalho em altura'
  },
  {
    titulo: 'Transporte de Emergência',
    fotos: ['images/CursosQualifica/transporte de emergencia.jpeg'],
    fotoAlt: 'Turma do curso de Transporte de Emergência'
  },
  {
    titulo: 'Transporte Escolar',
    fotos: ['images/CursosQualifica/TRANSPORTE ESCOLAR.jpeg'],
    fotoAlt: 'Turma do curso de Transporte Escolar'
  }
];

(() => {
  const viewport = document.getElementById('qualifica-completed');
  if (!viewport) return;
  const previous = document.getElementById('qualifica-prev');
  const next = document.getElementById('qualifica-next');
  const position = document.getElementById('qualifica-position');
  const courses = cursosConcluidos.filter(course => course && typeof course.titulo === 'string' && course.titulo.trim());
  if (!courses.length) return;

  function addPhotos(slide, course) {
    // Aceita "fotos" ou "foto", como lista ou caminho único.
    const configuredPhotos = course.fotos ?? course.foto ?? [];
    const sources = (Array.isArray(configuredPhotos) ? configuredPhotos : [configuredPhotos])
      .filter(source => typeof source === 'string' && source.trim())
      .map(source => source.trim()).slice(0, 3);
    if (!sources.length) return;

    const gallery = document.createElement('div');
    gallery.className = 'qualifica-course-photos';
    gallery.setAttribute('role', 'group');
    gallery.setAttribute('aria-label', `Fotos do curso ${course.titulo}`);
    const controls = document.createElement('div');
    controls.className = 'qualifica-photo-controls';
    const back = document.createElement('button');
    back.type = 'button';
    back.textContent = '←';
    back.setAttribute('aria-label', `Foto anterior de ${course.titulo}`);
    const forward = document.createElement('button');
    forward.type = 'button';
    forward.textContent = '→';
    forward.setAttribute('aria-label', `Próxima foto de ${course.titulo}`);
    const count = document.createElement('span');
    count.setAttribute('role', 'status');
    count.setAttribute('aria-live', 'polite');
    count.setAttribute('aria-atomic', 'true');
    controls.append(back, count, forward);
    let activePhoto = 0;
    const photos = [];

    function showPhoto(index) {
      if (!photos.length) {
        gallery.remove();
        slide.classList.remove('has-photo');
        return;
      }
      activePhoto = (index + photos.length) % photos.length;
      photos.forEach((photo, photoIndex) => { photo.hidden = photoIndex !== activePhoto; });
      controls.hidden = photos.length < 2;
      gallery.tabIndex = photos.length > 1 ? 0 : -1;
      count.textContent = `Foto ${activePhoto + 1} de ${photos.length}`;
    }

    sources.forEach((source, photoIndex) => {
      const photo = document.createElement('img');
      photo.alt = `${course.fotoAlt || `Turma do curso ${course.titulo}`} — foto ${photoIndex + 1}`;
      photo.loading = 'lazy';
      photo.addEventListener('error', () => {
        const failedIndex = photos.indexOf(photo);
        if (failedIndex < 0) return;
        photos.splice(failedIndex, 1);
        photo.remove();
        if (failedIndex < activePhoto) activePhoto--;
        showPhoto(Math.min(activePhoto, photos.length - 1));
      });
      photo.src = source;
      photos.push(photo);
      gallery.append(photo);
    });
    back.addEventListener('click', () => showPhoto(activePhoto - 1));
    forward.addEventListener('click', () => showPhoto(activePhoto + 1));
    gallery.addEventListener('keydown', event => {
      const destinations = { ArrowLeft: activePhoto - 1, ArrowRight: activePhoto + 1, Home: 0, End: photos.length - 1 };
      if (!(event.key in destinations)) return;
      event.preventDefault();
      event.stopPropagation();
      showPhoto(destinations[event.key]);
    });
    gallery.append(controls);
    slide.classList.add('has-photo');
    slide.append(gallery);
    showPhoto(0);
  }

  const slides = courses.map((course, index) => {
    const slide = document.createElement('article');
    slide.className = 'qualifica-completed-course';
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} de ${courses.length}: ${course.titulo}`);
    addPhotos(slide, course);
    const content = document.createElement('div');
    content.className = 'qualifica-completed-content';
    const badge = document.createElement('span');
    badge.className = 'qualifica-badge';
    badge.textContent = '✓ Curso concluído';
    const title = document.createElement('h4');
    title.textContent = course.titulo;
    content.append(badge, title);
    if (course.periodo) {
      const period = document.createElement('p');
      period.className = 'qualifica-completed-period';
      period.textContent = course.periodo;
      content.append(period);
    }
    const descriptionText = course.descricao || course.descrição;
    if (descriptionText) {
      const description = document.createElement('p');
      description.textContent = descriptionText;
      content.append(description);
    }
    slide.append(content);
    return slide;
  });
  viewport.replaceChildren(...slides);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  const slideTop = slide => slide.offsetTop - slides[0].offsetTop;

  function updateControls() {
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    position.textContent = `${current + 1} de ${slides.length}`;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    viewport.scrollTo({ top: slideTop(slides[current]), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    updateControls();
  }

  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  viewport.addEventListener('keydown', event => {
    const destinations = { ArrowUp: current - 1, ArrowDown: current + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    goTo(destinations[event.key]);
  });
  viewport.addEventListener('scroll', () => {
    let closest = 0;
    slides.forEach((slide, index) => {
      if (Math.abs(slideTop(slide) - viewport.scrollTop) < Math.abs(slideTop(slides[closest]) - viewport.scrollTop)) closest = index;
    });
    if (current !== closest) {
      current = closest;
      updateControls();
    }
  }, { passive: true });
  updateControls();
})();
