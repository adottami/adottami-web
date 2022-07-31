import axios from 'axios';

export async function fetchFileFromURL(fileURL: string, options: { fileType: string }): Promise<File> {
  const fileResponse = await axios.get(fileURL, { responseType: 'arraybuffer' });
  const fileDataBuffer = Buffer.from(fileResponse.data, 'binary');

  return new File([fileDataBuffer], fileURL, {
    type: options?.fileType,
  });
}

export async function fetchImageFromURL(imageURL: string, options?: { imageType?: 'image/jpeg' | 'image/png' }) {
  return fetchFileFromURL(imageURL, {
    fileType: options?.imageType ?? getDefaultImageType(imageURL),
  });
}

function getDefaultImageType(imageURL: string) {
  if (imageURL.endsWith('.png')) {
    return 'image/png';
  } else {
    return 'image/jpeg';
  }
}
