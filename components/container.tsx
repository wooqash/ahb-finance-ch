import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
}

const Container:React.FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto px-10 sm:px-12 md:px-24 text-center">{children}</div>
}

export default Container;