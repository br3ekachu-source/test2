<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\AdvertsChartWidget;
use App\Filament\Widgets\AdvertsStatsWidget;
use App\Filament\Widgets\UsersStatsWidget;
use Filament\Pages\Dashboard as BasePage;

class Dashboard extends BasePage
{
    protected static ?string $navigationLabel = 'Панель управления';
    protected static ?string $title = 'Обзор системы';

    protected function getHeaderWidgets(): array
    {
        return [
            UsersStatsWidget::class,
            AdvertsStatsWidget::class,
            AdvertsChartWidget::class,
        ];
    }
    
    public function getColumns(): int|string|array
    {
        return 2;
    }
}