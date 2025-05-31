'use client';
import { Divider, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { MyDrafts } from '../widgets/MyAdverts/MyDrafts';
import { MyModeration } from '../widgets/MyAdverts/MyModeration';
import { sydnoServiceJson } from 'SydnoService/service';
import { MyActive } from 'Profile/widgets/MyAdverts/MyActive';
import { MyInactive } from 'Profile/widgets/MyAdverts/MyInactive';
import { MyFavorite } from 'Profile/widgets/Favorite/MyFavorite';

export interface IInfoMyAdverts {
    active: number;
    draft: number;
    inactive: number;
    moderation: number;
}

export const FavoriteProfile = () => {
    return (
        <div>
            <Typography.Title level={2}>Избранное</Typography.Title>
            <Divider />
            <MyFavorite />
        </div>
    );
};
