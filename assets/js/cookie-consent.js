/**
 * ==========================================
 * COOKIE CONSENT - LGPD COMPLIANCE
 * Gerenciamento de consentimento de cookies
 * ==========================================
 */

(function() {
  'use strict';

  // Configurações
  const COOKIE_NAME = 'linhagro_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Elementos DOM
  let banner;
  let acceptBtn;
  let rejectBtn;
  let closeBtn;

  /**
   * Inicializar banner de cookies
   */
  function initCookieBanner() {
    // Obter elementos
    banner = document.getElementById('cookieConsent');
    acceptBtn = document.getElementById('acceptCookies');
    rejectBtn = document.getElementById('rejectCookies');
    closeBtn = document.getElementById('closeCookieBanner');

    if (!banner) {
      console.warn('⚠️ Banner de cookies não encontrado');
      return;
    }

    // Verificar se usuário já fez escolha
    const consent = getCookie(COOKIE_NAME);
    console.log('🔎 Consentimento atual:', consent);

    if (!consent) {
      console.log('🔔 Nenhum consentimento encontrado, mostrando banner AGORA...');
      showBanner();
    } else {
      console.log('📁 Consentimento existente, aplicando preferências:', consent);
      applyConsent(consent);
    }

    // Event listeners (só se elementos existirem)
    if (acceptBtn) {
      acceptBtn.addEventListener('click', handleAccept);
    }
    if (rejectBtn) {
      rejectBtn.addEventListener('click', handleReject);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', handleClose);
    }
  }

  /**
   * Mostrar banner
   */
  function showBanner() {
    if (!banner) return;
    banner.classList.add('show');
    banner.classList.remove('hide');
    document.body.style.paddingBottom = banner.offsetHeight + 'px';
    console.log('📢 Banner de cookies exibido');
  }

  /**
   * Esconder banner
   */
  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('show');
    banner.classList.add('hide');
    document.body.style.paddingBottom = '0';

    // Remover do DOM após animação
    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.remove();
      }
    }, 400);
  }

  /**
   * Aceitar todos os cookies
   */
  function handleAccept() {
    console.log('✅ Cookies aceitos');
    setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
    applyConsent('accepted');
    hideBanner();

    if (typeof gtag !== 'undefined') {
      gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'accepted'
      });
    }
  }

  /**
   * Rejeitar cookies não essenciais
   */
  function handleReject() {
    console.log('❌ Cookies rejeitados (apenas essenciais)');
    setCookie(COOKIE_NAME, 'rejected', COOKIE_EXPIRY_DAYS);
    applyConsent('rejected');
    hideBanner();

    if (typeof gtag !== 'undefined') {
      gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'rejected'
      });
    }
  }

  /**
   * Fechar banner (considera como rejeição)
   */
  function handleClose() {
    handleReject();
  }

  /**
   * Aplicar consentimento
   */
  function applyConsent(consent) {
    if (consent === 'accepted') {
      enableGoogleAnalytics();
      enableGoogleAds();
      console.log('📊 Scripts de análise habilitados');
    } else {
      disableNonEssentialScripts();
      console.log('🔒 Apenas cookies essenciais');
    }
  }

  /**
   * Habilitar Google Analytics
   */
  function enableGoogleAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
      console.log('📊 Google Analytics habilitado');
    }
  }

  /**
   * Habilitar Google Ads
   */
  function enableGoogleAds() {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
      console.log('📢 Google Ads habilitado');
    }
  }

  /**
   * Desabilitar scripts não essenciais
   */
  function disableNonEssentialScripts() {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
  }

  /**
   * Definir cookie
   */
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/;SameSite=Lax';
  }

  /**
   * Obter cookie
   */
  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * API pública
   */
  window.CookieConsent = {
    accept: handleAccept,
    reject: handleReject,
    showBanner: function() {
      // limpa o cookie (opcional) para “resetar” a escolha
      const consent = getCookie(COOKIE_NAME);
      console.log('🔁 Reabrindo banner, consentimento anterior:', consent);
      if (consent) {
        setCookie(COOKIE_NAME, '', -1);
      }
      // se o banner tiver sido removido do DOM, não dá para recriar aqui
      // por isso é importante que o banner permaneça no DOM quando você quiser reusar
      if (!banner) {
        banner = document.getElementById('cookieConsent');
      }
      showBanner();
    },
    getConsent: function() {
      return getCookie(COOKIE_NAME);
    }
  };

  // Inicializar imediatamente quando o script for carregado
  console.log('🍪 Cookie Consent inicializado');
  initCookieBanner();

})();

console.log('🚀 Cookie Consent carregado!');
