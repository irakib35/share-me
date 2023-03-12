import React from 'react';
import {Circles} from 'react-loader-spinner';

export default function Spinner({message}) {
  return (
        <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles
        height="80"
        width="200"
        color="#00BFFF"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  )
}
