import React, {useContext, useState} from 'react'
import { Portal } from '../Portal/Portal'
import { CityContext } from '../../context/city/cityContext'
import './CityDefinition.scss'
import { SelectList } from '../SelectList/SelectList'
import cityList from '../../reqests/city.list.json'
import { usePosition } from '../../reqests/geolocation/usePosition'
import { cityGeolocation } from '../../reqests/geolocation/cityGeolocation'
import PropTypes from 'prop-types'


export const CityDefinition = ({modal, setModal}) =>{

    const { city, selectCity } = useContext(CityContext)

    const [sel, setSel] = useState()
    const { latitude, longitude, error } = usePosition()

    const dataCity = () =>{
        const result = cityGeolocation(latitude, longitude, error, cityList)
        setSel(result)
    }
    
    return (
        <>
            { modal &&
                <Portal>
                    <div className='modalOverlay'>
                        <div className='modalOverlay__window'>
                            {city ? 
                            <div>
                                <p className='modalOverlay__header'>Weather is presented on the city of<span> </span>
                                <span className='modalOverlay__activeCity'>{city}</span>
                                </p>
                                <p className='modalOverlay__header'>  
                                <span onClick={dataCity} className='modalOverlay__activeCity'>Click</span> <span> </span>
                                 to automatically override your city
                                </p>
                            </div>
                            :
                            <p className='modalOverlay__header'>To define a city, <span> </span>
                            <span onClick={dataCity} className='modalOverlay__activeCity'>press</span>
                            , or select a city manually
                            </p>
                            }
                            <SelectList sel={sel} setSel={setSel} setModal={setModal} list={cityList} placeholder='Enter the name of the city' actSelect={selectCity} />
                        </div>
                    </div>
                </Portal>
            
            }
        </> 
    )
}

CityDefinition.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func
}

CityDefinition.defaultProps = {
    modal: false,
    setModal: () =>{}
}
