import { Component, Input } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
})
export class HelloComponent {
  constructor(private papa: Papa) {
    // const csvData = '"Hello","World!"';
    // this.parseCsvData(csvData);
  }

  parseCsvData(csvData) {
    this.papa.parse(csvData, {
      complete: (result) => {
        console.log('Parsed: ', result);
      },
    });
  }

  parseCsvFile(file) {
    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      worker: true,
      complete: this.papaParseCompleteFunction,
    });
  }

  papaParseChunk(chunk) {
    console.log('Chunk:', chunk.data);
  }

  papaParseCompleteFunction(results) {
    console.log('Results', results);
  }

  handleUpload($event: any) {
    const fileList = $event.srcElement.files;
    this.parseCsvFile(fileList[0]);
  }
}
