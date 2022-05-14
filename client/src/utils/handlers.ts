class Handlers {
  handleFormDataChange(name: string, value: string, setState: React.Dispatch<React.SetStateAction<any>>, type?: string) {
    if (type === "channel")
      value = value.toLocaleLowerCase().trimStart().replaceAll(" ", "-").replaceAll(/--+/g, "-");

    return setState((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }
};

const handlers = new Handlers();
export default handlers;