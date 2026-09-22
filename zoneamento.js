// Geometrias extraídas do mapa de zoneamento publicado pela Prefeitura de Ijuí.
// Atividades abaixo conferidas no Anexo 3 (páginas indicadas em cada registro).
// O filtro indica zonas para análise; a autorização depende da Prefeitura.
const zoneForm = document.getElementById('zone-filter');
const zoneInput = document.getElementById('business-type');
const zoneStatus = document.getElementById('zone-filter-status');
const clearZoneButton = document.getElementById('clear-zone-filter');
const mapElement = document.getElementById('zoning-map');

if (!window.L || !window.ZONEAMENTO_DATA) {
  mapElement.textContent = 'Não foi possível carregar o mapa interativo. Use o botão “Abrir mapa completo” abaixo.';
  zoneForm.hidden = true;
} else {
  mapElement.textContent = '';
  const map = L.map(mapElement, { scrollWheelZoom: false, preferCanvas: true });
  map.attributionControl.addAttribution('<a href="https://www.ijui.rs.gov.br/pagina/40/mapa-plano-diretor" target="_blank" rel="noopener noreferrer">Dados de zoneamento: Prefeitura de Ijuí</a>');

  const colorFor = zone => zone.startsWith('ZI') ? '#b05d91' : zone.startsWith('ZC') ? '#c85c1a' : '#1a7a6e';
  const polygons = L.geoJSON(window.ZONEAMENTO_DATA, {
    style: feature => ({ color: colorFor(feature.properties.zone), fillColor: colorFor(feature.properties.zone), weight: 1.5, fillOpacity: .28 }),
    onEachFeature: (feature, layer) => {
      const popup = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = feature.properties.zone;
      const description = document.createElement('p');
      description.textContent = 'Confira as atividades permitidas no Anexo 3 do Plano Diretor antes de escolher o imóvel.';
      const source = document.createElement('a');
      source.href = 'anexos-zoneamento.pdf';
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = 'Consultar tabela de atividades ↗';
      popup.append(title, description, source);
      layer.bindPopup(popup);
      layer.bindTooltip(feature.properties.zone, { sticky: true });
    }
  }).addTo(map);
  const allBounds = polygons.getBounds();
  if (allBounds.isValid()) map.fitBounds(allBounds, { padding: [18, 18], maxZoom: 13 });

  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  // A coluna conjunta do Anexo 3 aplica-se a ZC2, ZR3 e ZI1.
  const basicZones = ['ZR1', 'ZR2', 'ZC1', 'ZC2', 'ZR3', 'ZI1'];
  const activityRules = [
    { name: 'Acupuntura', aliases: ['acupuntura'], zones: basicZones, page: 9 },
    { name: 'Serviços advocatícios', aliases: ['advocacia', 'servicos advocaticios'], zones: basicZones, page: 9 },
    { name: 'Clínica médica', aliases: ['clinica medica'], zones: basicZones, page: 10 },
    { name: 'Clínica odontológica', aliases: ['clinica odontologica'], zones: basicZones, page: 10 },
    { name: 'Consultoria e assessoria em geral', aliases: ['consultoria e assessoria em geral', 'consultoria e assessoria'], zones: basicZones, page: 10 },
    { name: 'Contabilidade', aliases: ['contabilidade'], zones: basicZones, page: 10 },
    { name: 'Açougue e casas de carne', aliases: ['acougue e casas de carne', 'acougue'], zones: basicZones, page: 15 },
    { name: 'Farmácia com manipulação de fórmulas', aliases: ['farmacia com manipulacao de formulas', 'farmacia de manipulacao'], zones: basicZones, page: 17 },
    { name: 'Hipermercado', aliases: ['hipermercado'], zones: ['ZC2', 'ZR3', 'ZI1', 'ZC3'], page: 17 },
    { name: 'Armazéns e depósitos em geral', aliases: ['armazens e depositos em geral', 'depositos em geral', 'armazem e deposito em geral'], zones: ['ZC3'], page: 20 },
    { name: 'Indústria de baixo potencial poluidor e área mínima', aliases: ['industria de baixo potencial poluidor e area minima'], zones: basicZones, page: 21 },
    { name: 'Indústria de baixo potencial poluidor e área média', aliases: ['industria de baixo potencial poluidor e area media'], zones: ['ZC2', 'ZR3', 'ZI1', 'ZC3', 'ZI2'], page: 21 },
    { name: 'Indústria de potencial baixo ou médio e área média ou grande', aliases: ['industria de potencial baixo ou medio e area media ou grande'], zones: ['ZC3', 'ZI2'], page: 21 },
    { name: 'Indústria de potencial médio ou alto e área média ou grande', aliases: ['industria de potencial medio ou alto e area media ou grande'], zones: ['ZI2', 'ZI3'], page: 21 }
  ];
  function matchesZone(zone, wanted) {
    // Em áreas com mais de uma classificação, todas devem constar na linha da tabela.
    return zone.split(/\s*\+\s*/).every(code => wanted.includes(code));
  }
  function resetMap() {
    polygons.eachLayer(layer => {
      const color = colorFor(layer.feature.properties.zone);
      layer.setStyle({ color, fillColor: color, weight: 1.5, fillOpacity: .28 });
    });
    if (allBounds.isValid()) map.fitBounds(allBounds, { padding: [18, 18], maxZoom: 13 });
  }
  zoneForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = normalize(zoneInput.value);
    const activity = activityRules.find(item => item.aliases.includes(query));
    if (!activity) {
      resetMap();
      zoneStatus.textContent = 'Não há correspondência exata para essa atividade nas opções verificadas do Anexo 3. Informe uma atividade mais específica ou consulte a tabela oficial e a Prefeitura.';
      return;
    }
    const selected = [];
    polygons.eachLayer(layer => {
      const zone = layer.feature.properties.zone;
      const matched = matchesZone(zone, activity.zones);
      const color = colorFor(zone);
      layer.setStyle({ color: matched ? '#097768' : '#748195', fillColor: matched ? '#12a891' : '#a9b3c0', weight: matched ? 2.5 : 1, fillOpacity: matched ? .6 : .08 });
      if (matched) selected.push(layer);
    });
    if (selected.length) {
      map.fitBounds(L.featureGroup(selected).getBounds(), { padding: [22, 22], maxZoom: 14 });
      const names = [...new Set(selected.map(layer => layer.feature.properties.zone))].join(', ');
      zoneStatus.textContent = `${activity.name}: ${selected.length} áreas de referência nas zonas ${names}, conforme a linha da página ${activity.page} do Anexo 3. Confirme as condições e o imóvel com a Prefeitura.`;
    } else {
      zoneStatus.textContent = 'Nenhuma área correspondente foi encontrada neste mapa. Consulte a Prefeitura para orientação.';
    }
  });
  clearZoneButton.addEventListener('click', () => {
    zoneInput.value = '';
    resetMap();
    zoneStatus.textContent = 'Escolha uma atividade da lista para ver as zonas de referência do Anexo 3.';
    zoneInput.focus();
  });
}
