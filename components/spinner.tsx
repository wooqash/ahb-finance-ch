import Image from 'next/image';
import CustomSpinnerImg from 'public/custom-spinner.svg';

type SpinnerProps = {}
 
const Spinner:React.FC<SpinnerProps> = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-opacity-50 bg-primary">
            <Image src={CustomSpinnerImg} width="200" height="200" alt="Loading..." />
        </div>
    );
}
 
 
export default Spinner;