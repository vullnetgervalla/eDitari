import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import { Row, Col } from 'antd';

export default function MyCalendar() {
    const { t } = useTranslation();
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState([
        {
            title: t('newYearDay'),
            start: new Date(2024, 12, 1),
            end: new Date(2025, 0, 3),
            allDay: true,
            eventColor:'#1677ff'
        },
        {
            title: t('catolicChristmas'),
            start: new Date(2024, 11, 25),
            end: new Date(2024, 11, 26),
            allDay: true,
            eventColor:'#1677ff'
        },
        {
            title: t('orthodoxChristmas'),
            start: new Date(2024, 0, 7),
            end: new Date(2024, 0, 8),
            allDay: true,
            eventColor:'#1677ff'
        },
        {
            title: t('independenceDay'),
            start: new Date(2024, 1, 17),
            end: new Date(2024, 1, 18),
            allDay: true,
            eventColor:'#1677ff'
        },
        {
            title: t('mayFirst'),
            start: new Date(2024, 4, 1),
            end: new Date(2024, 4, 2),
            allDay: true,
            eventColor:'#1677ff'
        },
        {
            title: t('constitutionDay'),
            start: new Date(2024, 3, 9),
            end: new Date(2024, 3, 10),
            allDay: true,
            eventColor:'#1677ff'
        },
        {
            title: t('europeDay'),
            start: new Date(2024, 4, 9),
            end: new Date(2024, 4, 10),
            allDay: true,
            eventColor:'#1677ff'
        },
        // Add more leave days here
    ]);

    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        const newEvent = {
            title: title,
            start: new Date(startDate),
            end: new Date(endDate),
            allDay: true,
            eventColor:'#1677ff'
        };

        setEvents([...events, newEvent]);
    };
    return (
        <div style={{ height: '50vh' }}>
            {/* <Form onFinish={handleSubmit}>
                <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                    <Input value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="Start Date" name="startDate" rules={[{ required: true }]}>
                    <DatePicker value={startDate} onChange={date => setStartDate(date)} format='YYYY-MM-DD' />
                </Form.Item>
                <Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
                    <DatePicker value={endDate} onChange={date => setEndDate(date)} format='YYYY-MM-DD' />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Event
                    </Button>
                </Form.Item>
            </Form> */}

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView='month'
                views={['month', 'week', 'day']}
            />
        </div>
    );
}