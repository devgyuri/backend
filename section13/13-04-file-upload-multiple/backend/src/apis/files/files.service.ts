import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = [];
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1];
    console.log(waitedFiles);

    const storage = new Storage({
      projectId: 'forward-vial-416105',
      keyFilename: 'forward-vial-416105-80b688f5a311.json',
    }).bucket('codecamp--storage');

    console.time('time check');
    const results = [];
    for (let i = 0; i < waitedFiles.length; i++) {
      results[i] = await new Promise((resolve, reject) => {
        waitedFiles[i]
          .createReadStream()
          .pipe(storage.file(waitedFiles[i].filename).createWriteStream())
          .on('finish', () => {
            console.log('성공');
            resolve('성공');
          })
          .on('error', () => {
            console.log('실패');
            reject('실패');
          });
      });
    }
    console.timeEnd('time check');

    console.log('파일 전송이 완료되었습니다.');
    return waitedFiles.map((el) => el.filename);
  }
}
