import { firestore } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export const CreateorUpdateWallet = async (
  walletData: Partial<WalletType>

): Promise<ResponseType> => {
  try {
    let walletToSave = {...walletData};
    if (!walletData?.id) {
      // new wallet
      walletToSave.amount = walletToSave.totalIncome = walletToSave.totalExpenses = 0;
      walletToSave.created = new Date();
    }
    const walletRef = walletData?.id ? doc(firestore, "wallets", walletData?.id) : doc(collection(firestore, "wallets"));

    await setDoc(walletRef, walletToSave, {merge: true});
    return {success: true, data: {...walletToSave, id: walletRef.id}}; 
  } catch(error: any) {
    console.log("error creating or updating wallet:", error);
    return {success: false, msg: error.message }
  }
}

export const deleteWallet = async (walletID: string): Promise<ResponseType> => {
  try {
    const walletRef = doc(firestore, "wallets", walletID);
    await deleteDoc(walletRef);
    // delete transactions
    return {success: true};
  } catch (error: any) {
    console.log("Error deleting wallet", error);
    return {success: false, msg: error.message};
  }
}