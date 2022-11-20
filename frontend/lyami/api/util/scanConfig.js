export const scanHandler = (payload, toast, navigation) => {
  try {
    const getPayload = JSON.parse(payload);
    const { action, type, address, value } = getPayload;
    switch (action) {
      case "pay":
        switch (type) {
          case 1:
            if (!navigation) return getPayload;
            navigation?.navigate("PostAsset", { address: address });
            break;
          case 2:
            if (!navigation) return getPayload;
            navigation?.navigate("TempPayPage", payload);
            break;
          default:
            break;
        }
      default:
        break;
    }
  } catch (error) {
    return toast.show({ description: "请扫描正确的二维码", duration: 1500, placement: "top" });
  }
};
