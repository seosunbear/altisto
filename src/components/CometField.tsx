/* 히어로 배경 유성우 장식 — services / career 헤더 공용 */
export default function CometField() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <svg width="600" height="480" viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <path id="cp1" d="M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54" />
          <path id="cp2" d="M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139" />
          <path id="cp3" d="M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234" />
          <path id="cp4" d="M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322" />
          <path id="cp5" d="M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407" />
        </defs>
        <path d="M0,-18 L4.5,-4.5 L18,0 L4.5,4.5 L0,18 L-4.5,4.5 L-18,0 L-4.5,-4.5 Z" fill="#93c5fd">
          <animateMotion dur="5s" begin="0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp1" /></animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5s" begin="0s" repeatCount="indefinite" />
        </path>
        <path d="M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z" fill="#c4b5fd">
          <animateMotion dur="4.6s" begin="1.0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp2" /></animateMotion>
          <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.07;0.88;1" dur="4.6s" begin="1.0s" repeatCount="indefinite" />
        </path>
        <path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z" fill="#f9a8d4">
          <animateMotion dur="4.1s" begin="2.1s" repeatCount="indefinite" rotate="auto"><mpath href="#cp3" /></animateMotion>
          <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.1s" begin="2.1s" repeatCount="indefinite" />
        </path>
        <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#a5f3fc">
          <animateMotion dur="3.6s" begin="0.5s" repeatCount="indefinite" rotate="auto"><mpath href="#cp4" /></animateMotion>
          <animate attributeName="opacity" values="0;0.70;0.70;0" keyTimes="0;0.08;0.88;1" dur="3.6s" begin="0.5s" repeatCount="indefinite" />
        </path>
        <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#fde68a">
          <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" rotate="auto"><mpath href="#cp5" /></animateMotion>
          <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.08;0.88;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
        </path>
        <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#a7f3d0">
          <animateMotion dur="3.9s" begin="2.8s" repeatCount="indefinite" rotate="auto"><mpath href="#cp2" /></animateMotion>
          <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.88;1" dur="3.9s" begin="2.8s" repeatCount="indefinite" />
        </path>
        <path d="M0,-11 L2.8,-2.8 L11,0 L2.8,2.8 L0,11 L-2.8,2.8 L-11,0 L-2.8,-2.8 Z" fill="#ddd6fe">
          <animateMotion dur="4.4s" begin="2.2s" repeatCount="indefinite" rotate="auto"><mpath href="#cp4" /></animateMotion>
          <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.07;0.88;1" dur="4.4s" begin="2.2s" repeatCount="indefinite" />
        </path>
        <path d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" fill="#fed7aa">
          <animateMotion dur="3.4s" begin="2.6s" repeatCount="indefinite" rotate="auto"><mpath href="#cp1" /></animateMotion>
          <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.88;1" dur="3.4s" begin="2.6s" repeatCount="indefinite" />
        </path>
        <path d="M0,-9 L2.2,-2.2 L9,0 L2.2,2.2 L0,9 L-2.2,2.2 L-9,0 L-2.2,-2.2 Z" fill="#bfdbfe">
          <animateMotion dur="4.8s" begin="0.9s" repeatCount="indefinite" rotate="auto"><mpath href="#cp5" /></animateMotion>
          <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.8s" begin="0.9s" repeatCount="indefinite" />
        </path>
        <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="#fbcfe8">
          <animateMotion dur="3s" begin="3.4s" repeatCount="indefinite" rotate="auto"><mpath href="#cp3" /></animateMotion>
          <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.08;0.88;1" dur="3s" begin="3.4s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}
