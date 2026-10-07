/* ---------------------------------------------------------------------------
   Envio de leads — front-only por padrao.

   VITE_LEADS_API vazio  -> modo mock: imprime o payload no console e devolve
                            sucesso. Nenhuma requisicao sai da maquina.
   VITE_LEADS_API setado -> POST JSON de verdade naquela URL.

   O endpoint do site original e trfpanel.trfautomation.com/api/leads. Apontar
   para la grava leads REAIS no CRM da Torfresma — nao use em teste.
   --------------------------------------------------------------------------- */

export interface LeadPayload {
  email: string;
  contactName?: string;
  company?: string;
  phone?: string;
  message: string;
  source: string;
  pageUrl: string;
  roiInputs?: Record<string, unknown>;
}

const API = import.meta.env.VITE_LEADS_API ?? '';

/** Dominios de e-mail gratuito que o original recusa (quer e-mail corporativo). */
export const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.co.uk', 'hotmail.fr',
  'outlook.com', 'live.com', 'msn.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.ca',
  'yahoo.com.br', 'ymail.com', 'rocketmail.com', 'aol.com', 'icloud.com',
  'me.com', 'mac.com', 'proton.me', 'protonmail.com', 'pm.me', 'gmx.com',
  'gmx.net', 'gmx.us', 'mail.com', 'zoho.com', 'zohomail.com', 'yandex.com',
  'yandex.ru', 'bol.com.br', 'uol.com.br', 'terra.com.br', 'ig.com.br',
  'comcast.net', 'verizon.net', 'att.net', 'sbcglobal.net', 'bellsouth.net',
  'cox.net', 'charter.net', 'earthlink.net', 'fastmail.com', 'tutanota.com',
  'tuta.io', 'hey.com', 'inbox.com', 'qq.com', '163.com', '126.com',
];

export function isWorkEmail(mail: string): boolean {
  const d = String(mail || '').split('@').pop()?.toLowerCase().trim() ?? '';
  return !FREE_EMAIL_DOMAINS.includes(d);
}

export async function sendLead(payload: LeadPayload): Promise<void> {
  if (!API) {
    // modo mock: nada sai daqui
    console.info('[lead] (mock — VITE_LEADS_API vazio)', payload);
    await new Promise((r) => setTimeout(r, 300));
    return;
  }
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('lead request failed: ' + res.status);
}

/** O sinal Global Privacy Control, lido pelo original para marcar o lead. */
export function hasGpc(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  );
}
