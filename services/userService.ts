import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFile } from "./imageService";

export const updateUser = async (
  uid: string,
  updateData: UserDataType,
): Promise<ResponseType> =>{
  try {
    if (updateData.image && updateData?.image?.uri) {
      const imageUpload = await uploadFile(updateData.image, "users");
      if (!imageUpload.success) {
        return {success: false, msg: imageUpload.msg || 'Failed to upload image'};
      }
      updateData.image = imageUpload.data;
    }
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updateData);
    return {success: true};
  }catch(error: any) {
    console.log("error updating user", error.message);
    return {success: false, msg: error.message};
  }
}