import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import '../../../node_modules/flag-icons/css/flag-icons.min.css';

const languages = [
    { code: 'al', name: 'AL', flag: 'al' },
    { code: 'en', name: 'EN', flag: 'gb' },
    { code: 'sr', name: 'SR', flag: 'rs' },
];

const { Option } = Select;

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language || 'al';

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem('language', code);
    };

    return (
        <Select
            value={currentLanguage}
            onChange={changeLanguage}
        >
            {languages.map((lang) => (
                <Option key={lang.code} value={lang.code}>
                    <span className={`fi fi-${lang.flag} mr-2`} />
                    {lang.name}
                </Option>
            ))}
        </Select>
    );
};

export default LanguageSwitcher;

