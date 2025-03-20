import {
  IconBrandDiscord,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandYoutube,
} from '@tabler/icons-react'
import footerImg from '../media/footer.png'

const Footer = () => {
	return (
    <section className='bg-dpurple pt-48 pb-28 relative'>
      <img className='z-10 left-0 bottom-0 right-0 m-auto w-fit hidden md:inline absolute' src={footerImg} alt='Footer Img'/>
      <div className='relative z-20 flex justify-center space-x-6 mb-6'>
        <IconBrandTwitter className='cursor-pointer' size={40}/>
        <IconBrandDiscord size={40} className='cursor-pointer'/>
        <IconBrandFacebook size={40} className='cursor-pointer'/>
        <IconBrandYoutube size={40} className='cursor-pointer'/>
      </div>
      <div className='relative z-20 flex justify-center space-x-8 text-lg'>
        <p className='cursor-pointer'>Privacy</p>
        <p className='cursor-pointer'>Terms of Use</p>
      </div>
      </section>
  )
}

export default Footer