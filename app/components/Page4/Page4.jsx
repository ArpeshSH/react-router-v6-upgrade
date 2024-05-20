import React from 'react'
import RoutePaths from '../RoutePaths'
// import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Page4 = () => {
  const history = useHistory()
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Inside logs');
    history.push(RoutePaths.page3)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>Page4 </>
}

export default Page4
