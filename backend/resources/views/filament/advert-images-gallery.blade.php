<div class="grid grid-cols-4 gap-4">
    @foreach($getState() as $image)
        <div class="relative group">
            <img 
                src="{{ asset('storage/' . $image) }}" 
                alt="Изображение объявления" 
                class="w-full h-32 object-cover rounded-lg"
            >
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                    href="{{ asset('storage/' . $image) }}" 
                    target="_blank" 
                    class="text-white hover:text-blue-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </a>
            </div>
        </div>
    @endforeach
</div>