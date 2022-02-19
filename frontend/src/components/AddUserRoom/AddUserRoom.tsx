import React, { useState } from 'react';
import FormInput from '../UI/inputs/FormInput/FormInput';

const AddUserRoom = () => {
  const [userName, setUserName] = useState<string>('');
  return (
    <div>
      <div className="">
        
        <FormInput
          label={'New user'}
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default AddUserRoom;
