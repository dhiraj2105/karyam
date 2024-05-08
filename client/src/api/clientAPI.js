export const getClientById = async (clientId) => {
  try {
    const response = await fetch(`/clients/${clientId}`);
    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching client detials : ", error.message);
    throw error;
  }
};
