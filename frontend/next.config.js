/** @type {import('next').NextConfig} */

module.exports = {
  output: 'export',  // Ключевая настройка для SPA
  trailingSlash: true, // Для корректных путей
  images: {
    unoptimized: true, // Отключаем оптимизацию изображений
  },
  // Доп. настройки если используете роутер Next.js
  experimental: {
    appDir: false, // Для pages/ роутера
  }
}