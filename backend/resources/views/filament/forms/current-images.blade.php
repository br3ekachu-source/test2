<div class="space-y-4">
    <label class="block text-sm font-medium text-gray-700">Текущие изображения</label>
    
    @if($record && $record->images)
        <div class="grid grid-cols-3 gap-2">
            @foreach($record->images as $index => $image)
                <div class="relative group rounded-md overflow-hidden border border-gray-200">
                    <img src="{{ $image }}" 
                         class="w-full h-24 object-cover"
                         alt="Изображение {{ $index + 1 }}">
                         
                    <button type="button"
                            wire:click="removeImage({{ $index }})"
                            class="absolute top-1 right-1 opacity-0 group-hover:opacity-100
                                   bg-red-500 text-white rounded-full p-1 text-xs
                                   transition-opacity duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            @endforeach
        </div>
    @else
        <p class="text-sm text-gray-500">Нет загруженных изображений</p>
    @endif
</div>