import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  /**
   * Uploads an image to Cloudinary.
   *
   * @param {Express.Multer.File} file - The file to upload.
   * @param {string} [folder=""] - The folder to upload the file to.
   * @returns {Promise<UploadApiResponse | UploadApiErrorResponse>} - A promise that resolves to the upload response or an error.
   * @example
   * // Example of a successful response:
   * {
   *   "asset_id": "d9d806b86f18c34dd23184dca85cea9c",
   *   "public_id": "VocabCollection/jtvh15fq9qi3tssgwmhm",
   *   "version": 1686907855,
   *   "version_id": "69acb5560af877f25ca95ba7ddeb65b8",
   *   "signature": "8c2da2ab2fffce89d56174a74dbc53fdff12dbe9",
   *   "width": 800,
   *   "height": 800,
   *   "format": "jpg",
   *   "resource_type": "image",
   *   "created_at": "2023-06-16T09:30:55Z",
   *   "tags": [],
   *   "bytes": 64085,
   *   "type": "upload",
   *   "etag": "397070da224887c30c6050eab0fce89f",
   *   "placeholder": false,
   *   "url": "http://res.cloudinary.com/dplubuqjl/image/upload/v1686907855/VocabCollection/jtvh15fq9qi3tssgwmhm.jpg",
   *   "secure_url": "https://res.cloudinary.com/dplubuqjl/image/upload/v1686907855/VocabCollection/jtvh15fq9qi3tssgwmhm.jpg",
   *   "folder": "VocabCollection",
   *   "original_filename": "file",
   *   "api_key": "997531864519642"
   * }
   */
  async uploadImage(
    file: Express.Multer.File,
    folder = '',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  /**
   * Removes an image from Cloudinary.
   *
   * @async
   * @param {string} publicId - The public ID of the image to remove.
   * @returns {Promise<UploadApiResponse | UploadApiErrorResponse>} - A promise that resolves to the upload response or an error.
   * @throws {Error} - If there is an error removing the image.
   * @example
   * // Example of a successful response:
   * {
   *   "result": "ok"
   * }
   */
  async removeImage(
    publicId: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
