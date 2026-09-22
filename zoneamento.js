// Geometrias extraídas do mapa de zoneamento publicado pela Prefeitura de Ijuí.
// O filtro indica zonas para análise; a autorização depende do Anexo 3 e da Prefeitura.
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

  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const patterns = [
    { name: 'indústria e fabricação', pattern: /industr|fabrica|fabrico|metalurg|marcenar|serralher|confeccao|usina/, zones: ['ZI1', 'ZI2'] },
    { name: 'depósito e logística', pattern: /deposito|logistic|armazem|distribui|atacad|transportadora/, zones: ['ZI1', 'ZI2', 'ZC2', 'ZC3'] },
    { name: 'prestação de serviços', pattern: /servic|escritorio|consultor|clinica|consultorio|salao|barbearia|oficina|academia|escola|lavanderia|pet shop/, zones: ['ZC1', 'ZC2', 'ZC3'] },
    { name: 'comércio e alimentação', pattern: /comerc|loja|mercado|supermercado|padaria|restaurante|cafe|lanchonete|bar\b|farmacia|papelaria|varejo|boutique/, zones: ['ZC1', 'ZC2', 'ZC3'] }
  ];
  function matchesZone(zone, wanted) {
    return wanted.some(code => new RegExp(`(?:^|[^A-Z0-9])${code}(?:$|[^A-Z0-9])`).test(zone));
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
    const category = patterns.find(item => item.pattern.test(query));
    if (!category) {
      resetMap();
      zoneStatus.textContent = 'Não identifiquei uma categoria para esse negócio. Tente descrever a atividade como comércio, serviço, indústria ou depósito e consulte a tabela oficial.';
      return;
    }
    const selected = [];
    polygons.eachLayer(layer => {
      const zone = layer.feature.properties.zone;
      const matched = matchesZone(zone, category.zones);
      const color = colorFor(zone);
      layer.setStyle({ color: matched ? '#097768' : '#748195', fillColor: matched ? '#12a891' : '#a9b3c0', weight: matched ? 2.5 : 1, fillOpacity: matched ? .6 : .08 });
      if (matched) selected.push(layer);
    });
    if (selected.length) {
      map.fitBounds(L.featureGroup(selected).getBounds(), { padding: [22, 22], maxZoom: 14 });
      const names = [...new Set(selected.map(layer => layer.feature.properties.zone))].join(', ');
      zoneStatus.textContent = `Para ${category.name}, destaquei ${selected.length} áreas nas zonas ${names}. São zonas para verificar, não uma confirmação de atividade permitida. Consulte o Anexo 3 e a Prefeitura.`;
    } else {
      zoneStatus.textContent = 'Nenhuma área correspondente foi encontrada neste mapa. Consulte a Prefeitura para orientação.';
    }
  });
  clearZoneButton.addEventListener('click', () => {
    zoneInput.value = '';
    resetMap();
    zoneStatus.textContent = 'Digite um tipo de negócio para ver as zonas de referência.';
    zoneInput.focus();
  });
}
