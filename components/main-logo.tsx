import Image from 'next/image';
import { ReactNode } from 'react';
import { Media } from 'types/media';

type MainLogoProps = {
  logo: Media,
  children?: ReactNode
}

const MainLogo:React.FC<MainLogoProps> = ({logo}) => {
    return (
        <div className="mx-auto my-5 max w-4/5 md:w-full">
          <Image
            src={logo.url}
            width={logo.width}
            height={logo.height}
            alt={logo.alternativeText}
          />
        </div>
    );
}

export default MainLogo;