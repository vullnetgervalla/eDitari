import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Unauthorized = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto text-center">
                <h1 className="text-6xl font-bold">401</h1>
                <h2 className="text-2xl">{t('unauthorized')}</h2>
                <h3>{t('redirecting')}</h3>
            </div>
        </div>
    )
}