'use server';

import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { DocumentType } from '@/types/enums/document-tyoe.enum';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const cookieMaxAge = 30 * 24 * 60 * 60;

export async function signIn(formData: FormData) {
  const cookiesClient = await cookies();
  const documentId = formData.get('documentId') as string;
  const password = formData.get('password') as string;

  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { documentId, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { access_token: accessToken, role: userRole } = response.data;
    if (!accessToken) {
      return redirect(
        `/login?error=${encodeURIComponent('Nenhum token de acesso recebido')}`
      );
    }

    cookiesClient.set('token', accessToken, {
      maxAge: cookieMaxAge,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
    });

    return redirect(userRole === 'CLIENT' ? '/messages' : '/dashboard');
  } catch {
    return redirect(
      `/login?error=${encodeURIComponent(
        'Erro durante o login. Verifique o documentId e a senha.'
      )}`
    );
  }
}

export async function signUp(formData: FormData) {
  const cookiesClient = await cookies();
  const documentIdRaw = formData.get('documentId') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;

  if (password !== passwordConfirm) {
    return redirect(
      '/signup?error=' + encodeURIComponent('Senhas não coincidem')
    );
  }

  const documentId = documentIdRaw.replace(/\D/g, '');
  const documentType =
    documentId.length === 11 ? DocumentType.CPF : DocumentType.CNPJ;

  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { documentId, documentType, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { access_token: accessToken, role: userRole } = response.data;
    if (!accessToken) {
      return redirect(
        `/signup?error=${encodeURIComponent('Nenhum token de acesso recebido')}`
      );
    }

    cookiesClient.set('token', accessToken, {
      maxAge: cookieMaxAge,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
    });

    return redirect(userRole === 'CLIENT' ? '/messages' : '/dashboard');
  } catch {
    return redirect(
      `/signup?error=${encodeURIComponent(
        'Erro no cadastro. Verifique se o documentId já está cadastrado.'
      )}`
    );
  }
}

export async function logout() {
  const cookiesClient = await cookies();
  cookiesClient.set('token', '', {
    maxAge: -1,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
  return redirect('/login');
}
