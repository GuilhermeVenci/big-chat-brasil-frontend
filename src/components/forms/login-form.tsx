'use client';

import Link from 'next/link';
import { signIn } from '@/app/(auth)/actions/server';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import PasswordInput from './inputs/password-input';

export default function LoginForm() {
  return (
    <form action={signIn} className="mt-6 flex flex-col gap-y-5">
      <TextInput
        label="CPF ou CNPJ"
        id="documentId"
        name="documentId"
        type="text"
        autoComplete="documentId"
        required
      />

      <PasswordInput id="password" name="password" label="Senha" />

      <div className="flex items-center justify-center mt-1">
        <Link href="/forgot-password">
          <span className="text-sm text-blue-600 hover:text-blue-500">
            Esqueceu a senha?
          </span>
        </Link>
      </div>
      <Button className="w-full">Entrar</Button>
    </form>
  );
}
