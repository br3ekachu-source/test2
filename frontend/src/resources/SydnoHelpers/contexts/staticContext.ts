import { HookAPI } from 'antd/lib/modal/useModal';
import { createContext } from 'react';

interface IStaticContext {
    modal: HookAPI | null;
}

/**
 * Контекст с статичными элементами
 * modal находится в этом контексте чтобы тот подхватывал стили
 */
export const StaticContext = createContext<IStaticContext>({ modal: null });
