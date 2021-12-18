import {useState, useEffect} from 'react'

export default function useIsMobile() {
  const breakpoint = window.matchMedia('(max-width: 768px)')
  const breakpointChecker = () => breakpoint.matches

  const [isMobile, setIsMobile] = useState(breakpointChecker)

  useEffect(() => {
    const handler = () => setIsMobile(breakpointChecker)
    breakpoint.addListener(handler)

    return () => breakpoint.removeListener(handler)
  }, [])

  return isMobile;
}
