export const getProfileImage = (file: any)=>{
  if (file && typeof file == 'string') return file;
  return require('../assets/images/defaultAvatar.png');
};