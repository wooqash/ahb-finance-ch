
import style from "./video.module.scss";

type VideoProps = {
    videoSrc: string;
}
 
const Video:React.FC<VideoProps> = (props) => {
    const { videoSrc } = props;
    return (
        <video
        loop
        muted
        autoPlay
        preload="auto"
        className={style.container}
        >
            <source src={videoSrc} type="video/mp4"></source>
            Your browser does not support the video tag.
        </video>
    );
}
 
 
export default Video;