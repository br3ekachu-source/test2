import { Input } from 'antd';

export const InputEmail = () => {
    return (
        <Input
            readOnly
            placeholder='Электронная почта'
            spellCheck='false'
            autoCorrect='off'
            autoComplete='off'
            onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
        />
    );
};
