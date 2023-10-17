import React from 'react';
import { useNavigate } from 'react-router';
import PreviewPopup from '../componets/PreviewPopup';

interface battlePageProps {
  username: string,
  setUsername: Function
}

const BattlePage = (props: battlePageProps) => {
  return (
    <div className='flex'>
      {/* Your content on the left side */}
      <div className='flex-1'>Your content on the left side</div>

      {/* PreviewPopup taking up 50% on the right side */}
      <div className='w-1/2 h-screen bg-gray-200'>
        <PreviewPopup></PreviewPopup>
      </div>
    </div>
  );
};

export default BattlePage;
