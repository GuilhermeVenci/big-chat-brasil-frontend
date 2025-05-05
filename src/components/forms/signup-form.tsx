'use client';
import { signUp } from '@/app/(auth)/actions/server';
import Button from '@/components/ui/button';
import PasswordConfirmInput from './inputs/password-confirm-input';
import TextInput from '../ui/text-input';

export default function SignUpForm() {
  return (
    <form action={signUp} className="mt-6 flex flex-col gap-y-5">
      <TextInput
        label="CPF/CNPJ"
        id="documentId"
        name="documentId"
        type="text"
        required
      />

      <PasswordConfirmInput className="-mt-4" />

      <Button className="w-full">Cadastrar</Button>
    </form>
  );
}
