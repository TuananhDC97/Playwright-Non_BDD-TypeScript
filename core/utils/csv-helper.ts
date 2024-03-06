import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readCSVTestData (filePath: string) {
    const fileContent = fs.readFileSync(filePath);

    return parse(fileContent,
        {
            columns:        true,
            skipEmptyLines: true,
            delimiter:      ','
        },
    );
}

// https://github.com/microsoft/playwright/issues/13596
// the important rule: tests have to be defined synchronously. => can't use async function of readCsv when creating dynamic tests
// async function readCSVTestData() {
//     const fileContent = fs.readFileSync(path.join(__dirname, 'input.csv'));
//     const mangaInfos = await new Promise<MangaInfo[]>((resolve, reject) => {
//         parse(fileContent,
//             {
//                 columns: true,
//                 skipEmptyLines: true,
//                 delimiter: ','
//             },
//             (err, result: MangaInfo[]) => {
//                 if (err) {
//                     console.error(err);
//                     reject(err);
//                 }
//                 // console.log(result);
//                 resolve(result);
//             });
//     });
//     return mangaInfos;
// }