// Islamic Duas Center — auto version sync + nav
(function(){
  var VERSION_JSON = 'https://raw.githubusercontent.com/KOKO17-stack/islamic-duas-apk/main/version.json';
  var FALLBACK = { versionName: '1.12.76', versionCode: 106, downloadUrl: 'https://github.com/KOKO17-stack/islamic-duas-website/releases/download/v1.12.76/app-release.apk' };

  function fmtSize(bytes){
    if(!bytes) return '13 MB';
    var mb = (bytes/1048576).toFixed(1);
    return mb + ' MB';
  }

  function updateUI(data){
    var name = data.versionName || FALLBACK.versionName;
    var url = data.downloadUrl || FALLBACK.downloadUrl;
    // hero + download card
    var heroVer = document.getElementById('heroVersion');
    if(heroVer) heroVer.textContent = 'Version ' + name + ' • 13 MB • Android 7.0+ • Updated';
    var dlMeta = document.getElementById('dlMeta');
    if(dlMeta) dlMeta.textContent = 'Version ' + name + ' • 13 MB • Android 7.0+ • Ahl e Hadees Research Center';
    var btn = document.getElementById('downloadBtn');
    if(btn) btn.href = url;
    var heroBtn = document.getElementById('heroDownloadBtn');
    if(heroBtn) heroBtn.href = url;
  }

  // Try fetch version.json (no token needed — raw is public)
  try{
    fetch(VERSION_JSON, {cache:'no-store'}).then(function(r){
      if(!r.ok) throw new Error('http '+r.status);
      return r.json();
    }).then(function(j){
      if(j && j.versionName) updateUI(j);
    }).catch(function(){
      updateUI(FALLBACK);
    });
  }catch(e){ updateUI(FALLBACK); }

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); toggle.textContent='☰'; });
    });
  }

  // Pro nav + reveal
  var nav = document.getElementById('navbar');
  window.addEventListener('scroll', function(){
    if(window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
  // Reveal on scroll
  try{
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
    }, {threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
    // hero inner always visible
    document.querySelector('.hero-inner') && document.querySelector('.hero-inner').classList.add('in');
  }catch(e){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }
})();
