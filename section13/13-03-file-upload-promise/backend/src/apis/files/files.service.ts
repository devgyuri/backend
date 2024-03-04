import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ file }: IFilesServiceUpload): Promise<string> {
    console.log(file);

    const storage = new Storage({
      projectId: 'forward-vial-416105',
      keyFilename: 'forward-vial-416105-80b688f5a311.json',
    }).bucket('codecamp--storage');

    await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          console.log('성공');
          resolve('성공');
        })
        .on('error', () => {
          console.log('실패');
          reject('실패');
        });
    });

    console.log('파일 전송이 완료되었습니다.');
    return file.filename;
  }
}
