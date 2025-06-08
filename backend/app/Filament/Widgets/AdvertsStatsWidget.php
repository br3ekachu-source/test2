<?php

namespace App\Filament\Widgets;

use App\Models\Advert;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AdvertsStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Всего объявлений', Advert::count())
                ->description('Общее количество')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),
                
            Stat::make('Активные объявления', Advert::where('state', 3)->count())
                ->description('Опубликованные')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('primary'),
                
            Stat::make('На модерации', Advert::where('state', 2)->count())
                ->description('Ожидают проверки')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),
                
            Stat::make('Черновики', Advert::where('state', 1)->count())
                ->description('Неопубликованные')
                ->descriptionIcon('heroicon-m-document')
                ->color('gray'),
        ];
    }
}