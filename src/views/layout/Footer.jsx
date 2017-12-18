import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div.attrs({
  className:'center page-footer teal lighten-1'
})`

`

const Link = styled.a.attrs({
  target: "_blank"
})`
  color: #DEE;
  margin: 0 7px 0 7px;
  :hover {
    color: #FFF;
  }
`

const socialIcons = [
  {
    href: 'https://www.facebook.com/christopher.j.mccormack',
    icon: 'facebook'
  },
  {
    href: 'https://twitter.com/chrisjmccormack',
    icon: 'twitter'
  }, 
  {
    href: 'https://github.com/cmccormack',
    icon: 'github'
  }, 
  {
    href: 'https://www.linkedin.com/in/christopherjmccormack',
    icon: 'linkedin'
  }
]

const Footer = props => (
  <FooterWrapper>
    <div className='container'>
      <div className='row'>
        <div className='col l6 s12'>
          <span className="">
            {'Created by '}
            <Link
              href="https://mackville.net"
            >
              {'Christopher McCormack'}
            </Link>
          </span>
        </div>
        <div className="col l4 offset-l2 s12">
          { socialIcons.map((item) => (
            <Link href={item.href}>
              <i className={`fa fa-lg fa-${item.icon}`}></i>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </FooterWrapper>
)

export default Footer