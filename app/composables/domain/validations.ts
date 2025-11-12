export const useValidations = () => {
  function isMoreTwoCaracters(value: string): boolean {
    return value.length > 2;
  }

  function email(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  function password(value: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return passwordRegex.test(value);
  }

  function areEqualsTwoStrings(value1: string, value2: string) {
    return value1 === value2;
  }

  return {
    isMoreTwoCaracters,
    email,
    password,
    areEqualsTwoStrings,
  };
};
