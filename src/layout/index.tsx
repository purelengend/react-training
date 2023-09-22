import { ReactNode, memo } from 'react'

interface Props {
  children: ReactNode
}

const Layout = memo(({ children }: Props) => {
  return <div>{children}</div>
})

export default Layout
