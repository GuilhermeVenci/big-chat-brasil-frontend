'use client';
import { useUser } from '@/context/user-context';
import apiRequest from '@/utils/api';
import { useEffect, useState } from 'react';
import TextInput from '../ui/text-input';
import Button from '../ui/button';
import PhoneInput from './inputs/phone-input';
import SelectInput from '../ui/select-input';
import { PlanType } from '@/types/enums/plan-types.enum';
import { ClientType } from '@/types/clients/client';

interface ClientFormProps {
  onClientCreated: (client: ClientType) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onClientCreated }) => {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    channel: '',
    planType: 'PREPAID',
  });

  useEffect(() => {
    if (user)
      setFormData((prevData) => ({
        ...prevData,
        userId: user.id,
      }));
  }, [user]);

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.userId) {
      try {
        const response = await apiRequest('/clients/create', 'POST', formData);
        onClientCreated(response);
      } catch (error) {
        setError(`Failed to create client. Error: ${error}`);
      }
    } else {
      setError('userId not found');
    }
  };

  return (
    <div className="flex flex-col gap-y-4 mx-auto p-4 max-w-md">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold">Cadastro de usuário</h1>
        <p className="text-base text-neutral-600">
          Finalize seu cadastro para utilizar a ferramenta
        </p>
      </div>
      <form onSubmit={handleSubmit} className="container">
        <TextInput
          label="Nome"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mb-[18px]"
          maxLength={150}
        />
        <PhoneInput
          label="Telefone"
          id="channel"
          name="channel"
          value={formData.channel}
          onChange={handleChange}
          required
        />
        <SelectInput
          label="Plano"
          id="plan"
          name="plan"
          value={formData.planType}
          onChange={(value) => handleSelectChange('planType', value)}
          options={[
            { value: PlanType.PREPAID, label: 'Pré-pago' },
            { value: PlanType.POSTPAID, label: 'Pós-pago' },
          ]}
        />

        {error && <div className="rounded text-red-300 mb-[18px]">{error}</div>}
        <Button type="submit" className="mt-6">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default ClientForm;
