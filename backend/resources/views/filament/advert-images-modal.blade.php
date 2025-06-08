<!-- resources/views/filament/advert-images-modal.blade.php -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    @foreach($images as $image)
    <div class="rounded-lg overflow-hidden border border-gray-200">
        <img 
            src="{{ $image }}" 
            alt="Изображение объявления"
            class="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            loading="lazy"
        >
    </div>
    @endforeach
</div>