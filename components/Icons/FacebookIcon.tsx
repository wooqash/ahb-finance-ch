import React from "react";

type FacebookIconProps = {
    className?: string,
    width?: string,
    height?: string,
}
 
const FacebookIcon:React.FC<FacebookIconProps> = ({ className = 'svg-icon', width = '48', height = '48'}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 5072 5072">
            <g>
                <path className={className} d="M222 954l0 3157c0,3 0,6 0,9 3,196 87,374 218,505 135,135 321,221 522,226l0 0 1373 0 0 -1408c0,-43 1,-102 2,-148l0 -5 -224 0c-4,0 -6,0 -9,0l0 0c-10,1 -21,1 -29,1 -76,0 -143,-23 -143,-127l0 -760c0,-61 50,-111 111,-111l292 0 0 -55c-1,-166 -2,-408 10,-496l0 -1c30,-306 91,-534 251,-698 159,-164 406,-253 804,-277 3,0 6,0 9,0 199,-6 400,-5 598,-4 40,0 85,0 234,0 36,0 64,10 90,36l0 0c26,26 36,54 36,90l0 745c0,106 -60,127 -136,127 -4,0 -13,-1 -21,-1l0 0 0 0c-5,0 -6,-1 -8,-1l0 0 -64 -1c-131,-1 -373,-3 -399,1 -10,2 -20,2 -29,1 -22,0 -41,4 -56,13l-1 0 0 0c-15,9 -27,23 -34,41 -22,52 -19,323 -17,479l596 0c61,0 111,50 111,111 0,7 -1,13 -2,20l-84 767c-6,57 -54,99 -110,99l0 0 -511 0c0,294 0,589 1,884 1,225 1,451 1,676l502 0c167,-12 300,-55 406,-120 119,-74 205,-177 265,-296 19,-37 36,-92 50,-149 16,-66 26,-130 27,-171l0 0 0 -3055 0 -82c0,-41 -11,-97 -20,-146l-4 -18c-45,-161 -134,-296 -251,-397 -120,-103 -270,-170 -436,-193l-3084 0c-32,0 -53,0 -68,1 -20,1 -40,3 -67,5 -181,17 -347,107 -473,238 -127,132 -211,306 -226,488zm-222 3157l0 -3159 0 0c0,-3 0,-5 0,-8 18,-236 125,-461 288,-630 160,-167 375,-282 611,-305 31,-3 54,-5 77,-6 28,-1 51,-2 78,-2l3088 0 0 0c5,0 9,0 14,1 214,28 407,114 561,246 150,129 263,301 320,506 2,5 3,11 4,16l4 20c11,59 24,127 24,187l0 82 0 3055 0 0 0 2c-1,58 -13,141 -32,220 -17,72 -40,144 -68,198 -77,152 -189,286 -347,383 -135,84 -302,139 -507,153 -5,1 -10,1 -15,1l-613 0 0 0c-61,0 -110,-49 -110,-110 0,-262 -1,-524 -1,-787 -1,-322 -2,-645 -1,-966 0,-119 46,-142 135,-142l0 0c7,0 15,1 24,1l16 1 0 0 457 0 60 -553 -567 0c-36,0 -64,-10 -90,-36l0 0c-26,-26 -36,-54 -36,-90 0,-45 0,-58 0,-70 -2,-166 -7,-494 33,-589 27,-64 71,-114 126,-147l0 0c52,-31 113,-46 178,-44 66,-4 293,-2 421,-1l7 0 0 -554 -138 -1c-194,-1 -392,-2 -590,4l-3 0c-338,20 -539,87 -658,210 -117,121 -164,308 -189,566 0,3 0,6 -1,9 -11,75 -9,307 -8,465 0,37 0,70 0,97l0 0c0,3 0,5 0,7l0 0 0 0 0 1c1,10 1,21 1,29 0,76 -23,143 -127,143l-277 0 0 553 212 0c14,0 21,0 27,-1 86,-5 127,-8 157,95 9,31 9,68 7,137 -1,27 -1,63 -1,143l0 1518c0,61 -50,111 -111,111l-1484 0 0 0 -2 0c-262,-6 -502,-116 -677,-290 -170,-170 -278,-402 -282,-660 0,-4 -1,-7 -1,-11z"/>
            </g>
        </svg>
    );
}
 
export default FacebookIcon;