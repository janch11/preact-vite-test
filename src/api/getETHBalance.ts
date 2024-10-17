import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";

const getETHBalance = async (address: string) => {
  try {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: "t-65ddbb2bb792d6001be685d9-442dd087e58442acac87f5f9" },
      verbose: true,
    });

    if (!tatum.id && tatum.address.getBalance) {
      throw new Error("Error fetching data");
    }
    const balance = await tatum.address.getBalance({
      addresses: [address],
    });
    if (!balance.data) {
      if (balance?.error?.message?.length > 0) {
        throw new Error(balance.error.message.join(","));
      }
      throw new Error("Error fetching data");
    }
    const balanceData = balance?.data?.filter(
      (asset) => asset.asset === "ETH"
    )?.[0]?.balance;
    return balanceData;
  } catch (err) {
    throw err;
  }
};

export default getETHBalance;
