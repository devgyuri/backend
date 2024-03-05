import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    const bucket = 'codecamp--storage';
    const storage = new Storage({
      projectId: 'forward-vial-416105',
      keyFilename: 'forward-vial-416105-80b688f5a311.json',
    }).bucket(bucket);

    console.time('time check');
    const results = Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );
    console.log(results);
    console.timeEnd('time check');

    console.log('파일 전송이 완료되었습니다.');
    return results;
  }
}
