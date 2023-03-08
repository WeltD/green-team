import React from 'react'
import { Card } from 'antd'
import styles from './index.module.css'

const StatsCard = (props) => {

    const {img, number, precetage, label } = props

  return (
    <Card bordered={false} style={{ width: 300 }}>
        <div className= {styles.card}>

            <img className = {styles.image} src={img}></img>

            <div className= {styles.content}>

                <div className= {styles.number}>
                    {number}
                </div>

                <div className= {styles.percentage}>
                    {precetage}%
                </div>

            </div>

            <div className={styles.label}>
                {label}
            </div>
        </div>
    </Card>
  )
}

export default StatsCard