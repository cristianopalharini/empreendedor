const categories = [
  ['mei','MEI'],['alvara','Alvará'],['junta','Junta Comercial'],['nf','Nota Fiscal'],
  ['licitacoes','Licitações'],['certidoes','Certidões'],['tributos','Tributos'],['vigilancia','Vigilância & Meio Amb.']
];
// Links de serviços mantidos a partir do site anterior da Sala do Empreendedor.
const services = {
  mei: [
    ['🖨️','Imprimir Boleto Mensal (DAS)','Emita o boleto mensal do MEI.','https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/Identificacao'],
    ['📄','Imprimir Certificado de MEI','Gere o certificado CCMEI.','https://mei.receita.economia.gov.br/certificado/consulta'],
    ['✅','Formalize o MEI','Abra seu MEI gratuitamente.','https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei'],
    ['📊','Declaração Anual (DASN)','Faça sua declaração anual.','https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Default.aspx'],
    ['✏️','Altere seus Dados CNPJ-MEI','Atualize seus dados cadastrais.','https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/copy_of_servicos-para-mei/atualizacao-cadastral-de-mei'],
    ['🖨️','Imprima seu CNPJ','Emita o comprovante de inscrição.','https://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_Solicitacao.asp'],
    ['💳','Parcelamento do Simples Nacional','Consulte débitos e parcele valores.','https://www8.receita.fazenda.gov.br/SimplesNacional/controleAcesso/Autentica.aspx?id=48'],
    ['↩️','Restituição de DAS Duplicado','Solicite a restituição de pagamento duplicado.','https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=18'],
    ['❌','Feche seu MEI','Solicite a baixa do MEI.','https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/copy_of_servicos-para-mei/baixa-de-mei'],
    ['🧾','Nota Fiscal de Serviço (NFSe)','Acesse a emissão de NFSe para MEI.','https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/nota-fiscal/nota-fiscal-de-servico-eletronica-nfs-e'],
    ['📱','App MEI','Aplicativo oficial do MEI.','https://play.google.com/store/apps/details?id=br.gov.fazenda.receita.mei','https://apps.apple.com/br/app/mei/id1040521803']
  ],
  alvara: [
    ['🏢','Solicitar Alvará de Funcionamento','Licença para abertura ou alteração do estabelecimento.','https://www.ijui.rs.gov.br/pagina/10/alvara-de-funcionamento'],
    ['⏸️','Solicitar Inatividade','Registre a inatividade do estabelecimento.','https://ijui.1doc.com.br/b.php?pg=wp/wp&itd=5&is=1339'],
    ['▶️','Solicitar Reativação','Reative sua inscrição municipal.','https://ijui.1doc.com.br/b.php?pg=wp/wp&itd=5&is=1340'],
    ['📋','Solicitar Baixa da Inscrição','Encerre a inscrição municipal.','https://ijui.1doc.com.br/b.php?pg=wp/wp&itd=5&is=1311'],
    ['🚫','Cancelamento de Débitos e Baixa','Solicite a baixa definitiva.','https://ijui.1doc.com.br/b.php?pg=wp/wp&itd=5&is=1341'],
    ['📒','Contabilistas Cadastrados','Consulte a lista de contadores do município.','contadores2023.pdf']
  ],
  junta: [
    ['🏛️','Abertura de Empresas','Registre sua empresa na Junta Comercial.','https://jucisrs.rs.gov.br/abertura-de-empresas'],
    ['⚡','Tudo Fácil Empresas','Sistema integrado de abertura de empresas.','https://tudofacilempresas.rs.gov.br/inicial'],
    ['🌐','Portal de Serviços','Consultas e registros da Junta Comercial.','https://portalservicos.jucisrs.rs.gov.br/Portal/pages/principal.jsf']
  ],
  nf: [
    ['🧾','Nota Fiscal de Serviços (NFSe)','Emita e consulte notas fiscais de serviços.','http://ijui-portais.govcloud.com.br/NFSe.portal/'],
    ['📦','Nota Fiscal de Mercadoria','Acesse o sistema estadual de NF-e.','https://receita.fazenda.rs.gov.br/lista/2936/emissao']
  ],
  licitacoes: [
    ['📢','Licitações da Prefeitura','Consulte processos licitatórios de Ijuí.','https://www.ijui.rs.gov.br/licitacao'],
    ['🛒','Portal de Compras Públicas','Participe de compras públicas.','https://www.portaldecompraspublicas.com.br/'],
    ['📅','Previsão Anual de Compras','Consulte o planejamento de aquisições.','https://www.ijui.rs.gov.br/licitacao']
  ],
  certidoes: [
    ['🏙️','Certidão Municipal','Regularidade fiscal do município.','https://www.ijui.rs.gov.br/pagina/19/manual-de-orientacao-dos-procedimentos-administrativos/sub-pagina/69/'],
    ['🏛️','Certidão Estadual','Regularidade fiscal do RS.','https://www.sefaz.rs.gov.br/sat/CertidaoSitFiscalSolic.aspx'],
    ['🇧🇷','Certidão Federal','Regularidade de tributos federais.','https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir'],
    ['💼','Certidão FGTS','Consulte a regularidade do FGTS.','https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf'],
    ['👷','Certidão Trabalhista','Emita a certidão de débitos trabalhistas.','https://www.tst.jus.br/certidao1'],
    ['⚖️','Certidões Judiciais','Certidões do Tribunal de Justiça do RS.','https://www.tjrs.jus.br/novo/processos-e-servicos/servicos-processuais/emissao-de-antecedentes-e-certidoes/']
  ],
  tributos: [
    ['🧾','Guias de Recolhimento','Consulte tributos e serviços municipais.','http://ijui-portais.govcloud.com.br:8080/cidadao/servlet/br.com.cetil.ar.jvlle.hatendimento?'],
    ['💳','Parcelamento de Tributos','Regularize débitos municipais.','https://www.ijui.rs.gov.br/pagina/25/servicos-digitais/sub-pagina/138/'],
    ['⚖️','Tributos Ajuizados','Consulte serviços de débitos ajuizados.','https://ijui.1doc.com.br/b.php?pg=wp/wp&itd=5&is=1088'],
    ['🔄','Reemissão de Guia','Acesse orientações da Prefeitura.','https://www.ijui.rs.gov.br/pagina/19/manual-de-orientacao-dos-procedimentos-administrativos/sub-pagina/72/'],
    ['📱','Aplicativo CidadeMob','Acesse serviços municipais pelo celular.','https://www.ijui.rs.gov.br/pagina/18/cidademob'],
    ['💻','Declaração Eletrônica de ISS','Faça a declaração de serviços.','http://ijui-portais.govcloud.com.br:8080/deiss/servlet/br.com.cetil.ar.gips.hprincipal?XHYvHvw0LR7ksvk2RI32+A==']
  ],
  vigilancia: [
    ['🌿','Licenciamento Ambiental','Acesse o portal ambiental.','http://meioambiente.govbr.com.br:3050/rcl5/indexme.aspx?1680'],
    ['🏥','Alvará Sanitário','Solicite o alvará sanitário.','https://ijui.1doc.com.br/b.php?pg=wp/wp&itd=5&is=1508'],
    ['🗺️','Mapa de Zoneamento','Consulte as zonas urbanas de Ijuí no mapa.','#zoneamento']
  ]
};

