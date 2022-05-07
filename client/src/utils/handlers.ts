class Handlers {
  handleFormDataChange(name: string, value: string, setState: React.Dispatch<React.SetStateAction<any>>) {
    return setState((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }
};

const handlers = new Handlers();
export default handlers;