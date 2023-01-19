type ErrorResponseDto = {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
};

export default ErrorResponseDto;
