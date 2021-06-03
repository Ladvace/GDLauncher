import React, { memo } from 'react';

const isPrideMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  if (currentMonth == 5 && (currentDay >= 1 || currentDay <= 30)) {
    return true;
  }
};

const checkMonthfestivity = () => {
  if (isPrideMonth()) return 'pride';
};

const Logo = ({ size, pointerCursor }) => {
  switch (checkMonthfestivity()) {
    case 'pride':
      return (
        <svg
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          css={{ width: size, height: size }}
          xmlSpace="preserve"
        >
          <defs>
            <clipPath id="clip-path">
              <polygon
                className="cls-1"
                css={{ fill: 'none' }}
                points="454.04 141.66 256 27.32 57.96 141.66 57.96 370.34 256 484.68 454.04 370.34 454.04 141.66"
              />
            </clipPath>
          </defs>
          <g className="cls-2" css={{ clipPath: 'url(#clip-path)' }}>
            <rect
              className="cls-3"
              css={{ fill: '#e31e26' }}
              x="126.2"
              y="-456.45"
              width="74.24"
              height="1103.91"
              transform="translate(164.37 -93.69) rotate(60)"
            />
            <rect
              className="cls-4"
              css={{ fill: '#f68c1f' }}
              x="163.32"
              y="-392.16"
              width="74.24"
              height="1103.91"
              transform="translate(238.61 -93.69) rotate(60)"
            />
            <rect
              className="cls-5"
              css={{ fill: '#fdec05' }}
              x="200.31"
              y="-328.1"
              width="74.24"
              height="1103.91"
              transform="translate(312.58 -93.69) rotate(60)"
            />
            <rect
              className="cls-6"
              css={{ fill: '#0d8140' }}
              x="237.43"
              y="-263.8"
              width="74.24"
              height="1103.91"
              transform="translate(386.82 -93.69) rotate(60)"
            />
            <rect
              className="cls-7"
              css={{ fill: '#405fab' }}
              x="274.55"
              y="-199.51"
              width="74.24"
              height="1103.91"
              transform="translate(461.06 -93.69) rotate(60)"
            />
            <rect
              className="cls-8"
              css={{ fill: '#722a83' }}
              x="311.67"
              y="-135.22"
              width="74.24"
              height="1103.91"
              transform="translate(535.3 -93.69) rotate(60)"
            />
          </g>
          <path
            className="cls-9"
            css={{ fill: '#fff' }}
            d="M256,367.85h0a61.09,61.09,0,0,0,61.09-61.09V296.37a2.15,2.15,0,0,1,1.35-2c9.49-3.81,65.42-28.74,58-83.9-8-59.44-81.77-50.11-119-14.61a2.13,2.13,0,0,1-3,0c-37.22-35.5-111-44.83-119,14.61-7.38,55.16,48.55,80.09,58,83.9a2.15,2.15,0,0,1,1.35,2v10.39A61.09,61.09,0,0,0,256,367.85Z"
          />
          <path
            className="cls-10"
            css={{ fill: '#375177' }}
            d="M229.85,250.1a2.17,2.17,0,0,1-3.79,1.65c-4.48-5.2-13-12.62-27.31-16.59-23.47-6.5,1.42-20.36,11-15.83C218.46,223.41,228.05,229.1,229.85,250.1Z"
          />
          <path
            className="cls-10"
            css={{ fill: '#375177' }}
            d="M282.15,250.1a2.17,2.17,0,0,0,3.79,1.65c4.48-5.2,13-12.62,27.31-16.59,23.47-6.5-1.42-20.36-11-15.83C293.54,223.41,284,229.1,282.15,250.1Z"
          />
          <path
            className="cls-10"
            css={{ fill: '#375177' }}
            d="M269.83,281.23c3.2,7.1,8.33,21.26,3.85,31.29a2.15,2.15,0,0,1-3.55.5c-3.66-4.14-10.23-14.52-4.34-31.57A2.17,2.17,0,0,1,269.83,281.23Z"
          />
          <path
            className="cls-10"
            css={{ fill: '#375177' }}
            d="M242.17,281.23c-3.2,7.1-8.33,21.26-3.85,31.29a2.15,2.15,0,0,0,3.55.5c3.66-4.14,10.23-14.52,4.34-31.57A2.17,2.17,0,0,0,242.17,281.23Z"
          />
        </svg>
      );

    default:
      return (
        <svg
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 874 1024"
          css={{ width: size, height: size }}
          xmlSpace="preserve"
        >
          <g>
            <polygon
              css={{ fill: '#365076', cursor: pointerCursor ? 'pointer' : '' }}
              points="874.343,259.5 437,7 -0.343,259.5 -0.343,764.5 437,1017 874.343,764.5 	"
            />
            <g css={{ cursor: pointerCursor ? 'pointer' : '' }}>
              <path
                css={{ fill: '#FFFFFF' }}
                d="M437,759.001L437,759.001c74.506,0,134.905-60.399,134.905-134.905v-22.951
      c0-1.958,1.17-3.705,2.987-4.435c20.944-8.416,144.47-63.461,128.17-185.276C685.5,280.178,522.473,300.771,440.29,379.179
      c-1.859,1.774-4.72,1.774-6.58,0c-82.183-78.408-245.21-99.001-262.772,32.255c-16.299,121.815,107.226,176.861,128.17,185.276
      c1.817,0.73,2.987,2.477,2.987,4.435v22.951C302.095,698.602,362.494,759.001,437,759.001L437,759.001L437,759.001z"
              />
              <g>
                <path
                  css={{ fill: '#365076' }}
                  d="M379.246,498.979c0.398,4.648-5.319,7.168-8.365,3.635c-9.897-11.482-28.728-27.878-60.302-36.628
        c-51.838-14.365,3.123-44.968,24.358-34.975C354.091,440.025,375.278,452.596,379.246,498.979z"
                />
                <path
                  css={{ fill: '#365076' }}
                  d="M494.754,498.979c-0.398,4.648,5.319,7.168,8.365,3.635c9.897-11.482,28.728-27.878,60.302-36.627
        c51.838-14.365-3.123-44.968-24.358-34.975C519.909,440.025,498.722,452.596,494.754,498.979z"
                />
              </g>
              <g>
                <path
                  css={{ fill: '#365076' }}
                  d="M467.532,567.716c7.069,15.684,18.396,46.949,8.518,69.106c-1.378,3.092-5.593,3.623-7.838,1.091
        c-8.093-9.127-22.598-32.049-9.584-69.713C460.051,564.08,465.741,563.743,467.532,567.716z"
                />
                <path
                  css={{ fill: '#365076' }}
                  d="M406.468,567.716c-7.069,15.684-18.396,46.949-8.518,69.106c1.378,3.092,5.593,3.623,7.838,1.091
        c8.093-9.127,22.598-32.049,9.584-69.713C413.949,564.08,408.259,563.743,406.468,567.716z"
                />
              </g>
            </g>
          </g>
        </svg>
      );
  }
};

export default memo(Logo);
