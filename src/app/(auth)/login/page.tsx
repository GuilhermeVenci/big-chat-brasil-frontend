'use client';

import LoginForm from '@/components/forms/login-form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="max-w-sm sm:w-96 mx-auto mt-8 p-6 bg-white rounded-md text-neutral-950">
      <h1 className="text-2xl font-semibold text-center">Acesse sua conta</h1>

      <p className="text-neutral-600 text-center mt-2">
        Selecione o método de login que preferir
      </p>

      {error && (
        <p className="text-red-500 text-center text-xs mt-4">{error}</p>
      )}

      <LoginForm />

      <div className="flex items-center justify-center mt-6">
        <p className="text-sm text-gray-600">
          Não possui uma conta?{' '}
          <Link href="/signup">
            <span className="text-blue-600 hover:text-blue-500">
              Cadastre-se
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
