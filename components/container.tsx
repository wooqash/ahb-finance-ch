import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
}

const Container:React.FC<ContainerProps> = ({ children }) => {
  return <div className="container md:max-w-2xl lg:max-w-5xl mx-auto px-6 text-center">{children}</div>
}

export default Container;