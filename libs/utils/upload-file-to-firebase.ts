import { MakeRandomId } from './make-random-id';
import { storage } from '@/config/firebase-configuration';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface IUploadFileToFirebase {
  image: File | Blob;
  type: string;
}

export const uploadFileToFirebase = async (
  payload: IUploadFileToFirebase
): Promise<string> => {
  const { image, type } = payload;
  return new Promise((resolve, reject) => {
    const fakeName = new Date().getTime();
    const uploadPath = `${type}/${MakeRandomId(8)}${fakeName}`;

    const storageRef = ref(storage, uploadPath);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch(reject);
      }
    );
  });
};
