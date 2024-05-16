import { Flex, Statistic, Card, List, Avatar, Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NotificationCard({date, title, description}){
    return(
        <div style={{width:'60%', margin: '0 auto'}}>
            <Flex>
                <Card style={{width:'100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'} } >
                    <div style={{width: '20%'}}>
                        <h3 style={{color:'#6b7280'}}>{date}</h3>
                        <hr />
                    </div>
                    <h2>{title}</h2>
                    <p style={{color: '#4b5563'}}>{description}</p>
                </Card>
            </Flex>
        </div>
    )
}

// export default function NotificationCard(){
//     return(
//        <div style={{width:'80%', alignItems:'center'}}>
//          <Row gutter={20}>
//     <Col span={24}>
//       <Card title="Card title" bordered={false}>
//         Card content
//       </Card>
//     </Col>
//   </Row>
//        </div>
//     )
// }