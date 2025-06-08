<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UsersStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Всего пользователей', User::count())
                ->description('Зарегистрировано')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success'),
                
            Stat::make('Подтвержденные', User::whereNotNull('email_verified_at')->count())
                ->description('С подтвержденным email')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('primary'),
                
            Stat::make('Новые за месяц', User::where('created_at', '>=', now()->subMonth())->count())
                ->description('За последние 30 дней')
                ->descriptionIcon('heroicon-m-arrow-path-rounded-square')
                ->color('info'),
        ];
    }
}