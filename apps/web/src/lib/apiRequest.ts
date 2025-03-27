export async function postRequest({
  endpoint,
  data,
}: {
  endpoint: string;
  data: unknown;
}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to process the request',
      };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error in postRequest:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    };
  }
}
