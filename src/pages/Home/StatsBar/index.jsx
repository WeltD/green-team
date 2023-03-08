import React from 'react'
import pic from '../../../assets/images/people.png'
import StatsCard from '../../../components/StatsCard'
import styles from './index.module.css'


const arr = [
    {
      img: pic,
      number:  39354,
      precetage: -4,
      label: 'Customer'
    },
    {
      img: pic,
      number:  39354,
      precetage: -4,
      label: 'AV'
    },
    {
      img: pic,
      number:  39354,
      precetage: -4,
      label: 'Min'
    },
   
  ]

const StatsBar = () => {
  return (
    <div className={styles.bar}>

      {
        arr.map((item, index) => {
          return <div style={{marginLeft: '20px'}}>
                    <StatsCard img = {item.img} number = {item.number} precetage = {item.precetage} label = {item.label} key = {index}/>
                 </div>
        })
      }
    </div>
  
  )
}

export default StatsBar