<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdvertResource\Pages;
use App\Filament\Resources\AdvertResource\RelationManagers;
use App\Http\Services\AdvertState;
use App\Http\Services\AdvertStateOnRU;
use App\Http\Services\Consts;
use App\Http\Services\ExploitationType;
use App\Models\Advert;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Log;

class AdvertResource extends Resource
{
    protected static ?string $model = Advert::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Разделы';

    protected static ?string $navigationLabel = 'Объявления';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Основная информация
                Forms\Components\Section::make('Основная информация')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->label('Пользователь')
                            ->native(false)
                            ->required(),
                        Forms\Components\Select::make('advert_type')
                            ->required()
                            ->label('Тип объявления')
                            ->options(Consts::getAdvertTypes())
                            ->native(false),
                        Forms\Components\TextInput::make('registration_number')
                            ->required()
                            ->label('Регистрационный номер')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('price')
                            ->numeric()
                            ->label('Цена')
                            ->prefix('₽'),
                        Forms\Components\Select::make('state')
                            ->options(AdvertState::arrayOnRU())
                            ->required()
                            ->native(false),
                        Forms\Components\TextInput::make('header')
                            ->label('Заголовок')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description')
                            ->label('Описание')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('phone_number')
                            ->label('Номер телефона')
                            ->required()
                            ->maxLength(255),
                    ])
                    ->columns(2),
                
                // Юридическая информация
                Forms\Components\Section::make('Юридическая информация')
                    ->relationship('advertLegalInformation')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Название судна')
                            ->required(),
                        Forms\Components\TextInput::make('flag')
                            ->label('Флаг')
                            ->required()
                            ->maxLength(2),
                        Forms\Components\Select::make('exploitation_type')
                            ->options(Consts::getExploitationType())
                            ->label('Тип эксплуатации')
                            ->required()
                            ->native(false)
                            ->formatStateUsing(function ($state) {
                                if (array_key_exists($state, Consts::getExploitationType())) {
                                    return $state;
                                }
                                return array_search($state, Consts::getExploitationType());
                            }),
                        Forms\Components\TextInput::make('class_formula')
                            ->label('Формула класса'),
                        Forms\Components\TextInput::make('wave_limit')
                            ->label('Ограничение по волне')
                            ->numeric(),
                        Forms\Components\Select::make('type')
                            ->options(Consts::getVesselTypes())
                            ->label('Тип судна')
                            ->native(false)
                            ->required()
                            ->formatStateUsing(function ($state) {
                                if (array_key_exists($state, Consts::getVesselTypes())) {
                                    return $state;
                                }
                                return array_search($state, Consts::getVesselTypes());
                            }),
                        Forms\Components\TextInput::make('purpose')
                            ->label('Назначение'),
                        Forms\Components\Toggle::make('was_registered')
                            ->label('Было зарегистрировано'),
                        Forms\Components\DatePicker::make('register_valid_until')
                            ->label('Регистрация действительна до'),
                        Forms\Components\Select::make('vessel_status')
                            ->options(Consts::getVesselStatuses())
                            ->native(false)
                            ->label('Статус судна')
                            ->formatStateUsing(function ($state) {
                                if (array_key_exists($state, Consts::getVesselStatuses())) {
                                    return $state;
                                }
                                return array_search($state, Consts::getVesselStatuses());
                            }),
                        Forms\Components\TextInput::make('project_number')
                            ->label('Номер проекта'),
                        Forms\Components\TextInput::make('building_number')
                            ->label('Строительный номер'),
                        Forms\Components\TextInput::make('building_year')
                            ->label('Год постройки')
                            ->numeric(),
                        Forms\Components\TextInput::make('building_place')
                            ->label('Место постройки'),
                        Forms\Components\TextInput::make('imo_number')
                            ->label('IMO номер'),
                        Forms\Components\Toggle::make('technical_documentation')
                            ->label('Техдокументация'),
                    ])
                    ->columns(2),
                
                // Техническая информация
                Forms\Components\Section::make('Техническая информация')
                    ->relationship('advertTechnicalInformation')
                    ->schema([
                        Forms\Components\TextInput::make('overall_length')
                            ->label('Габаритная длина (м)')
                            ->numeric(),
                        Forms\Components\TextInput::make('overall_width')
                            ->label('Габаритная ширина (м)')
                            ->numeric(),
                        Forms\Components\TextInput::make('board_height')
                            ->label('Высота борта (м)')
                            ->numeric(),
                        Forms\Components\TextInput::make('draft_in_cargo')
                            ->label('Осадка в грузу (м)')
                            ->numeric(),
                        Forms\Components\Select::make('material')
                            ->options(Consts::getMaterials())
                            ->label('Материал корпуса')
                            ->native(false)
                            ->formatStateUsing(function ($state) {
                                if (array_key_exists($state, Consts::getMaterials())) {
                                    return $state;
                                }
                                return array_search($state, Consts::getMaterials());
                            }),
                        Forms\Components\TextInput::make('deadweight')
                            ->label('Дедвейт (т)')
                            ->numeric(),
                        Forms\Components\TextInput::make('dock_weight')
                            ->label('Доковый вес (т)')
                            ->numeric(),
                        Forms\Components\TextInput::make('full_displacement')
                            ->label('Водоизмещение (т)')
                            ->numeric(),
                        Forms\Components\TextInput::make('gross_tonnage')
                            ->label('Валовая вместимость')
                            ->numeric(),
                        Forms\Components\TextInput::make('num_engines')
                            ->label('Кол-во двигателей')
                            ->numeric(),
                        Forms\Components\TextInput::make('num_additional_engines')
                            ->label('Кол-во вспом. двигателей')
                            ->numeric(),
                        Forms\Components\TextInput::make('power')
                            ->label('Мощность (л.с.)')
                            ->numeric(),
                        Forms\Components\TextInput::make('maximum_speed')
                            ->label('Макс. скорость (узлов)')
                            ->numeric(),
                        Forms\Components\Toggle::make('cargo_tanks')
                            ->label('Грузовые танки'),
                        Forms\Components\TextInput::make('total_capacity_cargo_tanks')
                            ->label('Объем грузовых танков (м³)')
                            ->numeric(),
                        Forms\Components\Toggle::make('second_bottom')
                            ->label('Второе дно'),
                        Forms\Components\Toggle::make('second_sides')
                            ->label('Вторые борта'),
                        Forms\Components\TextInput::make('carrying')
                            ->label('Грузоподъемность (т)')
                            ->numeric(),
                        Forms\Components\Toggle::make('liquid_tanks')
                            ->label('Наливные танки'),
                        Forms\Components\TextInput::make('total_capacity_liquid_tanks')
                            ->label('Объем наливных танков (м³)')
                            ->numeric(),
                        Forms\Components\Toggle::make('passangers_avialable')
                            ->label('Пассажировместимость'),
                        Forms\Components\TextInput::make('num_passangers')
                            ->label('Кол-во пассажиров')
                            ->numeric(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Пользователь')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('advert_type')
                    ->label('Тип объявления')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('registration_number')
                    ->label('Регистрационный номер')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->label('Цена')
                    ->money()
                    ->sortable(),
                Tables\Columns\TextColumn::make('state')
                    ->label('Статус объявления')
                    ->sortable(),
                Tables\Columns\TextColumn::make('header')
                    ->label('Заголовок')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone_number')
                    ->label('Номер телефона')
                    ->searchable(),
                Tables\Columns\TextColumn::make('fracht_type')
                    ->label('Тип фрахта')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('fracht_price_type')
                    ->label('Тип цены фрахта')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Дата создания')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Дата обновления')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('advertLegalInformation.name')
                    ->label('Название судна')
                    ->searchable(),
                Tables\Columns\TextColumn::make('advertTechnicalInformation.overall_length')
                    ->label('Длина')
                    ->suffix(' м'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('state')
                    ->options(AdvertState::arrayOnRU())
                    ->label('Статус'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    // public static function getRelations(): array
    // {
    //     return [
    //         RelationManagers\AdvertLegalInformationRelationManager::class,
    //         RelationManagers\AdvertTechnicalInformationRelationManager::class,
    //     ];
    // }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAdverts::route('/'),
            'create' => Pages\CreateAdvert::route('/create'),
            'edit' => Pages\EditAdvert::route('/{record}/edit'),
        ];
    }
}
