'use client';
import { useConversations } from '@/context/conversations-context';
import React, { useState } from 'react';
import Button from '../ui/button';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useClient } from '@/context/client-context';
import { PlanType } from '@/types/enums/plan-types.enum';
import { Conversation } from '@/types/conversations';
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import TextInput from '../ui/text-input';
import PhoneInput from '../forms/inputs/phone-input';
import { cn } from '@/utils/cn';
import { TrashIcon } from '@heroicons/react/24/outline';

const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL') => {
  const valueInCurrency = value / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(valueInCurrency);
};

const ConversationList = () => {
  const {
    conversations,
    createConversation,
    selectConversation,
    selectedConversation,
    deleteConversation,
  } = useConversations();
  const { client } = useClient();
  const planPre = client?.planType === PlanType.PREPAID;
  const balance = client
    ? planPre
      ? client.balance ?? 0
      : client.limit ?? 0
    : 0;
  const [recipientName, setRecipientName] = useState('');
  const [recipientChannel, setRecipientChannel] = useState('');
  const [selectedConversationIdDelete, setSelectedConversationIdDelete] =
    useState('');

  const [isOpenModalAddConversation, setIsOpenModalAddConversation] =
    useState(false);
  const [isOpenModalDeleteConversation, setIsOpenModalDeleteConversation] =
    useState(false);

  const createNewConversation = async () => {
    if (!recipientName || !recipientChannel) return;
    await createConversation({
      recipientName,
      recipientChannel,
    });
    setIsOpenModalAddConversation(false);
    setRecipientName('');
    setRecipientChannel('');
  };

  const handleModalConfirmDelete = (id: string, isOpen: boolean) => {
    setSelectedConversationIdDelete(id);
    setIsOpenModalDeleteConversation(isOpen);
  };

  const deleteSelectedConversation = () => {
    setIsOpenModalDeleteConversation(false);
    deleteConversation(selectedConversationIdDelete);
  };

  return (
    <div className="h-full max-md:max-h-[40dvh] flex flex-col w-full max-w-xl gap-3 border-neutral-200 bg-white rounded-3xl p-4 shadow">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold leading-tight">
            {client?.name}
          </h1>
          <div className="flex items-center gap-x-3">
            <div className="w-fit h-full min-w-24 px-3 py-1.5 rounded-md bg-blue-300 text-neutral-900 flex items-center">
              <span className="uppercase font-semibold text-sm text-center my-auto">
                {planPre ? 'Pré-pago' : 'Pós-pago'}
              </span>
            </div>
            <span className="text-sm font-medium">
              {client?.planType == PlanType.PREPAID
                ? 'Saldo disponível: '
                : 'Limite diponível: '}
              <br />
              <span className="text-lg font-semibold">
                {formatCurrency(balance)}
              </span>
            </span>
          </div>
        </div>
        <Button
          className="p-2! h-fit mt-0 rounded-xl w-10!"
          onClick={() => setIsOpenModalAddConversation(true)}
        >
          <PlusIcon className="size-6 text-inherit" />
        </Button>
        <Dialog
          open={isOpenModalAddConversation}
          onClose={() => setIsOpenModalAddConversation(false)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg bg-white py-4 px-6 rounded-2xl space-y-3">
              <div className="w-full flex flex-col">
                <DialogTitle className="font-bold text-lg">
                  Criar conversa
                </DialogTitle>
                <Description className="font-medium text-sm">
                  Crie uma conversa adicionando nome e telefone do contato.
                </Description>
              </div>
              <div className="w-full flex flex-col gap-4">
                <TextInput
                  label="Nome do contato"
                  id="recipientName"
                  name="recipientName"
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
                <PhoneInput
                  label="Telefone"
                  id="recipientChannel"
                  name="recipientChannel"
                  required
                  value={recipientChannel}
                  onChange={(e) => setRecipientChannel(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-end items-center gap-4">
                <button
                  className="max-md:w-1/2!"
                  onClick={() => setIsOpenModalAddConversation(false)}
                >
                  Cancel
                </button>
                <Button
                  className="max-md:w-1/2!"
                  onClick={createNewConversation}
                >
                  Adicionar
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
      <div className="bg-neutral-100 border border-neutral-200 p-1 rounded-2xl h-full w-full shadow-inner space-y-1 overflow-auto">
        {conversations.length == 0 ? (
          <div className="h-full w-full flex-1 flex flex-col">
            <span className="m-auto text-lg font-medium text-balance text-neutral-500">
              Nenhuma conversa iniciada
            </span>
          </div>
        ) : (
          conversations.map((c: Conversation) => (
            <div
              onClick={() => selectConversation(c)}
              key={c.id}
              className={cn(
                'bg-white rounded-xl w-full pl-5 pr-2 py-4 shadow border-2 flex',
                selectedConversation &&
                  selectedConversation.recipientChannel == c.recipientChannel
                  ? ' border-blue-500 shadow'
                  : 'border-white'
              )}
            >
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-bold text-lg leading-none">
                  {c.recipientName}
                </span>
                <span className="font-medium leading-none">
                  {c.recipientChannel}
                </span>
              </div>
              <button
                onClick={() => handleModalConfirmDelete(c.id, true)}
                className="bg-transparent hover:bg-transparent p-1 -mt-2 hover:text-red-600 text-neutral-800 cursor-pointer mb-auto"
              >
                <TrashIcon className="size-5 text-inherit" />
              </button>
            </div>
          ))
        )}
      </div>
      <Dialog
        open={isOpenModalDeleteConversation}
        onClose={() => setIsOpenModalDeleteConversation(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg bg-white py-4 px-6 rounded-2xl space-y-3">
            <div className="w-full flex flex-col">
              <DialogTitle className="font-bold text-lg">
                Apagar conversa
              </DialogTitle>
              <Description className="font-medium text-sm">
                Desaja apagar a conversa e todas as suas mensagens?
              </Description>
            </div>
            <div className="w-full flex justify-end items-center gap-6">
              <button
                className="max-md:w-1/2"
                onClick={() => handleModalConfirmDelete('', false)}
              >
                Cancel
              </button>
              <Button
                className="max-md:w-1/2"
                onClick={deleteSelectedConversation}
              >
                Apagar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ConversationList;
