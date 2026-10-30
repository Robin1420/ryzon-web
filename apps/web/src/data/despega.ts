import type { LegalDocument } from "./types";

/**
 * Despega: app de Android que convierte los stickers de comentarios de TikTok en paquetes de stickers de WhatsApp.
 * Los textos legales son los mismos que se muestran dentro de la app: si cambian allí, cambian aquí.
 */
export const despegaApp = {
  name: "Despega",
  label: "App",
  title: "Tus stickers de TikTok, en WhatsApp.",
  text: "Despega convierte el sticker de un comentario de TikTok en un sticker de WhatsApp con un toque. Compartes el comentario, eliges el paquete y listo. Es gratis y funciona en Android.",
  independent: "Despega es independiente: no está afiliada, respaldada ni patrocinada por TikTok, ByteDance, WhatsApp ni Meta.",
  developer: "Programada por Ryzon",
  linksLabel: "Documentos legales",
};

const UPDATED = "30 de octubre de 2026";

/** Se cambia aquí cuando haya correo real. Debe coincidir con `legal_contact` en la app. */
const CONTACT = "[correo de contacto]";

export const despegaTerms: LegalDocument = {
  slug: "terminos",
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso de Despega, la app que convierte stickers de TikTok en stickers de WhatsApp.",
  updated: UPDATED,
  sections: [
    {
      title: "1. Qué es Despega",
      body: "Despega es una app gratuita que convierte los stickers de comentarios de TikTok, y las fotos o videos de tu galería, en paquetes de stickers para WhatsApp.",
    },
    {
      title: "2. Somos independientes",
      body: "Despega no está afiliada, respaldada ni patrocinada por TikTok, ByteDance, WhatsApp ni Meta. Esos nombres y logos pertenecen a sus dueños.",
    },
    {
      title: "3. Tu contenido y tus derechos",
      body: "Tú decides qué stickers guardas y compartes, y eres responsable de ellos. Úsalos solo si tienes derecho a hacerlo o para uso personal, y respeta los derechos de autor y las normas de TikTok y WhatsApp. No uses Despega para acosar, engañar ni difundir contenido ilegal u ofensivo.",
    },
    {
      title: "4. Cómo funciona",
      body: "Cuando compartes o pegas un enlace, Despega consulta TikTok desde tu teléfono para descargar el sticker. Los stickers se guardan dentro de la app y WhatsApp los lee cuando tú aceptas agregarlos. Si TikTok o WhatsApp cambian algo, Despega puede dejar de funcionar hasta que se actualice.",
    },
    {
      title: "5. Estadísticas y anuncios",
      body: "Despega cuenta, de forma anónima, cuántas veces se usa (por ejemplo, cuántos stickers se agregan) para saber si funciona y mejorarla. Puedes apagarlo en Ajustes. La app es gratis y se paga con anuncios: los primeros 3 stickers no llevan anuncio y, después, cada 3 stickers que agregas eliges ver un anuncio corto para seguir. Nunca se muestra un anuncio sin que lo pidas. Los detalles están en la Política de privacidad.",
    },
    {
      title: "6. Sin garantías",
      body: "La app se ofrece «tal cual», sin garantía de que funcione siempre ni sin errores. No nos hacemos responsables por stickers perdidos ni por contenido o cuentas de terceros.",
    },
    {
      title: "7. Cambios",
      body: "Podemos actualizar estos términos. Si el cambio es importante, te lo mostraremos al abrir la app y tendrás que aceptarlo para seguir usándola. Si cambiamos cómo funcionan los anuncios, también lo explicaremos aquí.",
    },
    {
      title: "8. Contacto",
      body: `Dudas o reclamos: ${CONTACT}. Desarrollador: Ryzon.`,
    },
  ],
};

export const despegaPrivacy: LegalDocument = {
  slug: "privacidad",
  title: "Política de privacidad",
  description: "Política de privacidad de Despega: qué datos usa la app, qué datos no recoge y cómo controlar las estadísticas y los anuncios.",
  updated: UPDATED,
  sections: [
    {
      title: "1. En resumen",
      body: "Despega no te pide cuenta, correo, nombre ni número de teléfono. Tus stickers se quedan en tu teléfono.",
    },
    {
      title: "2. Lo que se guarda en tu teléfono",
      body: "Tus stickers y paquetes, tus ajustes, el conteo de lo que haces en la app y cuántos stickers te quedan antes del próximo anuncio. Todo se borra si desinstalas la app o borras sus datos.",
    },
    {
      title: "3. Enlaces de TikTok",
      body: "Cuando compartes o pegas un enlace, tu teléfono lo consulta en los servidores de TikTok para descargar el sticker. TikTok puede ver tu dirección IP y esa petición, igual que si abrieras el enlace en un navegador. Despega no guarda el enlace.",
    },
    {
      title: "4. WhatsApp",
      body: "Cuando aceptas agregar un paquete, WhatsApp lee los stickers del paquete desde Despega. Despega anota en tu teléfono que WhatsApp los leyó, solo para confirmártelo.",
    },
    {
      title: "5. Estadísticas de uso",
      body: "Si no las apagas en Ajustes, Despega envía a Google (Firebase Analytics) el nombre de acciones sencillas, como «sticker agregado» o «anuncio visto». No incluye enlaces, stickers ni nombres. Google puede asociarlas a un identificador de instalación y a datos generales como el país o el modelo del teléfono. Apagarlo detiene el envío.",
    },
    {
      title: "6. Anuncios",
      body: "Despega muestra anuncios de Google AdMob solo cuando tú eliges verlos. AdMob puede usar el identificador de publicidad de tu teléfono y datos del dispositivo para mostrar y medir anuncios. En algunos países Google te pide primero tu consentimiento, y podrás cambiarlo en Ajustes. También puedes restablecer o desactivar el identificador de publicidad en los ajustes de Android.",
    },
    {
      title: "7. Menores de edad",
      body: "Despega no está dirigida a menores de 13 años. Si eres menor, úsala con un adulto.",
    },
    {
      title: "8. Tus opciones",
      body: `Puedes apagar las estadísticas en Ajustes, borrar tus stickers desde la app y borrar todo desinstalándola. Para dudas sobre tus datos escribe a ${CONTACT}.`,
    },
    {
      title: "9. Cambios",
      body: "Si esta política cambia, te lo mostraremos al abrir la app antes de seguir usándola.",
    },
  ],
};

export const despegaDocuments: LegalDocument[] = [despegaPrivacy, despegaTerms];
