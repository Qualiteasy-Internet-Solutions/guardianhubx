$(document).ready(function () {
  const translations = {
    es: {
      "about-title": "Sobre Nosotros",
      "about-description": "En GuardianHubX, ofrecemos una solución integral para tus necesidades de ciberseguridad...",
      "solutions-title": "Nuestros Partners",
      "solution-faronics-desc": "Gestión integral del sistema y protección contra amenazas cibernéticas, incluido el ransomware.",
      "solution-nordlayer-desc": "Asegura el acceso remoto de tu equipo con soluciones avanzadas de VPN.",
      "solution-nordpass-desc": "Gestión segura de contraseñas para empresas e individuos.",
      "solution-edgewatch-desc": "Detección de amenazas en tiempo real y defensa cibernética proactiva.",
      "solution-outkept-desc": "Formación en phishing para empleados con simulaciones realistas y análisis detallados.",
      "solution-acronis-desc": "Copias de seguridad confiables y soluciones de recuperación ante desastres para datos críticos.",
      "contact-title": "Contáctanos",
      "contact-get-in-touch": "Ponte en Contacto",
      "contact-email": "<strong>Correo:</strong> <a href='mailto:info@guardianhubx.com'>info@guardianhubx.com</a>",
      "contact-phone": "<strong>Teléfono:</strong> <a href='tel:+34934153115'>+34 93 415 31 15</a>",
      "form-name": "Nombre:",
      "form-email": "Correo Electrónico:",
      "form-message": "Mensaje:",
      "form-solutions": "Selecciona las soluciones que te interesan <span class='text-danger'>*</span>:",
      "form-solutions-error": "Por favor, selecciona al menos una solución.",
      "form-submit": "Enviar",
      "footer-text": "&copy; 2024 GuardianHubX. Todos los derechos reservados.",
      "thanks": "Gracias, hemos recibido vuestro mensaje, nos pondemos en contacto en breve.",
      "goback": "Volver a la página inicial",
    },
    en: {
      "about-title": "About Us",
      "about-description": "At GuardianHubX, we provide an integrated solution for your cybersecurity needs...",
      "solutions-title": "Our Partners",
      "solution-faronics-desc": "Comprehensive system management and protection against cyber threats, including ransomware.",
      "solution-nordlayer-desc": "Secure your team's remote access with advanced VPN solutions.",
      "solution-nordpass-desc": "Secure password management for businesses and individuals.",
      "solution-edgewatch-desc": "Real-time threat detection and proactive cyber defense.",
      "solution-outkept-desc": "Phishing training for employees with realistic simulations and detailed analytics.",
      "solution-acronis-desc": "Reliable backup and disaster recovery solutions for critical data.",
      "contact-title": "Contact Us",
      "contact-get-in-touch": "Get in Touch",
      "contact-email": "<strong>Email:</strong> <a href='mailto:info@guardianhubx.com'>info@guardianhubx.com</a>",
      "contact-phone": "<strong>Phone:</strong> <a href='tel:+34934153115'>+34 93 415 31 15</a>",
      "form-name": "Name:",
      "form-email": "Email:",
      "form-message": "Message:",
      "form-solutions": "Select the solutions you're interested in <span class='text-danger'>*</span>:",
      "form-solutions-error": "Please select at least one solution.",
      "form-submit": "Submit",
      "footer-text": "&copy; 2024 GuardianHubX. All rights reserved.",
      "thanks": "Thanks, we received your message. We will contact you soon.",
      "goback": "Go back to the homepage",
    },
  };

  let loadCounter = 0;

  function checkIfAllLoaded() {
    if (loadCounter === 3) {
      $("body").removeClass("loading").addClass("loaded");
      applyInitialLanguage();
    }
  }

  function changeLanguage(lang) {    
    $("[data-key]").each(function () {
      const key = $(this).data("key");
      if (translations[lang] && translations[lang][key]) {
        if ($(this).is("input, textarea")) {
          $(this).val(translations[lang][key]);
        } else {
          $(this).html(translations[lang][key]);
        }
      }
    });
    $("html").attr("lang", lang);
    $("#languageSwitcher").val(lang);
    $('input[name=_next]').val(`https://guardianhubx.com/thanks.html?idioma=${lang}`);
    updateGoBackLink(lang);
  }

  function updateGoBackLink(lang) {
    const goBackLink = $("#goback");
    if (goBackLink.length > 0) {
      const currentHref = goBackLink.attr("href") ? goBackLink.attr("href").split("?")[0] : "index.html";
      goBackLink.attr("href", `${currentHref}?idioma=${lang}`);
    }
  }

  function getLanguageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("idioma");
  }

  function applyInitialLanguage() {
    const languageFromURL = getLanguageFromURL();
    const defaultLanguage = languageFromURL || "en";
    changeLanguage(["es", "en"].includes(defaultLanguage) ? defaultLanguage : "en");
  }

  // Delegar el evento del selector de idioma
  $(document).on("change", "#languageSwitcher", function () {
    const lang = $(this).val();
    if (lang === "es" || lang === "en") {
      changeLanguage(lang);
    }
  });

  // Carga dinámica de las secciones
  $.get("head.html", function (data) {
    $("#common-head").html(data);
    loadCounter++;
    checkIfAllLoaded();
  });

  $("#header-container").load("header.html", function () {
    loadCounter++;
    checkIfAllLoaded();
  });

  $("#footer-container").load("footer.html", function () {
    loadCounter++;
    checkIfAllLoaded();
  });
});
