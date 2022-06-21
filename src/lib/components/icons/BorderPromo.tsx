import React from 'react';

declare interface Props extends React.SVGProps<SVGSVGElement> {
  size?: string;
  viewBox?: string;
}

const BorderPromo = (props: Props): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="99"
      height="99"
      viewBox="0 0 99 99"
      {...props}
    >
      <path
        id="Trazado_1"
        data-name="Trazado 1"
        d="M48,96c-2.966,0-5.427-1.712-7.6-3.222a14.108,14.108,0,0,0-3.82-2.162,7.628,7.628,0,0,0-1.95-.207c-.827,0-1.706.071-2.636.147-.976.079-1.986.161-2.99.161a9.917,9.917,0,0,1-5.011-1.143c-2.51-1.452-3.775-4.138-4.891-6.507a14.405,14.405,0,0,0-2.292-3.878A14.4,14.4,0,0,0,12.933,76.9c-2.37-1.116-5.055-2.381-6.507-4.891C5,69.533,5.234,66.6,5.444,64a14.663,14.663,0,0,0-.06-4.585A14.1,14.1,0,0,0,3.223,55.6C1.712,53.428,0,50.966,0,48s1.712-5.428,3.223-7.6a14.1,14.1,0,0,0,2.161-3.82A14.67,14.67,0,0,0,5.444,32c-.21-2.592-.449-5.529.982-8,1.452-2.509,4.137-3.774,6.507-4.891a14.4,14.4,0,0,0,3.877-2.292A14.4,14.4,0,0,0,19.1,12.933c1.116-2.37,2.381-5.055,4.891-6.507a9.916,9.916,0,0,1,5.011-1.143c1,0,2.015.082,2.991.161.93.076,1.809.147,2.636.147a7.633,7.633,0,0,0,1.949-.207A14.1,14.1,0,0,0,40.4,3.223C42.572,1.712,45.034,0,48,0s5.428,1.712,7.6,3.222a14.1,14.1,0,0,0,3.82,2.161,7.625,7.625,0,0,0,1.949.207c.827,0,1.706-.071,2.636-.147.977-.079,1.986-.161,2.991-.161a9.916,9.916,0,0,1,5.011,1.143c2.51,1.452,3.775,4.138,4.891,6.508a14.405,14.405,0,0,0,2.292,3.878A14.4,14.4,0,0,0,83.067,19.1c2.369,1.116,5.055,2.381,6.507,4.891,1.431,2.474,1.193,5.411.982,8a14.664,14.664,0,0,0,.06,4.585,14.1,14.1,0,0,0,2.161,3.82C94.288,42.572,96,45.034,96,48s-1.712,5.428-3.223,7.6a14.1,14.1,0,0,0-2.161,3.82A14.67,14.67,0,0,0,90.556,64c.21,2.591.449,5.528-.982,8-1.452,2.51-4.138,3.775-6.507,4.891a14.407,14.407,0,0,0-3.878,2.292A14.4,14.4,0,0,0,76.9,83.066c-1.116,2.37-2.381,5.055-4.891,6.507a9.917,9.917,0,0,1-5.012,1.143c-1,0-2.014-.082-2.991-.162-.93-.076-1.809-.147-2.636-.147a7.634,7.634,0,0,0-1.949.207A14.1,14.1,0,0,0,55.6,92.777C53.428,94.288,50.966,96,48,96ZM34.632,85.726a12.168,12.168,0,0,1,3.159.366,17.474,17.474,0,0,1,5.284,2.841C44.837,90.159,46.5,91.317,48,91.317s3.163-1.158,4.926-2.384a17.47,17.47,0,0,1,5.284-2.841,12.166,12.166,0,0,1,3.158-.366c1.017,0,2.033.083,3.016.162.924.075,1.8.146,2.612.146a5.329,5.329,0,0,0,2.667-.514c1.242-.719,2.1-2.531,3-4.449a17.818,17.818,0,0,1,3.217-5.193,17.814,17.814,0,0,1,5.194-3.218c1.918-.9,3.73-1.757,4.449-3,.7-1.207.538-3.185.368-5.278a18.12,18.12,0,0,1,.2-6.174,17.484,17.484,0,0,1,2.841-5.284C90.159,51.163,91.317,49.5,91.317,48s-1.158-3.163-2.384-4.926a17.474,17.474,0,0,1-2.841-5.284,18.12,18.12,0,0,1-.2-6.174c.17-2.093.331-4.07-.368-5.278-.719-1.242-2.531-2.1-4.449-3a17.821,17.821,0,0,1-5.193-3.217,17.82,17.82,0,0,1-3.217-5.194c-.9-1.918-1.757-3.731-3-4.449a5.331,5.331,0,0,0-2.666-.513c-.815,0-1.688.071-2.612.146-.982.08-2,.162-3.015.162a12.166,12.166,0,0,1-3.158-.366,17.48,17.48,0,0,1-5.284-2.841C51.163,5.841,49.5,4.683,48,4.683s-3.163,1.158-4.926,2.384a17.469,17.469,0,0,1-5.284,2.841,12.167,12.167,0,0,1-3.158.366c-1.017,0-2.033-.083-3.016-.162-.924-.075-1.8-.146-2.612-.146a5.33,5.33,0,0,0-2.667.514c-1.242.719-2.1,2.531-3,4.449a17.819,17.819,0,0,1-3.217,5.193,17.816,17.816,0,0,1-5.193,3.218c-1.918.9-3.731,1.757-4.449,3-.7,1.207-.538,3.185-.368,5.278a18.132,18.132,0,0,1-.2,6.174,17.484,17.484,0,0,1-2.841,5.284C5.841,44.837,4.683,46.5,4.683,48s1.158,3.163,2.384,4.926A17.48,17.48,0,0,1,9.908,58.21a18.12,18.12,0,0,1,.2,6.174c-.17,2.093-.331,4.07.368,5.278.719,1.242,2.531,2.1,4.449,3a17.823,17.823,0,0,1,5.193,3.217,17.82,17.82,0,0,1,3.217,5.194c.9,1.918,1.757,3.731,3,4.449a5.329,5.329,0,0,0,2.667.513c.815,0,1.687-.071,2.611-.146C32.6,85.809,33.615,85.726,34.632,85.726Z"
        transform="translate(1.5 1.5)"
        fill="#ffc000"
        stroke="#ffc000"
        strokeWidth="3"
      />
    </svg>
  );
};
export default BorderPromo;