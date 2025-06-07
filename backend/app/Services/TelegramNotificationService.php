<?php

namespace App\Services;

use App\Http\Services\Consts;
use Illuminate\Support\Facades\Http;
use App\Models\Advert;
use Illuminate\Support\Facades\Log;

class TelegramNotificationService
{
    public function sendNewAdvertNotification(Advert $advert): bool
    {
        try {
            $botToken = config('services.telegram.bot_token');
            $chatId = config('services.telegram.channel_id');

            if (empty($botToken) || empty($chatId)) {
                throw new \Exception('Telegram configuration is incomplete');
            }

            // Только для production - замените на ваш реальный домен
            $editUrl = app()->isProduction()
                ? 'https://ваш-домен.ru/admin/adverts/'.$advert->id.'/edit'
                : null;

            $message = $this->buildMessage($advert, $editUrl);

            $requestData = [
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'HTML',
                'disable_web_page_preview' => true
            ];

            // Добавляем кнопку только для production
            if ($editUrl) {
                $requestData['reply_markup'] = json_encode([
                    'inline_keyboard' => [
                        [
                            [
                                'text' => '✏️ Редактировать объявление',
                                'url' => $editUrl
                            ]
                        ]
                    ]
                ]);
            }

            $response = Http::timeout(15)
                ->post("https://api.telegram.org/bot{$botToken}/sendMessage", $requestData);

            if ($response->failed()) {
                Log::error('Telegram API error', [
                    'status' => $response->status(),
                    'response' => $response->json(),
                    'request' => $requestData
                ]);
                return false;
            }

            return true;

        } catch (\Exception $e) {
            Log::error('Telegram notification failed: ' . $e->getMessage());
            return false;
        }
    }

    protected function buildMessage(Advert $advert, ?string $editUrl): string
    {
        $message = "<b>📢 Новое объявление на модерации!</b>\n"
            . "<b>🔹 ID:</b> {$advert->id}\n"
            . "<b>🔹 Тип:</b> " . (Consts::getAdvertTypes()[$advert->advert_type] ?? 'Неизвестно') . "\n"
            . "<b>🔹 Название:</b> {$advert->header}"
            . "<b>🔹 Цена:</b> {$advert->price}";

        if ($editUrl) {
            $message .= "\n<b>🔹 Ссылка:</b> <a href=\"{$editUrl}\">Перейти к редактированию</a>";
        } else {
            $message .= "\n<b>🔹 Ссылка:</b> (доступна только в production)";
        }

        return $message;
    }
}