const tabs = document.querySelector('.tabs');
const grid = document.getElementById('service-grid');
let active = 'mei';
function renderServices() {
  tabs.replaceChildren(...categories.map(([id,label]) => {
    const button = document.createElement('button');
    button.type = 'button'; button.id = `tab-${id}`; button.textContent = label;
    button.setAttribute('role','tab'); button.setAttribute('aria-controls','service-grid');
    button.setAttribute('aria-selected',String(id === active));
    button.tabIndex = id === active ? 0 : -1;
    button.addEventListener('click',() => { active = id; renderServices(); document.getElementById(`tab-${id}`).focus(); });
    return button;
  }));
  grid.setAttribute('role','tabpanel'); grid.setAttribute('aria-labelledby',`tab-${active}`);
  grid.replaceChildren(...services[active].map(([icon,title,desc,href,iosHref]) => {
    const card = document.createElement(iosHref ? 'article' : 'a'); card.className = 'service-card';
    if (!iosHref) {
      card.href = href;
      if (/^https?:/.test(href)) { card.target = '_blank'; card.rel = 'noopener noreferrer'; }
    }
    const symbol = document.createElement('span'); symbol.className = 'icon'; symbol.textContent = icon;
    const heading = document.createElement('h3'); heading.textContent = title;
    const description = document.createElement('p'); description.textContent = desc;
    card.append(symbol, heading, description);
    if (iosHref) {
      const links = document.createElement('div'); links.className = 'app-links';
      for (const [label, url] of [['Android', href], ['iOS', iosHref]]) {
        const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
        link.textContent = `${label} →`; links.append(link);
      }
      card.append(links);
    } else {
      const access = document.createElement('span'); access.className = 'access'; access.textContent = 'Acessar serviço →';
      card.append(access);
    }
    return card;
  }));
}
renderServices();
tabs.addEventListener('keydown', event => {
  if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault(); const index = categories.findIndex(([id]) => id === active);
  active = categories[event.key === 'Home' ? 0 : event.key === 'End' ? categories.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length][0];
  renderServices(); document.getElementById(`tab-${active}`).focus();
});
document.querySelectorAll('[data-category]').forEach(link => link.addEventListener('click', () => { active = link.dataset.category; renderServices(); }));
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Abrir menu'); }));
const topLink = document.querySelector('.back-top');
window.addEventListener('scroll', () => topLink.classList.toggle('visible', window.scrollY > 450), { passive:true });
