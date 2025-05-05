import { ThreeDotsWave } from '@/components/custom/tree-dots-wave';
import React from 'react';

const LoadingMessages = () => {
  return (
    <div className="relative w-full h-full min-h-[calc(100vh-176px)] flex justify-center items-center">
      <ThreeDotsWave color="bg-blue-600" />
    </div>
  );
};

export default LoadingMessages;
