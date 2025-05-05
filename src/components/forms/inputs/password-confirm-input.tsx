'use client';
import React, { useEffect, useState } from 'react';
import PasswordInput from './password-input';
import TextInput from '../../ui/text-input';
import { cn } from '@/utils/cn';

const PasswordConfirmInput = ({ className }: { className?: string }) => {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [size, setSize] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [equal, setEqual] = useState<boolean>(true);

  const passwordLengthError = password.length < 8 ? 'Mín. 8 caracteres' : '';
  const passwordSpecialCharError = /[!@#$%^&*()\[\]{};:'"|,.<>?/]/.test(
    password
  )
    ? ''
    : '1 caractere especial';

  const passwordUppercaseError = /[A-Z]/.test(password) ? '' : '1 maiúscula';

  const passwordError = `${passwordLengthError}${
    passwordLengthError && (passwordSpecialCharError || passwordUppercaseError)
      ? ', '
      : ''
  }${passwordSpecialCharError}${
    (passwordSpecialCharError || passwordLengthError) && passwordUppercaseError
      ? ', '
      : ''
  }${passwordUppercaseError}`;

  const handleShow = () => setShow((prev) => !prev);

  useEffect(() => {
    if (password.length === passwordConfirm.length) setSize(true);
    if (!!password && !!passwordConfirm && size) {
      if (password === passwordConfirm) setEqual(true);
      if (password !== passwordConfirm) setEqual(false);
    } else {
      setEqual(true);
    }
  }, [password, passwordConfirm, size]);

  return (
    <>
      <div className={cn('relative pb-[18px]', className)}>
        <PasswordInput
          label="Senha"
          id="password"
          name="password"
          show={show}
          handleShow={handleShow}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className={cn(
            'ml-3',
            password
              ? 'absolute bottom-0 left-0 text-red-600 text-[10px]'
              : 'hidden'
          )}
        >
          {passwordError}
        </span>
      </div>
      <div className="relative pb-[17px]">
        <TextInput
          label="Confirmação de senha"
          id="passwordConfirm"
          name="passwordConfirm"
          type={show ? 'text' : 'password'}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="-mt-4"
        />
        <span
          className={cn(
            'ml-3',
            password
              ? 'absolute bottom-0 left-0 text-red-600 text-[10px]'
              : 'hidden'
          )}
        >
          {equal ? '' : 'As senhas digitadas não coincidem'}
        </span>
      </div>
    </>
  );
};

export default PasswordConfirmInput;
