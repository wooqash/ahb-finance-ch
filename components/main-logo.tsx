import Image from 'next/image';
// import Link from 'next/link';
import { ReactNode } from 'react';
import { Media } from 'types/media';
import { useRouter } from "next/router";

type MainLogoProps = {
  logo: Media,
  children?: ReactNode
}

const MainLogo:React.FC<MainLogoProps> = ({logo}) => {
    const router = useRouter();
    return (
        <div className="mx-auto my-5 max w-4/5 md:w-full">
          {/* <Link href="/" locale={router.locale} passHref> */}
            <a href={`/${router.locale}`}>
              <Image
                src={logo.url}
                width={logo.width}
                height={logo.height}
                alt={logo.alternativeText}
              />
            </a>
          {/* </Link> */}
        </div>
    );
}

export default MainLogo;