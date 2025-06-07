<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdvertResource\Pages;
use App\Filament\Resources\AdvertResource\RelationManagers;
use App\Http\Services\AdvertState;
use App\Http\Services\AdvertStateOnRU;
use App\Http\Services\Consts;
use App\Models\Advert;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

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
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Пользователь')
                    ->required(),
                Forms\Components\Select::make('advert_type')
                    ->required()
                    ->label('Тип объявления')
                    ->options(Consts::getAdvertTypes())
                    ->native(false),
                Forms\Components\TextInput::make('registration_number')
                    ->required()
                    ->label('Регистрационный номер')
                    ->maxLength(255),
                Forms\Components\TextInput::make('price')
                    ->numeric()
                    ->label('Цена')
                    ->prefix('₽'),
                Forms\Components\Select::make('state')
                    ->options(AdvertState::arrayOnRU())
                    ->required()
                    ->native(false), // Опционально - для красивого select
                Forms\Components\TextInput::make('images')
                    ->label('Картинки'),
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
                    ->tel()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('fracht_type')
                    ->label('Тип фрахта')
                    ->numeric(),
                Forms\Components\TextInput::make('fracht_price_type')
                    ->label('Тип цены фрахта')
                    ->numeric(),
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

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAdverts::route('/'),
            'create' => Pages\CreateAdvert::route('/create'),
            'edit' => Pages\EditAdvert::route('/{record}/edit'),
        ];
    }
}
