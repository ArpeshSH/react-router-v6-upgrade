import React from 'react'
import {  useHistory } from 'react-router-dom'
import RoutePaths from '../RoutePaths';

const Page2 = () => {
    const history = useHistory();
    const onButtonClick = () => {
        history.push(`${RoutePaths.basepath}/page3`);
    }
  return (
    <>
    <div>Page2</div>
    <button onClick={onButtonClick}>Go to Page3</button>
    </>
  )
}

export default Page2
