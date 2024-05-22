import { Flex, Card } from 'antd';
import React from 'react';
import moment from 'moment';

export default function NotificationCard({date, title, description}){
    return(
        <div style={{width:'60%', margin: '0 auto'}}>
            <Flex>
                <Card style={{width:'100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'} } >
                    <div style={{width: '20%'}}>
                        <h3 style={{color:'#6b7280'}}>{moment(date).format('DD/MM/YYYY')}</h3>
                        <hr />
                    </div>
                    <h2>{title}</h2>
                    <p style={{color: '#4b5563'}}>{description}</p>
                </Card>
            </Flex>
        </div>
    )
}