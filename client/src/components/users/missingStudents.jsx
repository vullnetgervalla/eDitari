import React from 'react';
import { useTranslation } from 'react-i18next'
import { Card } from 'antd';

export default function MissingStudents() {
    const { t } = useTranslation();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const student = {
        name: 'John Doe',
        age: 20,
        major: 'Computer Science'
    };
    return (
        <div>
            <Card style={{borderRadius:'20px'}}>
                <h1>{t('missingStudents')}</h1>
                <hr />
                <div>
                    
                </div>
            </Card>
        </div>
    )
}