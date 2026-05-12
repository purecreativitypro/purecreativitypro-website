/**
 * webhookService.ts — Centralized webhook dispatcher
 *
 * All form/scanner submissions route through the Firebase Cloud Function
 * proxy at /api/webhook. The actual n8n URL is server-side only.
 */

// ─── Payload Types ─────────────────────────────────────────────

export interface ScanData {
  email: string;
  name?: string;
  studio: string;
  questions: { question: string; answer: string }[];
  diagnosis: string;
  score: number;
  action: string;
}

export interface InquiryData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface SubscriberData {
  email: string;
}

export interface QuizData {
  email: string;
  name?: string;
  userType: string;
  answers: { question: string; answer: string }[];
  recommendedProduct: string;
}

interface WebhookPayload {
  event: 'scan_completed' | 'inquiry_submitted' | 'email_subscribed' | 'quiz_completed';
  timestamp: string;
  source: string;
  data: ScanData | InquiryData | SubscriberData | QuizData;
}

// ─── Core Dispatcher ───────────────────────────────────────────

const PROXY_URL = '/api/webhook';

async function dispatchWebhook(payload: WebhookPayload): Promise<void> {
  try {
    await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Non-blocking — Firestore is the source of truth
    console.warn('Webhook dispatch failed (non-blocking):', err);
  }
}

// ─── Public API ────────────────────────────────────────────────

export function sendScanResult(data: ScanData, source: string): void {
  dispatchWebhook({
    event: 'scan_completed',
    timestamp: new Date().toISOString(),
    source,
    data,
  });
}

export function sendInquiry(data: InquiryData, source: string): void {
  dispatchWebhook({
    event: 'inquiry_submitted',
    timestamp: new Date().toISOString(),
    source,
    data,
  });
}

export function sendSubscriber(data: SubscriberData, source: string): void {
  dispatchWebhook({
    event: 'email_subscribed',
    timestamp: new Date().toISOString(),
    source,
    data,
  });
}

export function sendQuizResult(data: QuizData, source: string): void {
  dispatchWebhook({
    event: 'quiz_completed',
    timestamp: new Date().toISOString(),
    source,
    data,
  });
}
