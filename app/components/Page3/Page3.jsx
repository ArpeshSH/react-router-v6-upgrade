import React from 'react'
import {Link} from 'react-router-dom'
import RoutePaths from '../RoutePaths'
const Page3 = () => {
  return (
    <>
    <div>Page3</div>
    <Link to={`${RoutePaths.page2}`} label='Go to Page2'>Go To page2</Link><br/>
    <Link to={`${RoutePaths.basepath}`} label='Go to Welcome'>Go To Welcome</Link>
    </>
  )
}

export default Page3
