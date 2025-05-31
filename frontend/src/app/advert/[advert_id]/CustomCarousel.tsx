'use client';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller, Keyboard, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/controller';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import './CustomCarousel.css';

import { MouseEvent, useState } from 'react';
import { Modal } from 'antd';
import { FavoriteButton } from 'Advert/features/FavoriteButton/FavoriteButton';

/**
 * Кастомный компонент для отображения изображений в виде карусели и модального окна с каруселью.
 *
 * @param slides Изображения карусели.
 * @param isLoading Промежуточное состояние кнопки пока не получен ответ о том было ли объявление добавлено в избранное.
 * @param isLocalFavorite Состояние кнопки, добавлено ли объявление в избранное.
 * @param likeButtonClickhandler Функция для добавления/удаления объявления из избранного.
 *
 * Author: [Gleb]
 */

interface CustomSliderProps {
    slides: string[];
    isDefaultFavorite?: boolean;
    id: number;
    title: string;
    screenSize: 'small' | 'middle' | 'big';
}

export const CustomCarousel: React.FC<CustomSliderProps> = ({ slides, isDefaultFavorite, id, title, screenSize }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [open, setOpen] = useState(false);

    return (
        <div className={screenSize === 'big' ? 'cursor-pointer' : ''}>
            <Swiper
                style={{ zIndex: '0' }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Controller, Keyboard]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{ enabled: true }}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => {
                    setCurrentSlide(swiper.realIndex);
                }}
                keyboard={{
                    enabled: true
                }}
            >
                <FavoriteButton
                    id={id}
                    isDefaultFavorite={isDefaultFavorite}
                    size='large'
                    className='fav-button'
                />

                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img className='slide' src={slide} alt={`Slide ${index + 1}`} onClick={() => setOpen(true)} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {screenSize === 'big' && open && (
                <ModalSwipper title={title} open={open} onCancel={() => setOpen(false)} slides={slides} currentSlide={currentSlide}/>
            )}
        </div>
    );
};


const ModalSwipper = ({
    open,
    onCancel,
    slides,
    currentSlide,
    title
}: {
    open: boolean,
    onCancel: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    slides: string[],
    currentSlide: number,
    title: string
}) => {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            title={title}
            centered
            width={'80vw'}
            classNames={{
                body: 'modal-swipper__container'
            }}
        >
            <Swiper
                modules={[Navigation, Pagination, Zoom]}
                zoom
                navigation
                initialSlide={currentSlide}
                pagination={{
                    clickable: true,
                }}
                className='modal-swipper__swipper'
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-zoom-container">
                            <img className='modal-swipper__image' src={slide} alt={`Slide ${index + 1}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Modal>
    );
}