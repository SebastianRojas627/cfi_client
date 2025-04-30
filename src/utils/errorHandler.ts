export const handleApiError = (error: any): string => {
    if (error.response) {
      const { status, data } = error.response;
      if (data?.message) return data.message;
      return `Server responded with status ${status}`;
    } else if (error.request) {
      return "No response recieved from the server. Please try again later.";
    } else {
      return error.message || "An unknown error ocurred";
    }
  };
  