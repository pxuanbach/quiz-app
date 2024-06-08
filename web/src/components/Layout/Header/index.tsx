import React from 'react'
import { Container } from './header.style'
import Link from 'next/link'
import { useAuth } from '../../../hooks/Auth'
import { FaPowerOff } from 'react-icons/fa'

const Header: React.FC = () => {
  const { user, signOut } = useAuth()

  async function getInitialProps(ctx) {
    signOut(ctx)
  }

  return (
    <Container>
      <div>
        <ul>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
        </ul>

        {user ? (
          <ul>
            <li>
              <Link href="/sign-in">
                Olá,{user.username.toUpperCase()}
              </Link>
            </li>
            <li onClick={getInitialProps}>
              <FaPowerOff size={20} />
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href="/sign-up">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/sign-in">
                Sign In
              </Link>
            </li>
          </ul>
        )}
      </div>
    </Container>
  );
}

export default Header
