import axios, { AxiosRequestConfig } from 'axios';

const apiRequest = async (
  url: string,
  method: string = 'GET',
  body: any = null
) => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    method,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    data: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const backendMsg = (data as any).message ?? JSON.stringify(data);

      if (status === 401) {
        console.log('Unauthorized');
      } else if (status === 404) {
        console.log('Not found');
      } else if (status === 500) {
        console.log('Database not found');
      } else {
        console.log(`API request failed with status ${status}: ${backendMsg}`);
      }

      throw new Error(backendMsg);
    } else if (axios.isAxiosError(error) && error.request) {
      console.log('No response received');
      throw new Error('No response received');
    } else {
      console.log('Unexpected error:', (error as any).message);
      throw new Error(`Unexpected error: ${(error as any).message}`);
    }
  }
};

export default apiRequest;
