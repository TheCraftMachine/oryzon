<?php
declare(strict_types=1);

// ─────────────────────────────────────────────────────────────────────────────
//  contact.php — endpoint du formulaire de contact (Brevo)
//
//  À uploader à la racine du site sur OVH (au même niveau que index.html).
//  Le formulaire React poste ici en POST, on transmet via l'API Brevo.
// ─────────────────────────────────────────────────────────────────────────────

// ── Configuration ────────────────────────────────────────────────────────────
// Clé API Brevo : créer un compte gratuit sur https://app.brevo.com puis
// SMTP & API → API Keys → Create a new API key.
const BREVO_API_KEY    = 'REMPLACER_PAR_VOTRE_CLE_BREVO';

// Destinataire (boîte qui reçoit les leads)
const RECIPIENT_EMAIL  = 'contact@maison-oryzon.fr';
const RECIPIENT_NAME   = 'Oryzon';

// Expéditeur (DOIT être sur un domaine vérifié dans Brevo →
// Senders, Domains & Dedicated IPs → Domains → Add).
// Le plus propre : vérifier "maison-oryzon.fr" et utiliser une adresse no-reply.
const SENDER_EMAIL     = 'no-reply@maison-oryzon.fr';
const SENDER_NAME      = 'Formulaire Oryzon';

// ── Toujours répondre en JSON ────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// ── Récupération des champs ──────────────────────────────────────────────────
$name        = trim((string)($_POST['name']         ?? ''));
$email       = trim((string)($_POST['email']        ?? ''));
$phone       = trim((string)($_POST['phone']        ?? ''));
$projectType = trim((string)($_POST['project_type'] ?? ''));
$message     = trim((string)($_POST['message']      ?? ''));
$consent     =       (string)($_POST['consent']     ?? '');
$botcheck    =       (string)($_POST['botcheck']    ?? '');

// ── Honeypot : bot détecté → on simule un succès en silence ─────────────────
if ($botcheck !== '') {
    echo json_encode(['success' => true]);
    exit;
}

// ── Validation ───────────────────────────────────────────────────────────────
$errors = [];
if ($name === '')                                                 $errors[] = 'name';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL))  $errors[] = 'email';
if ($phone === '')                                                $errors[] = 'phone';
if ($projectType === '')                                          $errors[] = 'project_type';
if ($message === '')                                              $errors[] = 'message';
if ($consent === '')                                              $errors[] = 'consent';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Champs invalides : ' . implode(', ', $errors)]);
    exit;
}

// ── Construction de l'email ──────────────────────────────────────────────────
$h = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');

$subject = "Nouveau contact — {$projectType} ({$name})";

$htmlBody = '<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px;background:#f9f7f4;">
  <div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 1px 3px rgba(0,0,0,.04);">
    <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#ba873f;margin:0 0 8px;">Nouveau contact</p>
    <h2 style="margin:0 0 24px;font-weight:500;color:#111;">' . $h($projectType) . '</h2>

    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#444;">
      <tr><td style="padding:8px 0;color:#888;width:120px;">Nom</td><td style="padding:8px 0;">' . $h($name) . '</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:' . $h($email) . '" style="color:#ba873f;">' . $h($email) . '</a></td></tr>
      <tr><td style="padding:8px 0;color:#888;">Téléphone</td><td style="padding:8px 0;"><a href="tel:' . $h($phone) . '" style="color:#ba873f;">' . $h($phone) . '</a></td></tr>
    </table>

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">

    <p style="margin:0 0 8px;color:#888;font-size:13px;">Message</p>
    <p style="margin:0;white-space:pre-wrap;line-height:1.6;">' . $h($message) . '</p>
  </div>
  <p style="font-size:11px;color:#aaa;text-align:center;margin-top:16px;">Envoyé via le formulaire de maison-oryzon.fr</p>
</body></html>';

$textBody = "Nouveau contact via le site\n\n"
    . "Type de projet : {$projectType}\n"
    . "Nom : {$name}\n"
    . "Email : {$email}\n"
    . "Téléphone : {$phone}\n\n"
    . "Message :\n{$message}\n";

// ── Appel API Brevo ──────────────────────────────────────────────────────────
$payload = json_encode([
    'sender'      => ['name' => SENDER_NAME, 'email' => SENDER_EMAIL],
    'to'          => [['email' => RECIPIENT_EMAIL, 'name' => RECIPIENT_NAME]],
    'replyTo'     => ['email' => $email, 'name' => $name],
    'subject'     => $subject,
    'htmlContent' => $htmlBody,
    'textContent' => $textBody,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$ch = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'accept: application/json',
        'content-type: application/json',
        'api-key: ' . BREVO_API_KEY,
    ],
    CURLOPT_TIMEOUT        => 15,
]);

$response = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
    exit;
}

// Échec — on loggue côté serveur sans exposer les détails à l'utilisateur
error_log("[contact.php] Brevo HTTP {$httpCode}: {$response}");
http_response_code(502);
echo json_encode(['success' => false, 'error' => "Erreur lors de l'envoi. Merci de réessayer ou de nous appeler au 02 31 348 340."]);
