const Logo = (props) => {
  const size = props.size
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width={size} height={size}>
    <defs>
      <radialGradient id='coinGradient' cx='30%' cy='30%' r='70%' fx='30%' fy='30%'>
        <stop offset='0%' stopColor='#fffad1' />
        <stop offset='50%' stopColor='#fff344' />
        <stop offset='100%' stopColor='#ffee00' />
      </radialGradient>
      <linearGradient id='strokeGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#ffcf00' />
        <stop offset='50%' stopColor='#ff9d00' />
        <stop offset='100%' stopColor='#ff7400' />
      </linearGradient>
      <linearGradient id='shineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
        <stop offset='0%' stopColor='rgba(255,255,255,0)' />
        <stop offset='50%' stopColor='rgba(255,255,255,0.8)' />
        <stop offset='100%' stopColor='rgba(255,255,255,0)' />
      </linearGradient>
      <clipPath id='coinClip'>
        <circle cx='24' cy='24' r='22' />
      </clipPath>
    </defs>
    
    <circle cx='24' cy='24' r='22' fill='url(#coinGradient)' stroke='url(#strokeGradient)' strokeWidth='4'/>
    <circle cx='24' cy='24' r='18' fill='url(#coinGradient)' stroke='url(#strokeGradient)' strokeWidth='2'/>
    <text x='24' y='30' fontFamily='Arial, sans-serif' fontSize='16' fill='#ff7400' textAnchor='middle'>$</text>
    
    <ellipse cx='14' cy='14' rx='6' ry='3' fill='#fffad1' opacity='0.6' transform='rotate(-35 14 14)'/>
    
    <g clipPath='url(#coinClip)'>
      <rect width='15' height='48' fill='url(#shineGradient)' opacity='0.5'>
        <animateTransform
          attributeName='transform'
          type='translate'
          from='-24 0'
          to='72 0'
          dur='3s'
          repeatCount='indefinite'/>
      </rect>
    </g>
  </svg>
  )
}

export default Logo