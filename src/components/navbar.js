import {
  IconBrandDiscord,
  IconBrandTwitter,
  IconMenu2,
  IconX,
} from '@tabler/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Logo from './logo'

const Navbar = () => {
	const [dropdown, toggleDropdown] = useState(false)
	const [sticky, setSticky] = useState(false)
	const [isResizing, setIsResizing] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	const handleNavigation = useCallback((elementId) => {
		toggleDropdown(false)
    const element = document.getElementById(elementId)
    if (element) {
      setTimeout(() => {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    } else if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: elementId } })
    }
  }, [navigate, location.pathname])

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      handleNavigation(location.state.scrollTo)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate, handleNavigation])

	useEffect(() => {
    let resizeTimer
    const handleResize = () => {
      setIsResizing(true)
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setIsResizing(false)
      }, 400)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

	const handleScroll = () => {
    if (window.scrollY > 1) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  window.addEventListener('scroll', handleScroll)

	return (
		<div className={`${sticky ? 'bg-dpurple shadow-2xl' : ''} fixed z-50 ease-in duration-300 px-4 py-6 gap-4 w-full flex items-center justify-between lg:justify-around text-white`}>
			<button onClick={() => handleNavigation('hero')} className='flex items-center space-x-2 order-999'>
				<Logo size='40'/>
				<h1 className='font-bold text-4xl'>Coin.com</h1>
			</button>
			<ul className={`${isResizing ? 'transition-none' : ''} md:relative md:translate-x-0 md:bg-transparent md:text-white md:flex-row md:text-xl md:space-x-6 md:space-y-0 duration-300 ease-in-out ${dropdown ? 'translate-x-0' : '-translate-x-full'} text-black text-4xl font-bold space-y-6 bg-white fixed left-0 top-0 w-full md:w-fit h-full flex flex-col items-center justify-center`}>
				<IconX className='md:hidden absolute right-6 top-6 cursor-pointer hover:text-transparent hover:ease-in-out duration-300' onClick={() => toggleDropdown(!dropdown)}/>
				<li className='hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-blue to-pink'>
					<button onClick={() => handleNavigation('hero')} className='w-full'>
						Home
					</button>
				</li>
				<li className='hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-blue to-pink'>
					<button onClick={() => handleNavigation('market')} className='w-full'>
						Market
					</button>
				</li>
				<li className='hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-blue to-pink'>
					<button onClick={() => handleNavigation('choose-us')} className='w-full'>
						Choose Us
					</button>
				</li>
				<li className='hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-blue to-pink'>
					<button onClick={() => handleNavigation('join')} className='w-full'>
						Join
					</button>
				</li>
			</ul>
			<div className='flex items-center space-x-2'>
				<IconBrandTwitter className='cursor-pointer'/>
				<IconBrandDiscord className='cursor-pointer'/>
				<IconMenu2 size='32' className='md:hidden text-white cursor-pointer' onClick={() => toggleDropdown(!dropdown)}/>
			</div>
		</div>
	)
}

export default Navbar